/* eslint-disable no-multi-str */
/* eslint-disable no-tabs */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable brace-style */
function freundsMainGo2AllSavedFreunds() {
  document.getElementById('freundMainBgFrame').classList = 'freundMainBgFrame flyout';
  setTimeout(function() {
    document.getElementById('freundMainBgFrame').style.display = 'none';
  }, 500);
  document.getElementById('friendlimitingFramemain').classList = 'friendlimitingFrame flyin';
  document.getElementById('friendlimitingFramemain').style.display = 'inline-block';
}

function freundsMainBack() {
  document.getElementById('friendlimitingFramemain').classList = 'freundMainBgFrame flyout';
  setTimeout(function() {
    document.getElementById('friendlimitingFramemain').style.display = 'none';
  }, 500);
  document.getElementById('freundMainBgFrame').classList = 'freundMainBgFrame flyin';
  document.getElementById('freundMainBgFrame').style.display = '';
}

function initBtlFrd() {
  const channelName=global.selfState.promethesys.sys.currentGame;
  document.getElementById('infopanel').innerHTML += '<div class="friendFrame" id="friendFrame' + channelName + '" style="top:0%;position:absolute;left: 0px; height: 100%; width: 100%;"><h1 style="display:inline-block; position: absolute; color: white; top: -15%; left: -3%;font-family: JuneBug2;">' + channelName + ' <span class="Add" onclick=\'lobbyServerInterfaceObj.setAI()\'>█</span> <span class="Add" onclick=\'lobbyServerInterfaceObj.setChicken()\'>█</span> </h1><h1 style="display:inline-block; position: absolute; color: white; top: -15%; left: 30%;font-family: JuneBug2;">Personnel _</h1><div class="friendlimitingFrame" id="friendlimitingFrame' + channelName + '" style="overflow-x:hidden;top:3%; y-overflow:auto; position: relative; width:92%;height:91%; display:inline-block; right: -6.3%;"></div></div>';
}
function refreshBtlFrd() {
  if (global.selfState.promethesys.sys.currentGame == null) return;
  const currentBtl=global.selfState.promethesys.sys.currentGame;


  removeAllChildNodes('friendlimitingFrame' + currentBtl);
  for (const usr in global.selfState.promethesys.game[currentBtl].players.players) {
    const isSpec=global.selfState.promethesys.game[currentBtl].players.players[usr].isSpec;
    const hasmap=global.selfState.promethesys.game[currentBtl].players.players[usr].hasmap;
    const team=global.selfState.promethesys.game[currentBtl].players.players[usr].team;
    frdPut(currentBtl, usr, 'A\'s gem', true, isSpec, hasmap, team);
  }


  for (const usr in global.selfState.promethesys.game[currentBtl].players.AIs) {
    aiPut(currentBtl, usr, global.selfState.promethesys.game[currentBtl].players.AIs[usr].team);
  }

  for (const usr in global.selfState.promethesys.game[currentBtl].players.chickens) {
    chickenPut(currentBtl, usr, global.selfState.promethesys.game[currentBtl].players.chickens[usr].team);
  }

  try {
    document.getElementById('cardIsLeader' + selfState.nowinBattle + selfState.teamLeaders).style.opacity = '1';
  } catch (err) {
    // console.log('cant find the leader!')

  }
  function removeAllChildNodes(parent) {
    while (document.getElementById(parent).firstChild) {
      document.getElementById(parent).removeChild(document.getElementById(parent).firstChild);
    }
  }
}


function frdPut(page, name, battle, isBtlFrd = false, isSpec = false, haveMap = true, team) {
  if (isBtlFrd) {
    if (isSpec) {
      console.log('spec');
      document.getElementById('friendlimitingFrame' + page).innerHTML += '<div style="margin:1%;height:70px;" class="userCard" onmouseenter="showFrdOptions(\'frdOptions' + page + name + '\')" onmouseleave="hideFrdOptions(\'frdOptions' + page + name + '\')" id="userCard' + page + name + '" ><div style="overflow:hidden; position: absolute; height: 100%; top: 0; left:0%; width:100%; background-color: rgba(105,105,105,0.3);display:inline-block;font-size:4vw;text-transform: uppercase;filter: drop-shadow(0.4rem 0.5rem 0.2rem rgba(200,200,200,0.6));color:white;" onclick="chTeams(\'' + name + '\',\'human\')" oncontextmenu="chTeamsDown(\'' + name + '\',\'human\')" id="cardLabel' + page + name + '">' + team + '</div><div class="freundBody" id=\'freundBody' + page + name + '\' style="opacity:0.9;top:0;height:100%;position:absolute;right:0;background:rgba(150,150,150,1);width:85%;"><span style="font-weight:900;font-size:2vw;">' + name + '</span><img src="assets/thea.png" style="position:absolute;width:80%;opacity:0.3;top:37%;left:5%;z-index:-1;"></div><div class="isLeader" id="cardIsLeader' + page + name + '"  style="overflow:visible;position:absolute; bottom:-9%;right:-5%;background:white;padding:2%;">Leader</div><div class="frdOptions" id="frdOptions' + page + name + '" style="overflow:hidden;background:rgba(33,150,243,0.8);display:none; top:0;position:absolute;right:0%;width:70%;height:100%;"><div style="height:90%;top:5%;width:2px;background-color:white;top:5%;position:absolute;" class="verticalLine"></div><div  id=\'frdSubOptions1\'  class="frdSubOptions frdSubOptionsAnim1" onclick="chLeader(\'' + name + '\')" oncontextmenu="chLeader(\'' + name + '\')" style="width:200%; position:absolute;left:8%;">Leader Status</div><div id=\'frdSubOptions2\' class="frdSubOptions frdSubOptionsAnim2" style="width:200%; position:absolute;left:8%;top:25%;">Joint Tactics</div><div id=\'frdSubOptions3\' class="frdSubOptions frdSubOptionsAnim3" onclick="chatDismiss(\'' + name + '\')" style="width:200%; position:absolute;left:8%;top:50%;">Dismiss Personel</div><div id=\'frdSubOptions4\' class="frdSubOptionsAnim4 frdSubOptions" style="width:200%; position:absolute;left:8%;top:75%; " onclick="inputGrabber(\'Add Freund\',\'Please type in greetings\',\'Nice to meet you!\',\'selfState.client.addFreund\',\''+name+'\')">Save Colleague</div></div></div>';
    } else if (haveMap) {
      console.log('habe map');
      document.getElementById('friendlimitingFrame' + page).innerHTML += '<div style="margin:1%;height:70px;" class="userCard" onmouseenter="showFrdOptions(\'frdOptions' + page + name + '\')" onmouseleave="hideFrdOptions(\'frdOptions' + page + name + '\')" id="userCard' + page + name + '" ><div style="overflow:hidden; position: absolute; height: 100%; top: 0; left:0%; width:100%; background-color: rgba(105,105,105,0.3);display:inline-block;font-size:4vw;text-transform: uppercase;filter: drop-shadow(0.4rem 0.5rem 0.2rem rgba(200,200,200,0.6));color:white;" onclick="chTeams(\'' + name + '\',\'human\')" oncontextmenu="chTeamsDown(\'' + name + '\',\'human\')" id="cardLabel' + page + name + '">' + team + '</div><div class="freundBody" id=\'freundBody' + page + name + '\' style="opacity:0.9;top:0;height:100%;position:absolute;right:0;background:rgba(33,150,243,1);width:85%;"><span style="font-weight:900;font-size:2vw;">' + name + '</span><img src="assets/thea.png" style="position:absolute;width:80%;opacity:0.3;top:37%;left:5%;z-index:-1;"></div><div class="isLeader" id="cardIsLeader' + page + name + '"  style="overflow:visible;position:absolute; bottom:-9%;right:-5%;background:white;padding:2%;">Leader</div><div class="frdOptions" id="frdOptions' + page + name + '" style="overflow:hidden;background:rgba(33,150,243,0.8);display:none; top:0;position:absolute;right:0%;width:70%;height:100%;"><div style="height:90%;top:5%;width:2px;background-color:white;top:5%;position:absolute;" class="verticalLine"></div><div  id=\'frdSubOptions1\'  class="frdSubOptions frdSubOptionsAnim1" onclick="chLeader(\'' + name + '\')" oncontextmenu="chLeader(\'' + name + '\')" style="width:200%; position:absolute;left:8%;">Leader Status</div><div id=\'frdSubOptions2\' class="frdSubOptions frdSubOptionsAnim2" style="width:200%; position:absolute;left:8%;top:25%;">Joint Tactics</div><div id=\'frdSubOptions3\' class="frdSubOptions frdSubOptionsAnim3" onclick="chatDismiss(\'' + name + '\')" style="width:200%; position:absolute;left:8%;top:50%;">Dismiss Personel</div><div id=\'frdSubOptions4\' class="frdSubOptionsAnim4 frdSubOptions" style="width:200%; position:absolute;left:8%;top:75%;" onclick="inputGrabber(\'Add Freund\',\'Please type in greetings\',\'Nice to meet you!\',\'selfState.client.addFreund\',\''+name+'\')">Save Colleague</div></div></div>';
    } else {
      console.log('no map');
      document.getElementById('friendlimitingFrame' + page).innerHTML += '<div style="margin:1%;height:70px;" class="userCard" onmouseenter="showFrdOptions(\'frdOptions' + page + name + '\')" onmouseleave="hideFrdOptions(\'frdOptions' + page + name + '\')" id="userCard' + page + name + '" ><div style="overflow:hidden; position: absolute; height: 100%; top: 0; left:0%; width:100%; background-color: rgba(105,105,105,0.3);display:inline-block;font-size:4vw;text-transform: uppercase;filter: drop-shadow(0.4rem 0.5rem 0.2rem rgba(200,200,200,0.6));color:white;" onclick="chTeams(\'' + name + '\',\'human\')" oncontextmenu="chTeamsDown(\'' + name + '\',\'human\')" id="cardLabel' + page + name + '">' + team + '</div><div class="freundBody" id=\'freundBody' + page + name + '\' style="opacity:0.9;top:0;height:100%;position:absolute;right:0;background:rgba(243,33,33,1);width:85%;"><span style="font-weight:900;font-size:2vw;">' + name + '</span><img src="assets/thea.png" style="position:absolute;width:80%;opacity:0.3;top:37%;left:5%;z-index:-1;"></div><div class="isLeader" id="cardIsLeader' + page + name + '"  style="overflow:visible;position:absolute; bottom:-9%;right:-5%;background:white;padding:2%;">Leader</div><div class="frdOptions" id="frdOptions' + page + name + '" style="overflow:hidden;background:rgba(33,150,243,0.8);display:none; top:0;position:absolute;right:0%;width:70%;height:100%;"><div style="height:90%;top:5%;width:2px;background-color:white;top:5%;position:absolute;" class="verticalLine"></div><div  id=\'frdSubOptions1\'  class="frdSubOptions frdSubOptionsAnim1" onclick="chLeader(\'' + name + '\')" oncontextmenu="chLeader(\'' + name + '\')" style="width:200%; position:absolute;left:8%;">Leader Status</div><div id=\'frdSubOptions2\' class="frdSubOptions frdSubOptionsAnim2" style="width:200%; position:absolute;left:8%;top:25%;">Joint Tactics</div><div id=\'frdSubOptions3\' class="frdSubOptions frdSubOptionsAnim3" onclick="chatDismiss(\'' + name + '\')" style="width:200%; position:absolute;left:8%;top:50%;">Dismiss Personel</div><div id=\'frdSubOptions4\' class="frdSubOptionsAnim4 frdSubOptions" style="width:200%; position:absolute;left:8%;top:75%;" onclick="inputGrabber(\'Add Freund\',\'Please type in greetings\',\'Nice to meet you!\',\'selfState.client.addFreund\',\''+name+'\')">Save Colleague</div></div></div>';
    }
  } else {
    document.getElementById('friendlimitingFrame' + page).innerHTML += '<div class="userCard" style="margin:1%;height:70px;" id="userCard' + page + name + '" ><div style="overflow:hidden; position: absolute; height: 100%; top: 0; left:0%; width:100%; background-color: rgba(105,105,105,0.3);display:inline-block;font-size:7vh;"></div><div class="freundBody" style="opacity:0.9;width:85%;top:0;height:100%; background:rgba(33,150,243,1);position:absolute;left:15%;"><span style="font-family: JuneBug2">' + name + '</span><br><span>In ' + battle + '<br> For: -\\- hr  -\\-min</span></div></div>';
  }
}

function mainAllFrdRefresh() {
  document.getElementById('friendlimitingFramemain').innerHTML = '';
  const htmlTemp = '\
		<div class="userCard" onclick=""\
			style="/* position:absolute; */background: rgba(255,255,255,0.2);transform:skew(0.312rad);pointer-events:initial;left:0;filter: drop-shadow(10px 10px 2px rgba(97, 185, 255,0.4));">\
			<div class="mainUserCardBg"\
				style="left:5px;position:absolute;width: 39%;height: 102%;background: #2196f3;box-shadow: 0 0 70px #2196f3;mix-blend-mode:screen;">\
				<p\
					style="overflow:hidden;left:4px;top: -9px;position:absolute;color: black;transform:skew(-0.312rad);">\
					someFancyUsername</p>\
			</div>\
			<p class=""\
				style="white-space: nowrap;font-family:JuneBug4;/* color:white; */margin:0;transform:skew(-0.312rad);color: rgba(255,255,255,0.5);left: 6vw;font-size: clamp(9px, 0.8vw, 18px);position:absolute;">\
				LV. 15</p>\
			<div class="mainUserCardOperations"\
				style="position:absolute;width:50%;left:50%;height:100%;color:black;text-align:right;mix-blend-mode:screen;" onclick="event.stopPropagation();selfState.client.unFreund(\'someFancyUsername\')">\
				<div class="mainUserCardOperationsBG"\
					style="position:absolute;width:100%;left:0%;height:100%;background:red;color:black;text-align:right;/* mix-blend-mode:screen; */">\
				</div>\
				<p style="position:absolute;top:-9px;left:4px;transform:skew(-0.312rad);">Unfreund</p>\
			</div >\
		</div > ';
  for (receivedFreund in selfState.freunds) {
    html2Insert=htmlTemp.replace(/someFancyUsername/g, selfState.freunds[receivedFreund]);
    document.getElementById('friendlimitingFramemain').innerHTML += html2Insert;
  }
}

function showFrdOptions(optionID) {
  // console.log('mouse over');
  selfState.revealFrdSubOptions = setTimeout(function() {
    document.getElementById(optionID).style.display = '';
  }, 200);

  // document.getElementById(optionID).innerHTML+='<! -- -->'
}

function hideFrdOptions(optionID) {
  // console.log('mouse leave');
  document.getElementById(optionID).style.display = 'none';
  clearTimeout(selfState.revealFrdSubOptions);
}


function aiPut(page, name, team) {
  // const cirrentBattle = selfState.promethesys.sys.currentGame;
  document.getElementById('friendlimitingFrame' + page).innerHTML += '<div style="margin:1%; height:70px;" class="userCard" onmouseenter="showFrdOptions(\'frdOptions' + page + name + '\')" onmouseleave="hideFrdOptions(\'frdOptions' + page + name + '\')" id="userCard' + page + name + '" ><div style="overflow:hidden; position: absolute; height: 100%; top: 0; left:0%; width:100%; background-color: rgba(105,105,105,0.3);display:inline-block;font-size:7vh;text-transform: uppercase;filter: drop-shadow(0.4rem 0.5rem 0.2rem rgba(200,200,200,0.6));color:white;" onclick="chTeams(\'' + name + '\',\'ai\')" oncontextmenu="chTeamsDown(\'' + name + '\',\'ai\')" id="cardLabel' + page + name + '">' + team + '</div><div class="freundBody"  style="opacity:0.9;top:0;height:100%;position:absolute;left:15%;background:rgba(33,150,243,1);width:85%;"><span style="font-weight:900;font-size:2rem;">' + name + '</span><img src="assets/theaAI.png" style="position:absolute;width:60%;opacity:0.3;top:37%;left:5%;z-index:-1;"></div><div class="frdOptions" id="frdOptions' + page + name + '" style="overflow:hidden; background:rgba(33,150,243,0.8);display:none; top:0;position:absolute;right:0%;width:70%;height:100%;"><div style="height:90%;top:5%;width:2px;background-color:white;top:5%;position:absolute;" class="verticalLine"></div><div  id=\'frdSubOptions1\'  class="frdSubOptions "  style="width:200%; position:absolute;left:8%;">-/-</div><div id=\'frdSubOptions2\' class="frdSubOptions " style="top:25%;width:200%; position:absolute;left:8%;">Attach</div><div id=\'frdSubOptions3\' class="frdSubOptions " onclick="lobbyServerInterfaceObj.setAI(-1,\'' + name + '\')" style="top:50%;width:200%; position:absolute;left:8%;">Uninit</div><div id=\'frdSubOptions4\' class=" frdSubOptions" style="top:75%;width:200%; position:absolute;left:8%;">-/-</div></div></div>';
}

function chickenPut(page, name, team) {
  // const cirrentBattle = selfState.promethesys.sys.currentGame;
  document.getElementById('friendlimitingFrame' + page).innerHTML += '<div style="margin:1%; height:70px;" class="userCard" onmouseenter="showFrdOptions(\'frdOptions' + page + name + '\')" onmouseleave="hideFrdOptions(\'frdOptions' + page + name + '\')" id="userCard' + page + name + '" ><div style="overflow:hidden; position: absolute; height: 100%; top: 0; left:0%; width:100%; background-color: rgba(105,105,105,0.3);display:inline-block;font-size:7vh;text-transform: uppercase;filter: drop-shadow(0.4rem 0.5rem 0.2rem rgba(200,200,200,0.6));color:white;" onclick="chTeams(\'' + name + '\',\'chicken\')" oncontextmenu="chTeamsDown(\'' + name + '\',\'chicken\')" id="cardLabel' + page + name + '">' + team + '</div><div class="freundBody"  style="opacity:0.9;top:0;height:100%;position:absolute;left:15%;background:rgba(33,150,243,1);width:85%;"><span style="font-weight:900;font-size:2rem;">' + name + '</span><img src="assets/theaAI.png" style="position:absolute;width:60%;opacity:0.3;top:37%;left:5%;z-index:-1;"></div><div class="frdOptions" id="frdOptions' + page + name + '" style="overflow:hidden; background:rgba(33,150,243,0.8);display:none; top:0;position:absolute;right:0%;width:70%;height:100%;"><div style="height:90%;top:5%;width:2px;background-color:white;top:5%;position:absolute;" class="verticalLine"></div><div  id=\'frdSubOptions1\'  class="frdSubOptions "  style="width:200%; position:absolute;left:8%;">-/-</div><div id=\'frdSubOptions2\' class="frdSubOptions " style="top:25%;width:200%; position:absolute;left:8%;">Attach</div><div id=\'frdSubOptions3\' class="frdSubOptions " onclick="lobbyServerInterfaceObj.setChicken(-1,\'' + name + '\')" style="top:50%;width:200%; position:absolute;left:8%;">Uninit</div><div id=\'frdSubOptions4\' class=" frdSubOptions" style="top:75%;width:200%; position:absolute;left:8%;">-/-</div></div></div>';
}

function frdEliminate(page, name) {
  // console.log("trying to remove"+ "userCard"+page+name+"")
  try {
    document.getElementById('userCard' + page + name).parentNode.removeChild(document.getElementById('userCard' + page + name));
    // console.log("MP btn called!")
  } catch (error) {
    console.log('cant remove a ghost user!');
  }
}

function chTeams(player, playerType) {
  const currentGame=selfState.promethesys.sys.currentGame;
  let currentTeam;
  switch (playerType) {
    case 'human':
      currentTeam = global.selfState.promethesys.game[currentGame].players.players[player].team;
      const nextTeam=nextLetter(currentTeam);
      lobbyServerInterfaceObj.setPpl(nextTeam, player);
      break;
    case 'ai':
      currentTeam = global.selfState.promethesys.game[currentGame].players.AIs[player].team;
      const nextTeam2=nextLetter(currentTeam);
      lobbyServerInterfaceObj.setAI(nextTeam2, player);
      break;
    case 'chicken':
      currentTeam = global.selfState.promethesys.game[currentGame].players.chickens[player].team;
      const nextTeam3=nextLetter(currentTeam);
      lobbyServerInterfaceObj.setChicken(nextTeam3, player);
      break;
  }
}
function chTeamsDown(player, playerType) {
  const currentGame=selfState.promethesys.sys.currentGame;
  let currentTeam;
  switch (playerType) {
    case 'human':
      currentTeam = global.selfState.promethesys.game[currentGame].players.players[player].team;
      const previousTeam=previousLetter(currentTeam);
      lobbyServerInterfaceObj.setPpl(previousTeam, player);
      break;
    case 'ai':
      currentTeam = global.selfState.promethesys.game[currentGame].players.AIs[player].team;
      const previousTeam3=previousLetter(currentTeam);
      lobbyServerInterfaceObj.setAI(previousTeam3, player);
      break;
    case 'chicken':
      currentTeam = global.selfState.promethesys.game[currentGame].players.chickens[player].team;
      const previousTeam2=previousLetter(currentTeam);
      lobbyServerInterfaceObj.setChicken(previousTeam2, player);
      break;
  }
}

function chLeader(usr) {
  if (selfState.teamLeaders != usr) {
    chatAssignLeader(usr); // tell the function to look up the leader for this team
  } else {
    document.getElementById('cardIsLeader' + selfState.nowinBattle + usr).style.opacity = '0';
    selfState.teamLeaders = 'None';
  }
}


function nextLetter(s) {
  return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
    let c = a.charCodeAt(0);
    switch (c) {
      case 90: return 'A';
      case 122: return 'a';
      default: return String.fromCharCode(++c);
    }
  });
}
function previousLetter(s) {
  return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
    let c = a.charCodeAt(0);
    switch (c) {
      case 65: return 'Z';
      case 97: return 'z';
      default: return String.fromCharCode(--c);
    }
  });
}
selfState.teamLeaders = '';
selfState.ppl = {};
