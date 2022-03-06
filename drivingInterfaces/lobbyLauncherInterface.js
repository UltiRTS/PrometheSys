/* eslint-disable guard-for-in */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/**
 * @class LauncherInterface
 * @description game engine launcher
 */
class LauncherInterface {
  /**
   * @param {object} ipcclient Unknown
   */
  constructor(ipcclient) {
    this.ipcclient = ipcclient;
  }

  // eslint-disable-next-line require-jsdoc
  ipcCheck() {
    const current_date = new Date();
    const cmm = current_date.getMinutes();
    this.ipcclient.request('ident', cmm, function(data) {
      if (String(data) == 'identified|' + 2 * cmm) {
        pushSmolNotif('Neural Net ', 'Successfully connected to the neural network!');
        selfState.promethesys.sys.isLauncherPresent=true;
      } else {
        notice(true, 'Neural Network Misfiring', 'Challenging the NN with x=2 * ' + cmm + ', but got answer x=' + String(data) + '; expecting answer ' + 2 * cmm + '. Without a functioning neural network, the terminal might have impaired cognitive ability and would not be able to communicate with the block chain for intl exchange! ');
        selfState.promethesys.sys.isLauncherPresent=false;
      }
    });
  }

  // eslint-disable-next-line require-jsdoc
  ipcGetMap(mapInternalName) {
    this.ipcclient.request('dMap', mapInternalName, function(data) {
      if (String(data) == 'retrieved|' + mapInternalName) {
        selfState.promethesys.sys.mapDic[mapInternalName].haveMap=true;
        // console.log('ipc response'+String(data)+String(mapInternalName))
        pushSmolNotif('Map ', 'Successfully Downloaded new map!');
        // selfState.promethesys.sys.mapDic = mapDic;
        selfState.promethesys.sys.storage.set('mapDic', selfState.promethesys.sys.mapDic);
      }


      if (String(data) == 'already|' + mapInternalName) {
        selfState.promethesys.sys.mapDic[mapInternalName].haveMap=true;
        pushSmolNotif('Map ', 'Successfully loaded new map!');
        // selfState.promethesys.sys.mapDic = mapDic;
        selfState.promethesys.sys.storage.set('mapDic', selfState.promethesys.sys.mapDic);
      } else if (String(data).startsWith('error|' + mapInternalName)) {
        pushSmolNotif('Map', 'Failed to loaded new map!');
      }
    });
  }

  // eslint-disable-next-line require-jsdoc
  ipcGetIndex() {
    this.ipcclient.request('getIndex', '', function(data) {
      // console.log(data);
      if (String(data).startsWith('index|')) {
        // parse the rest of the string into json
        pushSmolNotif('Neural Net ', 'Successfully constructed decision tree!');
        const mapDic = JSON.parse(String(data).slice(6));
        selfState.promethesys.sys.mapDic = mapDic;
        selfState.promethesys.sys.storage.set('mapDic', mapDic);
      }
    });
  }

  ipcGetPath() {
    this.ipcclient.request('gPath', '', function(data) {
      if (String(data).startsWith('gPath|')) {
        selfState.promethesys.sys.appPath=String(data).slice(6);
        selfState.promethesys.sys.storage.set('wDIR', selfState.promethesys.sys.appPath);
      }
    });
  }

  lobbyLauncherDownloadAllMap() {
    let mapId2download='';

    for (const game in selfState.promethesys.game) {
      mapId2download=selfState.promethesys.game[game].map;
      for (const individualMap in selfState.promethesys.sys.mapDic) {
        if (selfState.promethesys.sys.mapDic[individualMap].id == mapId2download) {
          console.log('trying to download map' + individualMap);
          // if (selfState.promethesys.sys.mapDic[individualMap].haveMap) {
          //  console.log('map already downloaded');
          //  break;
          // }
          mapId2download=individualMap;
          this.ipcGetMap(mapId2download);
        }
      }
    }
  }
}

module.exports = {
  LauncherInterface,
};
