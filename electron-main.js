const {EventEmitter} = require('events');
const centralMessagingBus = new EventEmitter();
const path = require('path');
const messenger = require('messenger');
const {UIRender} = require('./drivingInterfaces/UIRerender');
renderDiffObj=new UIRender();
// the below inits network monitoring and sending capabilities
const {Network} = require('./lib/lobbyservernetwork');
const serverNetwork = new Network(centralMessagingBus);

const {ServerInterface} = require('./drivingInterfaces/lobbyServerInterface');
const lobbyServerInterfaceObj =
    new ServerInterface(centralMessagingBus, serverNetwork, renderDiffObj);

const ipcclient = messenger.createSpeaker(3141);
const {LauncherInterface} =
    require('./drivingInterfaces/lobbyLauncherInterface');
const lobbyLauncherInterfaceObj = new LauncherInterface(ipcclient);

global.lobbyLauncherInterfaceObj = lobbyLauncherInterfaceObj;
global.lobbyServerInterfaceObj = lobbyServerInterfaceObj;


const {State} = require('./states/selfState');

// const {remote} = require('electron');
const Store = require('electron-store');
const storage = new Store();
const fs = require('fs');
// const {Server} = require('http');

// selfState.minimapCache={}

const state = new State(storage);
global.selfState = state;

