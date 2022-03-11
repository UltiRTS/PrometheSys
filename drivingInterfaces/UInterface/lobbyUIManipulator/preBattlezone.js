/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

function lobbyFlush(roomName, mapName) {
  // console.log("joined battle"+title)
  document.getElementById('panel').style.display = 'none'; // hide lobby page once user goes to prebattle panel
  document.getElementById('preBtlPanel').style.display='';
  document.getElementById('preBtlGameName').innerHTML=roomName;
  document.getElementById('opMapName').innerHTML=mapName;
  document.getElementById('opMinimap').src='file://'+selfState.promethesys.sys.appPath+'/ultiConfig/maps/'+mapName+'.png';

}

function prebtlUnflush() {
  document.getElementById('panel').style.display='';
  document.getElementById('preBtlPanel').style.display='none';
  removeAllChildNodes('voteZone');
  function removeAllChildNodes(parent) {
    while (document.getElementById(parent).firstChild) {
      document.getElementById(parent).removeChild(document.getElementById(parent).firstChild);
    }
  }
}

function preBtlExitGem() {
  const currentGame = selfState.promethesys.sys.currentGame;
  lobbyServerInterfaceObj.leaveBattle(currentGame); // inform lobby server
  // chatLeave(bID)  //inform lobby chat server
  // lobbyServerInterfaceObj.chatLeaveBtl(); // inform autohost
}

function preBtlStartGem() {
  const currentGame = selfState.promethesys.sys.currentGame;
  lobbyServerInterfaceObj.startGame(currentGame);
}



function prebattleUpdateMap(mapName) {
  document.getElementById('opMapName').innerHTML=mapName;
  document.getElementById('opMinimap').src='file://'+selfState.promethesys.sys.appPath+'/ultiConfig/maps/'+mapName+'.png';
}




