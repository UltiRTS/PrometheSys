const {Network} = require('../lib/lobbyservernetwork');
const {EventEmitter} =require('events');
const {ServerInterface} = require('../drivingInterfaces/lobbyServerInterface');
const {renderDiff} = require('../drivingInterfaces/UIRerender');

const bus = new EventEmitter();
const network = new Network(bus);
const serverInterface = new ServerInterface(bus, network);

const socket = serverInterface.connect();

socket.once('open', () => {
  serverInterface.register('test', 'test');
  console.log('sent register');
});

bus.on('lobbyServerMessage', (msg) => {
  // console.log(msg);
  switch (msg.action) {
    case 'NOTICE':
      if (msg.parameters.type == 'regConfirm') {
        console.log('registration confirmed');
        // serverInterface.login('test', 'test');
        serverInterface.registerConfirm();
      }
      break;
    case 'stateDump':
      switch (msg.triggeredBy) {
        case 'LOGIN':
          console.log('login confirmed');
          serverInterface.joinChat(['test']);
          break;
        case 'JOINCHAT':
          console.log('joined chat');
          serverInterface.sayChat('test', 'test message');
          break;
        case 'SAYCHAT':
          console.log('said chat');
          serverInterface.leaveChat('test');
          break;
        case 'LEAVECHAT':
          console.log('left chat');
          serverInterface.joinBattle('test');
          break;
        case 'JOINGAME':
          console.log('joined battle');
          serverInterface.setTeam('test',
              [{'tom': 'A'}, {'jerry': 'B'}, {'test': 'C'}],
              [{'AI1': 'A'}, {'AI2': 'B'}],
              [{'Chickend1': 'A'}, {'Chickend2': 'B'}],
              ['spec1', 'spec2'],
          );
          break;
        case 'SETTEAM':
          console.log('set team');
          serverInterface.leaveBattle('test');
          break;
      }
      break;
  }
});

bus.on('lobbyServerUpdate', (diffs) => {
  // console.log(diffs);
  if (diffs) renderDiff(diffs);
});
