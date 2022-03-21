const {renderDiff} = require('../drivingInterfaces/UIRerender');
const {diff} = require('deep-diff');

const rhs = {
  action: 'stateDump',
  triggeredBy: 'LEAVEGAME',
  paramaters: {
    usrstats: {
      loggedIn: false,
      accLevel: '0',
      chats: ['test', 'test2'],
      room: '',
      team: 'A',
      fruneds: {},
      chatMsg: [Array],
      username: 'test',
    },
    games: [{
      name: 'test1',
      players: ['test'],
    }],
    chatsIndex: {test: ['c1', 'c2']},
    poll: {},
    team: {},
    AIs: {},
    notifications: [],
  },
};
const lhs = {
  action: 'stateDump',
  triggeredBy: 'LEAVEGAME',
  paramaters: {
    usrstats: {
      loggedIn: true,
      accLevel: '0',
      chats: [],
      room: '',
      team: 'A',
      fruneds: {},
      chatMsg: [],
      username: 'test',
    },
    games: [{
      name: 'test1',
      players: ['test', 'test2'],
    }],
    chatsIndex: {test: []},
    poll: {},
    team: {},
    AIs: {},
    notifications: [],
  },
};

const diffs = diff(lhs, rhs);
console.log(diffs);
// renderDiff(diffs);
