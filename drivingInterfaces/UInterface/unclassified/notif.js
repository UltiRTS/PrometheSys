// selfState.isFXPlaying=false
selfState.isFXPlaying=false;

function playFX(file='slidingObject.wav', isNotif=false) {
  // selfState.audiovolumeFade=0
  fOutDuration=5; // ms
  fInDuration=5; // ms
  fadeOutStart=5;
  if (selfState.isFXPlaying) {
    return;
  }
  if (isNotif) {
    // console.log('FX playing!!')
    selfState.isFXPlaying=true;
    selfState.FXTmpVolume=0;
    selfState.FXTmpDmpVolume=1;
    selfState.FXaudio = new Audio('assets/'+file);
    selfState.FXaudio.addEventListener('loadeddata', function() {
      selfState.FXaudio.volume=selfState.userNotifVolume/100;
      selfState.FXaudio.play();
      setTimeout(_FXFadeOut, (selfState.FXaudio.duration*1000-fadeOutStart), fOutDuration, isNotif); // call _FXFadeOut() at (selfState.FXaudio.duration-fOutDuration) ms and tell it how long the fade out should be
      _FXFadeIn(fInDuration, isNotif);
    });
  } else {
    // console.log('FX playing!!')
    selfState.isFXPlaying=true;
    selfState.FXTmpVolume=0;
    selfState.FXTmpDmpVolume=1;
    selfState.FXaudio = new Audio('assets/'+file);
    selfState.FXaudio.addEventListener('loadeddata', function() {
      selfState.FXaudio.volume=selfState.userFXVolume/100;
      selfState.FXaudio.play();
      setTimeout(_FXFadeOut, (selfState.FXaudio.duration*1000-fadeOutStart), fOutDuration); // call _FXFadeOut() at (selfState.FXaudio.duration-fOutDuration) ms and tell it how long the fade out should be
      _FXFadeIn(fInDuration);
    });
  }
}

function _FXFadeIn(fInDuration, isNotif=false) {
  // fInDuration=500 //ms
  selfState.fadeInTimer=setInterval(__audioAmp, fInDuration/10, isNotif);
}

function __audioAmp(isNotif) {
  selfState.FXTmpVolume+=0.1;
  // console.log('FX fading in')
  if (selfState.FXTmpVolume>=1) {
    clearInterval(selfState.fadeInTimer);
    selfState.FXTmpVolume=0;
    return;
  }
  if (isNotif) {
    selfState.FXaudio.volume=selfState.FXTmpVolume*selfState.userNotifVolume/100;
  } else {
    selfState.FXaudio.volume=selfState.FXTmpVolume*selfState.userFXVolume/100;
  }
}

function _FXFadeOut(fOutDuration, isNotif=false) {
  selfState.fadeOutTimer=setInterval(__audioDmp, fOutDuration/10, isNotif);
}

function __audioDmp(isNotif) {
  selfState.FXTmpDmpVolume-=0.1;
  // console.log('FX fading out')
  if (selfState.FXTmpDmpVolume<=0) {
    clearInterval(selfState.fadeOutTimer);
    selfState.FXTmpDmpVolume=1;
    selfState.isFXPlaying=false;
    return;
  }
  // console.log('out '+selfState.FXTmpDmpVolume*selfState.userFXVolume/100)
  if (isNotif) {
    selfState.FXaudio.volume=selfState.FXTmpDmpVolume*selfState.userNotifVolume/100;
  } else {
    selfState.FXaudio.volume=selfState.FXTmpDmpVolume*selfState.userFXVolume/100;
  }
}
