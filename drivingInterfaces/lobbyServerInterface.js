/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */

/**
 * @class ServerInterface
 */
class ServerInterface {
  /**
   * @param {EventEmitter} centralMessagingBus
   * @param {Network} network
   */
  constructor(centralMessagingBus, network, renderObj) {
    this.centralMessagingBus = centralMessagingBus;
    this.lobbyServerNetwork = network;
    // the below inits the UI monitoring and manipulating capabilities
    // UI interface manipolators are inited in index.html

    this.centralMessagingBus.on('lobbyServerUpdate', (diffs, states) => {
      // console.log(diffs);
      if (diffs) renderObj.renderDiff(diffs);
      if (states.paramaters.usrstats.chatMsg!=false) {
        const chatusr=states.paramaters.usrstats.chatMsg.author;
        const chatmsg=states.paramaters.usrstats.chatMsg.msg;
        const chatchannel=states.paramaters.usrstats.chatMsg.channelName;
        renderObj.chatMsgUpdate(chatusr, chatmsg, chatchannel);
      }
    });

    this.centralMessagingBus.on('lobbyServerLoggedIn', (state) => {
      renderObj.postLogin(state);
      // console.log(state.paramaters.chatsIndex);
      // console.log(global.selfState.promethesys.chats.chatsIndex);
      global.selfState.promethesys.chats.chatsIndex=state.paramaters.chatsIndex; // only update the index once upon login
    });

    this.centralMessagingBus.on('PONG', () => {
      // console.log(diffs);
      this.pong();
    });
  }

  /**
   *
   * @return {Socket}
   */
  connect() {
    return this.lobbyServerNetwork.connect();
  }

  /**
   * @description ping <> pong
   */
  pong() {
    const pongJson = {
      action: 'PONG',
      parameters: {
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(pongJson);
  }

  /**
   *
   * @param {String} username
   * @param {String} password
   */
  register(username, password) {
    const registerJson = {
      action: 'REGISTER',
      parameters: {
        usr: username,
        passwd: password,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(registerJson);
  }

  /**
   *
   * @param {String} username
   * @param {String} password
   */
  login(username, password) {
    const loginJson = {
      action: 'LOGIN',
      parameters: {
        usr: username,
        passwd: password,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(loginJson);
  }

  /**
   *
   * @param {String} chat2join
   */
  joinChat(chat2join) {
    const joinChatJson = {
      action: 'JOINCHAT',
      parameters: {
        chatName: chat2join,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(joinChatJson);
  }


  /**
   *
   * @param {String} chat2say
   */
  sayChat(channel, msg) {
    const sayChatJson = {
      action: 'SAYCHAT',
      parameters: {
        chatName: channel,
        msg: msg,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(sayChatJson);
  }

  /**
   *
   * @param {String} chat2leave
   */
  leaveChat(chat2leave) {
    const leaveChatJson = {
      action: 'LEAVECHAT',
      parameters: {
        chatName: chat2leave,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(leaveChatJson);
  }

  /**
   * @description send after register
   */
  registerConfirm() {
    const registerConfirmJson = {
      action: 'regConfirm',
      parameters: {},
    };
    this.lobbyServerNetwork.send2lobbyServer(registerConfirmJson);
  }

  /**
   *
   * @param {String} battleName
   */
  joinBattle(battleName='') {
    if (battleName=='') {
      battleName=document.getElementById('grabberValue').value;
    }
    const joinBattleJson = {
      action: 'JOINGAME',
      parameters: {
        battleName: battleName,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(joinBattleJson);
  }

  /**
   *
   * @param {String} battleName
   */
  leaveBattle(battleName) {
    const leaveBattleJson = {
      action: 'LEAVEGAME',
      parameters: {
        battleName: battleName,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(leaveBattleJson);
  }


  setAI(team='1', AIName='') {
    function getTotalAINumber() {
      const currentGame=global.selfState.promethesys.sys.currentGame;
      let AINum;
      try {
        AINum=Object.keys(global.selfState.promethesys.game[currentGame].players.AIs).length;
      } catch {
        AINum=0;
      }
      console.log('returning AINum: '+AINum);
      return AINum;
    }
    switch (team) {
      case '1':
        const setTeamJson = {
          action: 'SETTEAM',
          parameters: {
            player: 'Circuit'+getTotalAINumber(),
            team: 'A',
            isCircuit: true,
            isChicken: false,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson);
        break;
      case '-1':
        const setTeamJson2 = {
          action: 'SETTEAM',
          parameters: {
            player: AIName,
            team: -1,
            isCircuit: true,
            isChicken: false,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson2);
        break;
      default:
        const setTeamJson3 = {
          action: 'SETTEAM',
          parameters: {
            player: AIName,
            team: team,
            isCircuit: true,
            isChicken: false,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson3);
        break;
    }
  }

  setChicken(team='1', chickenName='') {
    function getTotalChickenNumber() {
      const currentGame=global.selfState.promethesys.sys.currentGame;
      let AINum;
      try {
        AINum=Object.keys(global.selfState.promethesys.game[currentGame].players.chickens).length;
      } catch {
        AINum=0;
      }
      return AINum;
    }
    switch (team) {
      case '1':
        const setTeamJson = {
          action: 'SETTEAM',
          parameters: {
            player: 'Chicken'+getTotalChickenNumber(),
            team: 'A',
            isCircuit: false,
            isChicken: true,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson);
        break;
      case '-1':
        const setTeamJson2 = {
          action: 'SETTEAM',
          parameters: {
            player: chickenName,
            team: -1,
            isCircuit: false,
            isChicken: true,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson2);
        break;
      default:
        const setTeamJson3 = {
          action: 'SETTEAM',
          parameters: {
            player: chickenName,
            team: team,
            isCircuit: false,
            isChicken: true,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson3);
        break;
    }
  }

  setPpl(team='1', pplName='') {
    switch (team) {
    /*  case '1':
        const setTeamJson = {
          action: 'SETTEAM',
          parameters: {
            player: pplName,
            team: 'A',
            isCircuit: false,
            isChicken: true,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson);
        break; */
      // the above might be used to add people
      case '-1':
        const setTeamJson2 = {
          action: 'SETTEAM',
          parameters: {
            player: pplName,
            team: -1,
            isCircuit: false,
            isChicken: false,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson2);
        break;
      default:
        const setTeamJson3 = {
          action: 'SETTEAM',
          parameters: {
            player: pplName,
            team: team,
            isCircuit: false,
            isChicken: false,
            isSpec: false,
          },
        };
        this.lobbyServerNetwork.send2lobbyServer(setTeamJson3);
        break;
    }
  }


  /**
   *
   * @param {String} battle
   * @description send battle start signal
   */
  startGame(battle) {
    const startGameJson = {
      action: 'STARTGAME',
      parameters: {
        battleName: battle,
      },
    };
    this.lobbyServerNetwork.send2lobbyServer(startGameJson);
  }
}

module.exports = {
  ServerInterface,
};
