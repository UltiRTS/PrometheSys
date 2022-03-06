/* eslint-disable max-len */
const {EventEmitter} = require('events');
const centralMessagingBus = new EventEmitter();
const path = require('path');
const messenger = require('messenger');
const {distance, closest} = require('fastest-levenshtein');
closestFinder = closest;
const os = require('os');

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

selfState.promethesys.sys.isLinux = os.type()=='Linux';

selfState.promethesys.sys.fs = fs;
selfState.promethesys.sys.storage = storage;

const ipcRenderer = require('electron').ipcRenderer;
selfState.promethesys.sys.send2Main=ipcRenderer.send;

if (selfState.promethesys.sys.appPath==null) {
  selfState.promethesys.sys.appPath=selfState.promethesys.sys.storage.get('wDIR');
}

if (selfState.promethesys.sys.mapDic==null) {
  selfState.promethesys.sys.mapDic=selfState.promethesys.sys.storage.get('mapDic');
}

if (selfState.promethesys.sys.storage.has('userVolume')) {
  selfState.promethesys.audio.userVolume=selfState.promethesys.sys.storage.get('userVolume');
} else {
  selfState.promethesys.audio.userVolume=50;
}
if (selfState.promethesys.sys.storage.has('userFXVolume')) {
  selfState.promethesys.audio.userFXVolume=selfState.promethesys.sys.storage.get('userFXVolume');
} else {
  selfState.promethesys.audio.userFXVolume=16;
}

if (selfState.promethesys.sys.storage.has('userNotifVolume')) {
  selfState.promethesys.audio.userNotifVolume=selfState.promethesys.sys.storage.get('userNotifVolume');
} else {
  selfState.promethesys.audio.userNotifVolume=16;
}

if (!selfState.promethesys.sys.storage.has('mapCache')||selfState.promethesys.sys.storage.get('mapCache')==undefined) {
  selfState.promethesys.sys.storage.set('mapCache', {'1': '2'});
}
