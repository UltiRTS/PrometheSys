/* eslint-disable max-len */
const {WebSocket} = require('ws');
const diff = require('deep-diff');

/**
 * @class Network
 * @description network connection manager between plasmid <-> lobby
 */
class Network {
  /**
     *
     * @param {EventEmitter} centralMessagingBus
     */
  constructor(centralMessagingBus) {
    this.centralMessagingBus = centralMessagingBus;
    this.state = {};
  }

  /**
   * connect to plasmid server
   * @return {true}
   */
  connect() {
    this.socket = new WebSocket('ws://178.18.243.134:9090');
    this.socket.on('open', function open() {
      console.log('network inited');
    });

    this.socket.on('message', (message) => {
      const response = JSON.parse(message);
      // this.centralMessagingBus.emit('lobbyServerMessage', response);
      console.log(response);

      if (response.action === 'stateDump' && global.selfState.promethesys.sys.isLoggedIn) {
        const diffs = diff(this.state, response);
        this.centralMessagingBus.emit('lobbyServerUpdate', diffs, response);
        this.state = response;
      }

      if (response.action === 'stateDump' && !global.selfState.promethesys.sys.isLoggedIn) {
        this.centralMessagingBus.emit('lobbyServerLoggedIn', response);
        global.selfState.promethesys.sys.isLoggedIn = true;
        this.state = response;
      }

      if (response.action === 'PING') {
        this.centralMessagingBus.emit('PONG');
      }
    });

    return this.socket;
  }

  login(username, password) {
    const parameters = {
      usr: username,
      passwd: password
    }; 

    this.send2lobbyServer({
      action: 'LOGIN',
      parameters
    });
  }

  register(username, password) {
    const parameters = {
      usr: username,
      passwd: password
    }; 

    this.send2lobbyServer({
      action: 'REGISTER',
      parameters
    });
  }

  joinChat(chatName) {
    const parameters = {
      chatName
    };

    this.send2lobbyServer({
      action: 'JOINCHAT',
      parameters
    });
  }

  leaveChat(chatName) {
    const parameters = {
      chatName
    };

    this.send2lobbyServer({
      action: 'LEAVECHAT',
      parameters
    });
  }

  sayChat(chatName, chatMsg) {
    const parameters = {
      chatName,
      chatMsg
    };

    this.send2lobbyServer({
      action: 'SAYCHAT',
      parameters
    });
  }

  joinGame(battleName) {
    const parameters = {
      battleName
    };

    this.send2lobbyServer({
      action: 'JOINGAME',
      parameters
    });
  }

  leaveGame(battleName) {
    const parameters = {
      battleName
    };

    this.send2lobbyServer({
      action: 'JOINGAME',
      parameters
    });
  }

  addFriend(freund) {
    const parameters = {
      freund
    };

    this.send2lobbyServer({
      action: 'ADDFREUND',
      parameters
    });
  }

  confirmMsg(id, isAccepted) {
    const parameters = {
      id,
      isAccepted
    };
    
    this.send2lobbyServer({
      action: 'CONFIRMSYSMSG',
      parameters
    });
  }

  startGameVote(battleName) {
    const parameters = {
      battleName
    };

    this.send2lobbyServer({
      action: 'STARTGAME',
      parameters
    });
  }

  setTeam(player, team, isCircuit, isChicken, isSpec) {
    const parameters = {
      player,
      team,
      isCircuit,
      isChicken,
      isSpec
    };

    this.send2lobbyServer({
      action: 'SETTEAM',
      parameters
    });
  }

  setAIHoster(aiHosters) {
    const parameters = {
      aiHosters
    };

    this.send2lobbyServer({
      action: 'SETAIHOSTER',
      parameters
    });
  }

  setMap(battleName, mapId) {
    const parameters = {
      battleToSetMap: battleName,
      mapId
    };

    this.send2lobbyServer({
      action: 'SETMAP',
      parameters
    });
  }

  setRoomNotes(roomName, notes) {
    const parameters = {
      roomName,
      notes
    };

    this.send2lobbyServer({
      action: 'setRoomNotes',
      parameters
    });
  }

  exitGame(battleName) {
    const parameters = {
      battleName
    };

    this.send2lobbyServer({
      action: 'EXITGAME',
      parameters
    });
  }

  midJoin(battleName, isSpec, team) {
    const parameters = {
      battleName,
      isSpec,
      team
    };

    this.send2lobbyServer({
      action: 'MIDJOIN',
      parameters
    });
  }

  haveMap(mapName) {
    const parameters = {
       mapName
    };
    this.send2lobbyServer({
      action: 'haveMap',
      parameters
    });
  }




  /**
   * @param {object} json
   */
  send2lobbyServer(json) {
    console.log('sending');
    console.log(json);
    this.socket.send(JSON.stringify(json));
  }
}

module.exports = {
  Network,
};
