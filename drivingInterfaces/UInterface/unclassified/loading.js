/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

function loading(caller) {
  playFX();
  global.selfState.promethesys.UI.loadings.push(caller);
  document.getElementById('loading').style.display='';

  setTimeout(()=>{
    console.log('unloading!'); unloading(caller);
  }, 30000);
  document.getElementById('loadingBG').className='loadingArise';
}

function unloading(caller) {
  // remove caller from selfState.UI.loadings
  try {
    // eslint-disable-next-line max-len
    global.selfState.promethesys.UI.loadings.splice(global.selfState.promethesys.UI.loadings.indexOf(caller), 1);
  } catch (e) {
    console.log('loading already removed');
  }
  if (global.selfState.promethesys.UI.loadings.length<=0) {
    playFX();
    document.getElementById('loadingBG').className='loadingGone';
    setTimeout(function() {
      document.getElementById('loading').style.display='none';
    }, 1000);
    return;
  }
}
