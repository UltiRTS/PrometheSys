/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// selfState.isFXPlaying=false

function playFX(file='slidingObject.wav', isNotif=false) {
  // selfState.audiovolumeFade=0
  let fOutDuration=5; // ms
  let fInDuration=5; // ms
  let fadeOutStart=5;
  if (selfState.promethesys.audio.isFXPlaying) {
    return;
  }
  if (isNotif) {
    // console.log('FX playing!!')
    selfState.promethesys.audio.isFXPlaying=true;
    selfState.promethesys.audio.FXTmpVolume=0;
    selfState.promethesys.audio.FXTmpDmpVolume=1;
    selfState.promethesys.audio.FXaudio = new Audio('assets/'+file);
    selfState.promethesys.audio.FXaudio.addEventListener('loadeddata', function() {
      selfState.promethesys.audio.FXaudio.volume=selfState.userNotifVolume/100;
      selfState.promethesys.audio.FXaudio.play();
      setTimeout(_FXFadeOut, (selfState.promethesys.audio.FXaudio.duration*1000-fadeOutStart), fOutDuration, isNotif); // call _FXFadeOut() at (selfState.FXaudio.duration-fOutDuration) ms and tell it how long the fade out should be
      _FXFadeIn(fInDuration, isNotif);
    });
  } else {
    // console.log('FX playing!!')
    selfState.promethesys.audio.isFXPlaying=true;
    selfState.promethesys.audio.FXTmpVolume=0;
    selfState.promethesys.audio.FXTmpDmpVolume=1;
    selfState.promethesys.audio.FXaudio = new Audio('assets/'+file);
    selfState.promethesys.audio.FXaudio.addEventListener('loadeddata', function() {
      selfState.promethesys.audio.FXaudio.volume=selfState.promethesys.audio.userFXVolume/100;
      selfState.promethesys.audio.FXaudio.play();
      setTimeout(_FXFadeOut, (selfState.promethesys.audio.FXaudio.duration*1000-fadeOutStart), fOutDuration); // call _FXFadeOut() at (selfState.FXaudio.duration-fOutDuration) ms and tell it how long the fade out should be
      _FXFadeIn(fInDuration);
    });
  }
}

function _FXFadeIn(fInDuration, isNotif=false) {
  // fInDuration=500 //ms
  selfState.promethesys.audio.fadeInTimer=setInterval(__audioAmp, fInDuration/10, isNotif);
}

function __audioAmp(isNotif) {
  selfState.promethesys.audio.FXTmpVolume+=0.1;
  // console.log('FX fading in')
  if (selfState.promethesys.audio.FXTmpVolume>=1) {
    clearInterval(selfState.fadeInTimer);
    selfState.promethesys.audio.FXTmpVolume=0;
    return;
  }
  if (isNotif) {
    selfState.promethesys.audio.FXaudio.volume=selfState.promethesys.audio.FXTmpVolume*selfState.promethesys.audio.userNotifVolume/100;
  } else {
    selfState.promethesys.audio.FXaudio.volume=selfState.promethesys.audio.FXTmpVolume*selfState.promethesys.audio.userFXVolume/100;
  }
}

function _FXFadeOut(fOutDuration, isNotif=false) {
  selfState.promethesys.audio.fadeOutTimer=setInterval(__audioDmp, fOutDuration/10, isNotif);
}

function __audioDmp(isNotif) {
  selfState.promethesys.audio.FXTmpDmpVolume-=0.1;
  // console.log('FX fading out')
  if (selfState.promethesys.audio.FXTmpDmpVolume<=0) {
    clearInterval(selfState.promethesys.audio.fadeOutTimer);
    selfState.promethesys.audio.FXTmpDmpVolume=1;
    selfState.promethesys.audio.isFXPlaying=false;
    return;
  }
  // console.log('out '+selfState.FXTmpDmpVolume*selfState.userFXVolume/100)
  if (isNotif) {
    selfState.promethesys.audio.FXaudio.volume=selfState.promethesys.audio.FXTmpDmpVolume*selfState.promethesys.audio.userNotifVolume/100;
  } else {
    selfState.promethesys.audio.FXaudio.volume=selfState.promethesys.audio.FXTmpDmpVolume*selfState.promethesys.audio.userFXVolume/100;
  }
}
