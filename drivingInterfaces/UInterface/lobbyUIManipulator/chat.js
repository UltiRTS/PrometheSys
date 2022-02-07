/* eslint-disable no-var */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const {WebSocket} = require('ws');

// selfState.channelLastAuthor = {};

function msgPut(Q) {
  // Q[0]=user;1=msg;2=channel

  chatGemPut(Q[2]);
  let timeLocal = '';
  let amorPm='';

  if (selfState.promethesys.chats.chatThatNeedsToBeUpdated['chatUserContent' + Q[2]]) {
    const d = new Date(); // for now
    if (d.getHours()>=12) {
      amorPm='PM';
    } else {
      amorPm='AM';
    }
    // d.getMinutes(); // =>  30
    // d.getSeconds();
    timeLocal = String(d.getHours()) + ':' + String(d.getMinutes());
    selfState.promethesys.chats.chatThatNeedsToBeUpdated['chatUserContent' + Q[2]] = false;
    setTimeout(() => {
      selfState.promethesys.chats.chatThatNeedsToBeUpdated['chatUserContent' + Q[2]] = true;
    }, 20000);
    // console.log('logging time for '+"chatUserContent"+Q[2])
  }

  if (Q[2] == 'bus') {
    if (selfState.promethesys.chats.channelLastAuthor[Q[2]] == Q[0]) {
      _msgWrite(Q[2], Q[0], 'THEA_EXEC()', Q[1], timeLocal, amorPm, false);
    } else {
      _msgWrite(Q[2], Q[0], 'THEA_EXEC()', Q[1], timeLocal, amorPm, true);
    }
  } else {
    label = 'Thea Pharmaeuticals Inc.';
    if (Q[1].includes(selfState.promethesys.sys.username) && Q[0] != selfState.promethesys.sys.username) {
      label = 'REPLY';
    }

    if (selfState.promethesys.chats.channelLastAuthor[Q[2]] == Q[0]) {
      _msgWrite(Q[2], Q[0], label, Q[1], timeLocal, amorPm, false);
    } else {
      _msgWrite(Q[2], Q[0], label, Q[1], timeLocal, amorPm, true);
    }
  }

  if (document.none && Q[2] != 'bus') {
    playFX('notif.ogg', true);
  }

  selfState.promethesys.chats.channelLastAuthor[Q[2]] = Q[0];
}

function _msgWrite(channel, author, label, msg, timeLocal, amorPm, isNewAuthor = true) {
  if (isNewAuthor) {
    if (author.startsWith('Autohost')) {
      newLiner = document.createElement('div');
      newLiner.innerHTML = '<p style="/* mix-blend-mode:screen; */z-index:1;left:8px;padding: 6px;font-size: 38px;height:15px;position:relative;top:0px;display:inline-block;color: #2196f370;/* background-color: rgb(33 150 243 / 31%); */padding-bottom: 15px;margin:0;backdrop-filter: blur(58px);font-weight:900;">' + 'THEA' + '</p><p style="mix-blend-mode:screen;padding: 18px;padding-left: 82px;font-size: 13px;height:15px;left: 9px;position:relative;top: -2px;display:inline-block;color: #ffffffab;background-color: rgb(255 150 33 / 11%);z-index:-1;/* font-family:JuneBug6; */font-weight:900;padding-bottom: 3px;margin:0;/* backdrop-filter: blur(58px); */">' + 'SYSTEM' + '</p><p class="actualMsg" style="position:relative;color: #ffffff9c;margin:0px;width:90%;word-wrap: break-word;">' + msg + '</p><div class="highlightedMsg" style="position:absolute;left:-2px;height:100%;width:5px;top:4%;"></div><div style="margin:0;right: 1.5vw;position:absolute;height: 65px;color:white;opacity: 0.3;font-size: 48px;font-weight:900;bottom:0%;overflow:hidden;z-index:10;/* backdrop-filter: opacity(20%); *//* background:red; *//* backdrop-filter: blur(100px); */"><p style="position:relative;margin:0;font-size: 47px;top: -7px;">' + timeLocal + '</p><p style="position:relative;margin:0;font-size: 31px;top: -20px;">'+amorPm+'</p></div>';
      newLiner.className = 'singleUserMsg';
      newLiner.style.cssText = 'position:relative;width:100%;left:0%;';
      document.getElementById('chatUserContent' + channel).appendChild(newLiner);
      newLiner = document.createElement('br');
      document.getElementById('chatUserContent' + channel).appendChild(newLiner);
    } else if (label == 'REPLY') {
      newLiner = document.createElement('div');
      newLiner.innerHTML = '<p style="/* mix-blend-mode:screen; */z-index:1;left:8px;padding: 6px;font-size: 38px;height:15px;position:relative;top:0px;display:inline-block;color: #2196f370;/* background-color: rgb(33 150 243 / 31%); */padding-bottom: 15px;margin:0;backdrop-filter: blur(58px);font-weight:900;">' + author + '</p><p style="mix-blend-mode:screen;padding: 18px;padding-left: 82px;font-size: 13px;height:15px;left: 9px;position:relative;top: -2px;display:inline-block;color: #ffffffab;background-color: rgb(255 150 33 / 11%);z-index:-1;/* font-family:JuneBug6; */font-weight:900;padding-bottom: 3px;margin:0;/* backdrop-filter: blur(58px); */">' + label + '</p><p class="actualMsg" style="position:relative;color: #ffffff9c;margin:0px;width:90%;word-wrap: break-word;">' + msg + '</p><div class="highlightedMsg" style="position:absolute;left:-2px;height:100%;width:5px;top:4%;"></div><div style="margin:0;right: 1.5vw;position:absolute;height: 65px;color:white;opacity: 0.3;font-size: 48px;font-weight:900;bottom:0%;overflow:hidden;z-index:10;/* backdrop-filter: opacity(20%); *//* background:red; *//* backdrop-filter: blur(100px); */"><p style="position:relative;margin:0;font-size: 47px;top: -7px;">' + timeLocal + '</p><p style="position:relative;margin:0;font-size: 31px;top: -20px;">'+amorPm+'</p></div>';

      newLiner.style.cssText = 'position:relative;width:100%;left:0%;';
      newLiner.className = 'singleUserMsg';
      document.getElementById('chatUserContent' + channel).appendChild(newLiner);
      newLiner = document.createElement('br');
      document.getElementById('chatUserContent' + channel).appendChild(newLiner);
    } else {
      newLiner = document.createElement('div');
      newLiner.innerHTML = '<p style="/* mix-blend-mode:screen; */z-index:1;left:8px;padding: 6px;font-size: 38px;height:15px;position:relative;top:0px;display:inline-block;color: #2196f370;/* background-color: rgb(33 150 243 / 31%); */padding-bottom: 15px;margin:0;backdrop-filter: blur(58px);font-weight:900;">' + author + '</p><p style="mix-blend-mode:screen;padding: 18px;padding-left: 82px;font-size: 13px;height:15px;left: 9px;position:relative;top: -2px;display:inline-block;color: #ffffffab;background-color: rgb(200 200 200 / 11%);z-index:-1;/* font-family:JuneBug6; */font-weight:900;padding-bottom: 3px;margin:0;/* backdrop-filter: blur(58px); */">' + label + '</p><p class="actualMsg" style="position:relative;color: #ffffff9c;margin:0px;width:90%;word-wrap: break-word;">' + msg + '</p><div class="ordinaryMsg" style="position:absolute;left:-2px;height:100%;width:5px;top:4%;"></div><div style="margin:0;right: 1.5vw;position:absolute;height: 65px;color:white;opacity: 0.3;font-size: 48px;font-weight:900;bottom:0%;overflow:hidden;z-index:10;/* backdrop-filter: opacity(20%); *//* background:red; *//* backdrop-filter: blur(100px); */"><p style="position:relative;margin:0;font-size: 47px;top: -7px;">' + timeLocal + '</p><p style="position:relative;margin:0;font-size: 31px;top: -20px;">'+amorPm+'</p></div>';

      newLiner.style.cssText = 'position:relative;width:100%;left:0%;';
      newLiner.className = 'singleUserMsg';
      document.getElementById('chatUserContent' + channel).appendChild(newLiner);
      newLiner = document.createElement('br');
      document.getElementById('chatUserContent' + channel).appendChild(newLiner);
    }
  } else { // insert the thing into the last singleuser msg
    newLiner = document.createElement('p');
    newLiner.innerHTML = msg;
    newLiner.style.cssText = 'position: relative;left: 8px;color: #ffffff9c;margin: 0px;width: 90%;overflow-wrap: break-word;';
    document.getElementById('chatUserContent' + channel).childNodes[document.getElementById('chatUserContent' + channel).childNodes.length - 2].appendChild(newLiner);
  }

  if (!document.getElementById('chatUserContent' + channel).offsetParent === null) { // scroll the chat
    chatWindow = document.getElementById('chatUserContent' + channel);
    const xH = chatselfState.scrollHeight;
    chatselfState.scrollTo(0, xH);
  }
}


function chatSubmit(channel, msg) {
  // userContent = document.getElementById("name"+displayedChat).value;
  // console.log("normal chat fired!");
  global.lobbyServerInterfaceObj.sayChat(channel, msg);
}

function channelDel(Name) {
  document.getElementById('chatTag' + Name).parentNode.removeChild(document.getElementById('chatTag' + Name));
  document.getElementById('friendFrame' + Name).parentNode.removeChild(document.getElementById('friendFrame' + Name));
  document.getElementById('chat' + Name).parentNode.removeChild(document.getElementById('chat' + Name));

  chatSwt('global');
}

function chatLeave(Name) {
  lobbyServerInterfaceObj.leaveChat(Name);
}

function chatNotesSubmit() {
  selfState.client.say('bus', 'sysctl --comment ' + document.getElementById('hostSays').value + ' --bid ' + selfState.nowinBattle);
  document.getElementById('hostSays').value = '';
}

//  main com is joined automatically without calling any functions
function channelPut(channelName) { // call this function back on joining chat
  try {
    var chatType=global.selfState.promethesys.chats.chatsIndex[channelName].chatType;
  } catch {
    var chatType='default';
  }

  try {
    var chatDesc=global.selfState.promethesys.chats.chatsIndex[channelName].chatDescription;
  } catch {
    var chatDesc='Encrypted Normal Chat';
  }
  if (chatType == 'default'&&channelName!='global') {
    document.getElementById('infopanel').innerHTML += '<div class="friendFrame" id="friendFrame' + channelName + '" style="top:0%;position:absolute;left: 0px; height: 100%; width: 100%;"><h1 style="display:inline-block; position: absolute; color: white; top: -15%; left: -3%;font-family: JuneBug2;">' + channelName + ' █ </h1><h1 style="display:inline-block; position: absolute; color: white; top: -15%; left: 30%;font-family: JuneBug2;">Personnel _</h1><div class="friendlimitingFrame" id="friendlimitingFrame' + channelName + '" style="overflow-x:none;top:3%; y-overflow:auto; position: relative; width:92%;height:91%; display:inline-block; right: -6.3%;"></div></div>';
    document.getElementById('chatList').innerHTML += '<div  style="white-space: nowrap;height:20px;margin-bottom:20px;font-size:15px;filter: drop-shadow(0.3rem 0.3rem 0.1rem rgba(33,150,243,0.7));float: right;" id="chatTag' + channelName + '"><span id="chatTxt' + channelName + '" class="chatTagBody chatTagAnchor" onclick="chatSwt(&#39;' + channelName + '&#39;);playFX(\'smolButton.wav\')"style="cursor: pointer; color: white; padding: 5px;">' + channelName + '</span><i id="chatClose" onmouseover="pushToolTip(\'Press this [button] to [close] this chat\')" onclick="chatLeave(&#39;' + channelName + '&#39;)" class="chatClose fa fa-times-circle" style="cursor: pointer;padding: 6px;" aria-hidden="true" ></i>                                              <div id=\'gemChat'+channelName+'\' style=\'display:none;position:absolute;transform: rotate(45deg);filter: drop-shadow(7px 0px 3px red);\'><div style=\'position:absolute;background:rgba(243,33,33,1);rgba(243,33,33,1);height:0.5vh;width:0.5vh;top:0vh; \'></div><div class=\'gemRing\' style=\'position:absolute;;border: 0.1vh solid rgba(243,33,33,1);\'></div></div></div>';
    pushSmolNotif('default', 'You have been invited to a default chat.');
  } else if (channelName == 'global') {
    document.getElementById('chatList').innerHTML += '<div style="white-space: nowrap;height:20px;margin-bottom:20px;font-size:15px;filter: drop-shadow(0.3rem 0.3rem 0.1rem rgba(33,150,243,0.7));float: right;" id="chatTag' + channelName + '"><span id="chatTxt' + channelName + '"  class="chatTagBody chatTagAnchor" onclick="chatSwt(&#39;' + channelName + '&#39;);playFX(\'smolButton.wav\')"style="cursor: pointer; color: white; padding: 5px;">' + channelName + '</span><i id="chatClose" onclick=\'pushSmolNotif("main","Cannot close the main chat.")\' class="chatClose fa fa-times-circle" style="cursor: pointer;padding: 6px;" aria-hidden="true" ></i>      <div id=\'gemChat'+channelName+'\' style=\'display:none;position:absolute;transform: rotate(45deg);filter: drop-shadow(7px 0px 3px red);\'><div style=\'position:absolute;background:rgba(243,33,33,1);rgba(243,33,33,1);height:0.5vh;width:0.5vh;top:0vh; \'></div><div class=\'gemRing\' style=\'position:absolute;;border: 0.1vh solid rgba(243,33,33,1);\'></div></div></div>';
    pushSmolNotif('mCOM', 'You have been invited to the main chat.');
  } else if (chatType == 'battleChat') {
    document.getElementById('chatList').innerHTML += '<div  style="white-space: nowrap;height:20px;margin-bottom:20px;font-size:15px;filter: drop-shadow(0.3rem 0.3rem 0.1rem rgba(33,150,243,0.7));float: right;" id="chatTag' + channelName + '"><span id="chatTxt' + channelName + '" class="chatTagBody chatTagAnchor" onclick="chatSwt(&#39;' + channelName + '&#39;);playFX(\'smolButton.wav\')"style="cursor: pointer; color: white; padding: 5px;">' + channelName + '</span><i id="chatClose" onmouseover="pushToolTip(\'Press this [button] to [close] this chat\')" onclick="chatLeave(&#39;' + channelName + '&#39;)" class="chatClose fa fa-times-circle" style="cursor: pointer;padding: 6px;" aria-hidden="true" ></i>                                              <div id=\'gemChat'+channelName+'\' style=\'display:none;position:absolute;transform: rotate(45deg);filter: drop-shadow(7px 0px 3px red);\'><div style=\'position:absolute;background:rgba(243,33,33,1);rgba(243,33,33,1);height:0.5vh;width:0.5vh;top:0vh; \'></div><div class=\'gemRing\' style=\'position:absolute;;border: 0.1vh solid rgba(243,33,33,1);\'></div></div></div>';
    pushSmolNotif('bCOM', 'You have been invited to a battle chat.');
  }


  document.getElementById('chatFrames').innerHTML += ' <div class="" style="position:absolute;left:5%;width:95%;height:100%;top:0%;" id="chat' + channelName + '"><h1 style="cursor: default;position: absolute; color: white; top: 1vh; left: 0%;font-family: JuneBug2;font-size:3vh;border:0;margin:0;">' + channelName + '</h1><p style="position:absolute;top:4.5vh;left:0;cursor: default;color: white; font-family: JuneBug3;font-size:1.5vh;margin:0;">' + chatDesc+ '</p><div class="form__group field" style="cursor: default;bottom:10px;; width:97%; position:absolute;left:-3%;margin:0;height:40px;"><input onchange="chatSubmit(\'' + channelName + '\',' + 'this.value' + ')" type="input" class="form__field" placeholder="' + selfState.username + '" name="name" id=\'name' + channelName + '\' required /><label for="name' + channelName + '" class="form__label" id="formLabel">' + global.selfState.promethesys.sys.username + '</label></div><div class="limitingframe" style="display: flex;flex-direction: column-reverse;cursor: default;width:95%;height: 36vh;top: 6.4vh;overflow:hidden;overflow-y:scroll;position:absolute;"><div class="chatUserContent" id="chatUserContent' + channelName + '" style =" cursor: text;bottom: 3%;width:100%;position: absolute; overflow:visible"><!--chat content to be inserted--></div></div></div>';

  chatSwt(channelName);
  // document.getElementById("chatUserContent"+Name).needTimeStamp=true
  // setTimeout(()=>{selfState.promethesys.chats.chatThatNeedsToBeUpdated["chatUserContent"+Name]=true}, 30000)
  selfState.promethesys.chats.chatThatNeedsToBeUpdated['chatUserContent' + channelName] = true;
}


function chatJoin() {
  const CHANAME = document.getElementById('grabberValue').value;
  global.lobbyServerInterfaceObj.joinChat(CHANAME);
}

function chatSwt(toChat) {
  // console.log("switching to "+toChat);
  // if (fromChat!="disposed") {
  // document.getElementById("chat"+fromChat).style.display = "none";
  // document.getElementById("friendFrame"+fromChat).style.display = "none";

  // }
  // clearScreen(document.getElementById('chatList'))
  clearScreen(document.getElementById('infopanel'));
  clearScreen(document.getElementById('chatFrames'));
  chatTags = document.getElementsByClassName('chatTagAnchor');
  for (let i = 0; i < chatTags.length; i++) {
    const child = chatTags[i];
    child.classList.remove('chatTagBodyDisplayed');
    child.classList.add('chatTagBody');
  }

  document.getElementById('chatTxt' + toChat).classList.add('chatTagBodyDisplayed');
  document.getElementById('chatTxt' + toChat).classList.remove('chatTagBody');
  document.getElementById('friendFrame' + toChat).style.display='';
  document.getElementById('chat' + toChat).style.display='';
  selfState.displayedChat=toChat;
  chatGemKill(toChat);
}


function chatGemPut(chatName) {
  if (chatName==selfState.displayedChat||chatName=='bus') {
    return;
  } else {
    showGem('Chat'+chatName); pushSmolNotif('New Msg!', chatName+'has received a new message!');
  }
}

function chatGemKill(chatName) {
  killAllGem('Chat'+chatName);
}

module.exports = {
  msgPut,
};
