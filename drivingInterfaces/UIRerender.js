/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class UIRender {
  nullFunc = (path, params) => {
    console.log('AT :', path);
    console.log(params);
  };

  nullFunc1 = (path, params) => {
    console.log('');
  };


  postLogin = (state) => {
    console.log(state);
    global.selfState.promethesys.sys.username = state.paramaters.usrstats.username;
    global.selfState.promethesys.sys.isLoggedin = true;
    playSound('lobby_intro.wav', true);
    // loading(false)
    lobbyPresence();
    global.selfState.promethesys.UI.currentZone = 'lobby';
    finalBoxEnlargeLeave();
    global.selfState.promethesys.chats.chatsIndex = state.paramaters.chatsIndex; // sets up chat index; only update the index once upon login
    for (const game of state.paramaters.games) { // sets up all games
      global.selfState.setGame(game.battleName, game.port, game.ip, game.isStarted, game.map, game.polls, game.players, game.id);
      lobbyzoneAppendBtl(game.id, game.map, game.battleName, game.ip);
    }
  };


  /**
 * Teresa's new function
 */

  channelUpdate(diff, path) {
    console.log('channel update triggered: ');
    console.log(diff);
    console.log(path);
    if (diff.item.kind === 'N') {
      const channelName = diff.item.rhs;
      channelPut(channelName);
    }
    if (diff.item.kind === 'D') {
      const channelName = diff.item.lhs;
      channelDel(channelName);
    }
  }


  chatMsgUpdate = (chatusr, chatmsg, chatchannel) => {
    msgPut([chatusr, chatmsg, chatchannel]);
  };

  // this will update prebtl panel once joined a battle
  updateRoom = (diff, path) => {
    // console.log('updateRoomList triggered: ');
    // console.log(diff);
    // console.log(path);
    let roomName;
    try { // this creates new battle chat for the room
      if (diff.kind == 'E' && diff.rhs != null) {
        roomName = diff.rhs;
        const mapID = selfState.promethesys.game[roomName].map;
        const mapName = selfState.mapID2Name(mapID);
        lobbyFlush(roomName, mapName);
        global.selfState.promethesys.sys.currentGame = roomName;
        lobbyServerInterfaceObj.joinChat(roomName);
        initBtlFrd();
        try {
          global.selfState.promethesys.chats.chatsIndex[roomName].chatType = 'battleChat';
          global.selfState.promethesys.chats.chatsIndex[roomName].chatDescription = 'battle chat';
          refreshBtlFrd();
        }
        catch (err) {
          global.selfState.promethesys.chats.chatsIndex[roomName] = {};
          global.selfState.promethesys.chats.chatsIndex[roomName].chatType = 'battleChat';
          global.selfState.promethesys.chats.chatsIndex[roomName].chatDescription = 'battle chat';
          refreshBtlFrd(); // game with their player list consistency maintained by updateGame, here we refresh battle freund when a client is in a game
        }
      }

    } catch {

    }

    try { // this disables prebtl panel and leaves chat
      if (diff.kind == 'E' && diff.rhs == null) {
        roomName = diff.rhs;
        prebtlUnflush();
        lobbyServerInterfaceObj.leaveChat(global.selfState.promethesys.sys.currentGame);
        global.selfState.promethesys.sys.currentGame = roomName;
      }
    } catch {
    }
  };

  // this updates the game lists in mp menu
  updateGame = (diff, path) => {
    console.log('updateGame fired');
    console.log(diff);
    // console.log(path);

    try { // this adds a game to the game list
      if (diff.item.kind == 'N') {
        global.selfState.setGame(diff.item.rhs.battleName, diff.item.rhs.port, diff.item.rhs.ip, diff.item.rhs.isStarted, diff.item.rhs.map, diff.item.rhs.polls, diff.item.rhs.players, diff.item.rhs.id, diff.item.rhs.engineToekn);
        lobbyzoneAppendBtl(diff.item.rhs.id, diff.item.rhs.map, diff.item.rhs.battleName, diff.item.rhs.ip);
      }
    } catch (err) {
    }

    // this removes a game from the game list
    try {
      if (diff.item.kind == 'D' && diff.path[1] == 'games') {
        lobbyzoneRemoveBtl(diff.item.lhs.id);
        global.selfState.removeGameByID(diff.item.lhs.id);
      }
    } catch (err) {
      // console.log(err);
    }

    try { // another human joins a hosted game
      if (diff.kind == 'N' && diff.path[4] == 'players') {
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        game.players.players[diff.path[5]] = diff.rhs;
        refreshBtlFrd();
      }
    } catch { }
    try { // another human leaves a hosted game
      if (diff.kind == 'D' && diff.path[4] == 'players') {
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        delete game.players.players[diff.path[5]];
        refreshBtlFrd();
      }
    } catch { }
    try { // this catches poll number update
      if (diff.kind == 'N' && diff.path[3] == 'polls') {
        const id = path[2];
        global.selfState.updatePoll(id, path[4], diff.rhs);
      }
    } catch (err) {
    }
    try { // added ais
      if (diff.kind == 'N' && diff.path[4] == 'AIs') {
        // console.log('update AI fired');
        // console.log(diff);
        // console.log(path);
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        game.players.AIs[diff.path[5]] = diff.rhs;
        refreshBtlFrd();
      }
    } catch (err) {
      // console.log(err);
    }

    try { // deleted ais
      if (diff.kind == 'D' && diff.path[4] == 'AIs') {
        // console.log('update AI fired');
        // console.log(diff);
        // console.log(path);
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        // game.players.AIs[diff.path[5]]=diff.rhs;
        // delete this ai from the game
        delete game.players.AIs[diff.path[5]];
        refreshBtlFrd();
      }
    } catch (err) {
      // console.log(err);
    }

    try { // added chickens
      if (diff.kind == 'N' && diff.path[4] == 'chickens') {
        // console.log('update chicken fired');
        // console.log(diff);
        // console.log(path);
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        game.players.chickens[diff.path[5]] = diff.rhs;
        refreshBtlFrd();
      }
    } catch (err) {
      // console.log(err);
    }
    // deleted chickens
    try {
      if (diff.kind == 'D' && diff.path[4] == 'chickens') {
        // console.log('update chicken fired');
        // console.log(diff);
        // console.log(path);
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        // game.players.chickens[diff.path[5]]=diff.rhs;
        // delete this chicken from the game
        delete game.players.chickens[diff.path[5]];
        refreshBtlFrd();
      }
    } catch (err) {
      // console.log(err);
    }

    try { // ai changes teams
      if (diff.kind == 'E' && diff.path[6] == 'team' && diff.path[4] == 'AIs') {
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        game.players.AIs[diff.path[5]].team = diff.rhs;
        refreshBtlFrd();
      }
    } catch { }
    try { // chicken changes teams
      if (diff.kind == 'E' && diff.path[6] == 'team' && diff.path[4] == 'chickens') {
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        game.players.chickens[diff.path[5]].team = diff.rhs;
        refreshBtlFrd();
      }
    } catch { }
    try { // human changes teams
      if (diff.kind == 'E' && diff.path[6] == 'team' && diff.path[4] == 'players') {
        const id = diff.path[2];
        const game = global.selfState.getGameByID(id);
        game.players.players[diff.path[5]].team = diff.rhs;
        refreshBtlFrd();
      }
    } catch { }

    try { // game is started
      if (diff.kind == 'E' && diff.path[3] == 'isStarted' && diff.rhs == true) {
        try {
          const id = diff.path[2];
          const game = global.selfState.getGameByID(id);
          game.isStarted = diff.rhs;
          if (game.gameName == global.selfState.promethesys.sys.currentGame) {
            usyncWriteScript(game);
            const map = selfState.promethesys.game[game.gameName].map;
            const mapName = selfState.mapID2Name(map);
            lobbyFlush(game.gameName, mapName);
          }
        } catch (err) {
          //console.log(err);
        }
      }
    } catch {
    }

    try { // changes map
      if (diff.kind == 'E' && diff.path[3] == 'map') {
        try {
          const id = diff.path[2];
          const game = global.selfState.getGameByID(id);
          game.map = diff.rhs;
          if (game.gameName == global.selfState.promethesys.sys.currentGame) {
            prebattleUpdateMap(selfState.mapID2Name(diff.rhs))
          }
          lobbyLauncherInterfaceObj.lobbyLauncherDownloadAllMap();
        } catch (err) {
          // console.log(err);
        }
      }
    } catch {
    }

    try { // game is exited
      if (diff.kind == 'E' && diff.path[3] == 'isStarted' && diff.rhs == false) {
        try {
          const id = diff.path[2];
          const game = global.selfState.getGameByID(id);
          game.isStarted = diff.rhs;
          if (game.gameName == global.selfState.promethesys.sys.currentGame) {
            const map = selfState.promethesys.game[game.gameName].map;
            const mapName = selfState.mapID2Name(map);
            lobbyFlush(game.gameName, mapName);
          }
        } catch (err) {
          // console.log(err);
        }
      }
    } catch {
    }



  };
  // this chat should only be used to update chat members! chat description was set upon login and then lobby will alter the descs!
  updateChatsIndex = (diff, path) => {
    console.log('updateChatsIndex triggered: ');
    console.log(diff);
    console.log(path);
    // frdPut(CHANME, user, 'A\'s gem');
  };
  /**
 *
 * @param {object} diffs deep-diff generated diffs
 *
  renderDiff(diffs) {
    for (const diff of diffs) {
      const path = diff.path;
      let currentNode = this.nodeStructure;
      for (let i = 0; i < path.length; i++) {
        const nextNode = path[i];
        currentNode = currentNode[nextNode];

        if (typeof (currentNode) === 'function') {
          currentNode(diff, path.join('.'));
          break;
        }
      }
    }
  }
*/
  renderDiff(diffObj){
    // if the last element in diffObj.path[] is in functionTree, call it
    const endVar = diffObj.path[diffObj.path.length-1];
    if (this.functionTree[endVar]){
      console.log('captured valid keys in server response:');
      this.functionTree[endVar](diffObj, diffObj.path);
    }
    


  }



functionTree ={
    action: this.nullFunc1,
    triggeredBy: this.nullFunc1,
    games: this.updateGame,
    chatsIndex: this.updateChatsIndex,
    poll: this.nullFunc1,
    AIs: this.nullFunc1,
    notifications: this.nullFunc1,
    loggedIn: this.nullFunc1,
    accLevel: this.nullFunc1,
    chats: this.channelUpdate,
    room: this.updateRoom,
    team: this.nullFunc1,
    fruneds: this.nullFunc1,
    chatMsg: this.nullFunc1,
    username: this.nullFunc1,
    
  }


}

module.exports = {
  UIRender,
};
