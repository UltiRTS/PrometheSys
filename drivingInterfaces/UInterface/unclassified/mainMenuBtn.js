/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
function multiplayer() {
  if (selfState.zone=='campaign') {
    campaignUnload();
  }
  if (selfState.zone!='lobby') {
    document.getElementById('settings').style.display='none';
    document.getElementById('campaign').style.display='none';
    document.getElementById('home').style.display='none';

    document.getElementById('lobbyContainer').style.display='';
    chatSwt('global');
    selfState.zone='lobby';
    playSound('lobby_intro.wav', true);

    if (selfState.isExited) {
      document.getElementById('panel').style.display='';
      document.getElementById('prebattle').style.display='none';
    } else {
      document.getElementById('panel').style.display='none';
      document.getElementById('prebattle').style.display='';
    }
  } else if (document.getElementById('panel').style.display=='none' ) {
    document.getElementById('panel').style.display='';
    document.getElementById('prebattle').style.display='none';
  } else if (!selfState.isExited) {
    document.getElementById('panel').style.display='none';
    document.getElementById('prebattle').style.display='';
  }
}

function settings() {
  if (selfState.zone=='campaign') {
    campaignUnload();
  }
  if (selfState.zone!='settings') {
    // clearScreen(document.getElementById("lobbyContainer"))
    document.getElementById('campaign').style.display='none';
    document.getElementById('settings').style.display='';
    document.getElementById('lobbyContainer').style.display='none';
    document.getElementById('home').style.display='none';
    selfState.zone='settings';
    playSound('generalPurposeAutomatedSolution2196f3.wav', true);
  }
}

function campaign() {
  if (selfState.zone=='campaign') {
    campaignUnload();
  }
  if (selfState.zone!='campaign') {
    // clearScreen(document.getElementById("lobbyContainer"))
    document.getElementById('settings').style.display='none';
    document.getElementById('campaign').style.display='';
    document.getElementById('lobbyContainer').style.display='none';
    document.getElementById('home').style.display='none';
    selfState.zone='campaign';
    playSound('void.wav', true);
  }
  campaignLoad();
}

function home() {
  if (selfState.zone=='campaign') {
    campaignUnload();
  }
  if (selfState.zone!='home') {
    // clearScreen(document.getElementById("lobbyContainer"))
    document.getElementById('settings').style.display='none';
    document.getElementById('campaign').style.display='none';
    document.getElementById('lobbyContainer').style.display='none';
    document.getElementById('home').style.display='';
    selfState.zone='home';
    playSound('void.wav', true);
  }
}


