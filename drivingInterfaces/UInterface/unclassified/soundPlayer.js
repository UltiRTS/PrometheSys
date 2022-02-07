/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */


// convert nodejs buffer to ArrayBuffer


// then deliver ArrayBuffer to AudioContext().decodeAudioData(buffer, successHanlder, errhandler)
function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

// new one
function playSound(file, loop) {
  if (!global.selfState.promethesys.audio.isMusicPlaying) {
    global.selfState.promethesys.audio.audioCtx = new AudioContext();
    global.selfState.promethesys.audio.contextGain = global.selfState.promethesys.audio.audioCtx.createGain();
    // connect to context
    global.selfState.promethesys.audio.contextGain.connect(global.selfState.promethesys.audio.audioCtx.destination);
    actuallyPlay();
  } else {
    let instaVolDuringFade=50;
    loading('musicInit');
    global.selfState.promethesys.audio.audioramp=setInterval(() => {
      if (instaVolDuringFade <= 0) {
        clearInterval(global.selfState.promethesys.audio.audioramp);
        actuallyPlay();
      } else {
        instaVolDuringFade-=4;
        global.selfState.promethesys.audio.contextGain.gain.setValueAtTime(
            (global.selfState.promethesys.audio.userVolume/100) * (instaVolDuringFade/50),
            global.selfState.promethesys.audio.audioCtx.currentTime,
        );
      }
    }, 100);
  }

  function actuallyPlay() {
    global.selfState.promethesys.audio.contextGain.gain.setValueAtTime(global.selfState.promethesys.audio.userVolume/100, global.selfState.promethesys.audio.audioCtx.currentTime);
    const assets_dir = path.join(__dirname, 'assets');

    try {
      global.selfState.promethesys.audio.sourceIntro.disconnect(global.selfState.promethesys.audio.contextGain);
      global.selfState.promethesys.audio.sourceLoop.disconnect(global.selfState.promethesys.audio.audioDelay);
    } catch {
    }

    global.selfState.promethesys.audio.isMusicPlaying = true;
    if (loop) {
      // if is playing disconnect it
      global.selfState.promethesys.audio.sourceIntro = global.selfState.promethesys.audio.audioCtx.createBufferSource();
      global.selfState.promethesys.audio.sourceLoop = global.selfState.promethesys.audio.audioCtx.createBufferSource();

      const bufferIntro = toArrayBuffer(fs.readFileSync(path.join(assets_dir, file)));
      const bufferLoop = toArrayBuffer(fs.readFileSync(path.join(assets_dir, 'loop_' + file)));

      global.selfState.promethesys.audio.audioCtx.decodeAudioData(bufferIntro, (buf) => {
        const duration = buf.duration;
        // sourceIntro.buffer = buf;
        global.selfState.promethesys.audio.sourceIntro.buffer = buf;
        // selfState.sourceIntro.connect(selfState.sourceIntro);
        // intro fade in
        global.selfState.promethesys.audio.sourceIntro.connect(global.selfState.promethesys.audio.contextGain);
        // set to disconnect
        // selfState.sourceIntro = gainIntro;
        // gainIntro.gain.setValueAtTime(0, context.currentTime+10);
        global.selfState.promethesys.audio.audioDelay = global.selfState.promethesys.audio.audioCtx.createDelay(duration-0.03);
        // var delayNode = context.createDelay()
        global.selfState.promethesys.audio.audioDelay.delayTime.value = duration-0.03;
        global.selfState.promethesys.audio.audioDelay.connect(global.selfState.promethesys.audio.contextGain);

        global.selfState.promethesys.audio.audioCtx.decodeAudioData(bufferLoop, (buf) => {
          global.selfState.promethesys.audio.sourceLoop.buffer = buf;
          global.selfState.promethesys.audio.sourceLoop.loop = true;
          // set loop fade in
          // gainLoop.gain.setValueAtTime(0, context.currentTime);
          // gainLoop.gain.linearRampToValueAtTime(1, context.currentTime + 1);
          global.selfState.promethesys.audio.sourceLoop.connect(global.selfState.promethesys.audio.audioDelay);
          unloading('musicInit');
          global.selfState.promethesys.audio.sourceLoop.start(0); global.selfState.promethesys.audio.sourceIntro.start(0);
        });
      });
    } else {
      global.selfState.promethesys.audio.sourceIntro = global.selfState.promethesys.audio.audioCtx.createBufferSource();
      const buffer = toArrayBuffer(fs.readFileSync(path.join(assets_dir, file)));
      global.selfState.promethesys.audio.audioCtx.decodeAudioData(buffer, (buf) => {
        global.selfState.promethesys.audio.sourceIntro.buffer = buf;
        global.selfState.promethesys.audio.sourceIntro.connect(global.selfState.promethesys.audio.contextGain);
        // selfState.contextGain.gain.setValueAtTime(selfState.userVolume/100, selfState.audioCtx.currentTime);source.start(0);},fadeDuration*1000
        unloading('musicInit');
        global.selfState.promethesys.audio.sourceIntro.start(0);
      });
    }
  }
}

function stopSound() {
  let instaVolDuringFade=50;
  global.selfState.promethesys.audio.audioramp=setInterval(
      function() {
        if (instaVolDuringFade<=0) {
          clearInterval(global.selfState.promethesys.audio.audioramp);
          global.selfState.promethesys.audio.isMusicPlaying=false;
          try {
            global.selfState.promethesys.audio.sourceIntro.disconnect(global.selfState.promethesys.audio.contextGain);
          } catch {}
          try {
            global.selfState.promethesys.audio.sourceLoop.disconnect(global.selfState.promethesys.audio.audioDelay);
          } catch {}
        } else {
          instaVolDuringFade-=4; global.selfState.promethesys.audio.contextGain.gain.setValueAtTime((global.selfState.promethesys.audio.userVolume/100)*(instaVolDuringFade/50), global.selfState.promethesys.audio.audioCtx.currentTime);
        }
      }, 100);
}


playSound('title.wav', true);
