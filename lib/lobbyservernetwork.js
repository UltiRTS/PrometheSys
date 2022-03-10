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
    this.socket = new WebSocket('ws://127.0.0.1:9090');
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
