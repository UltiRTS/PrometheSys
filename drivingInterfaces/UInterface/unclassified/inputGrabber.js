/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
function inputGrabber(heading='unifiedInputField', subHeading='Things typed will be retrieved by the caller', exampleInput='main', callback, parameter) {
  document.getElementById('inputGrabberBG').className='grabberArise';
  // playFX()

  document.getElementById('grabberValue').setAttribute('onchange', callback+'(\''+parameter+'\');inputReleaser();');
  document.getElementById('inputGrabber').style.display='';
  document.getElementById('grabberTitle').innerHTML = heading;
  document.getElementById('grabberSubTitle').innerHTML = subHeading;
  document.getElementById('exampleForm').innerHTML = exampleInput;
}

function inputReleaser() {
  // const battleName = document.getElementById('grabberValue').value;
  // lobbyServerInterfaceObj.joinBattle(battleName);
  document.getElementById('inputGrabberBG').className='grabberGone';
  // playFX();
  setTimeout(function() {
    document.getElementById('inputGrabber').style.display = 'none';
  }, 500 );
  document.getElementById('grabberValue').value='';
}


