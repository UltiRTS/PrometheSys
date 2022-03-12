/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
function personalToggleFullScreen() {
  if (remote.getCurrentWindow().isFullScreen()) {
    remote.getCurrentWindow().setFullScreen(false);
  } else {
    remote.getCurrentWindow().setFullScreen(true);
  }
}

function personalStatsSoundtempToggle() {
  if (selfState.promethesys.audio.contextGain.gain.value<=0.001) {
    selfState.promethesys.audio.contextGain.gain.setValueAtTime(selfState.promethesys.audio.userVolume/100, selfState.promethesys.audio.audioCtx.currentTime);
  } else {
    selfState.promethesys.audio.contextGain.gain.setValueAtTime(0.0001, selfState.promethesys.audio.audioCtx.currentTime);
  }
}

function personalStatsQAOperation() {
  // console.log('c')
  if (document.getElementById('personalStatsQA').style.display=='none') {
    // console.log('a')
    document.getElementById('personalStatsQA').style.display='';
    document.getElementById('personalStatsQA').className='personalStatsQAExp';
  } else {
    // console.log('b')
    document.getElementById('personalStatsQA').style.display='none';
    document.getElementById('personalStatsQA').className='personalStatsQAShrk';
  }
}
