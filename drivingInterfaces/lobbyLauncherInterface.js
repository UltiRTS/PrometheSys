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

  ipcCheck() {
    const current_date = new Date();
    const cmm = current_date.getMinutes();
    this.ipcclient.request('ident', cmm, function(data) {
      if (String(data) == 'identified|' + 2 * cmm) {
        pushSmolNotif('Neural Net ', 'Successfully connected to the neural network!');
      } else {
        notice(true, 'Neural Network Misfiring', 'Challenging the NN with x=2 * ' + cmm + ', but got answer x=' + String(data) + '; expecting answer ' + 2 * cmm + '. Without a functioning neural network, the terminal might have impaired cognitive ability and would not be able to communicate with the block chain for intl exchange! ');
      }
    });
  }

  ipcGetMap(mapInternalName) {
    this.ipcclient.request('dMap', mapInternalName, function(data) {
      if (String(data) == 'retrieved|' + mapInternalName) {
        // getMinimapfromMapName(map)
        selfState.minimapCache[mapInternalName] = getMinimapfromMapName(mapInternalName);
        selfState.allMinimapCache = Object.assign({}, storage.get('mapCache'), selfState.minimapCache);
        selfState.storage.set('mapCache', selfState.allMinimapCache);
        if (mapInternalName == selfState.mapDic[selfState.nowinBattle]) {
          preBtlUpdateSelfStats(true);
          preBtlMoreMapBlowUp();
          // console.log('ipc response'+String(data)+String(mapInternalName))
          pushSmolNotif('Map ', 'Successfully loaded new map!');
        }
      }

      if (String(data) == 'already|' + mapInternalName) {
        if (!(mapInternalName in selfState.allMinimapCache)) {
          selfState.minimapCache[mapInternalName] = getMinimapfromMapName(mapInternalName);
          selfState.allMinimapCache = Object.assign({}, storage.get('mapCache'), selfState.minimapCache);
          selfState.storage.set('mapCache', selfState.allMinimapCache);
        }
        if (mapInternalName == selfState.mapDic[selfState.nowinBattle]) {
          preBtlUpdateSelfStats(true);
          preBtlMoreMapBlowUp();
          pushSmolNotif('Map ', 'Successfully loaded new map!');
        }
      } else if (String(data).startsWith('error|' + mapInternalName)) {
        pushSmolNotif('Map', 'Failed to loaded new map!');
      }
    });
  }

  ipcGetAllMap() {
    this.ipcclient.request('dAMap', mapInternalName, function(data) {
      if (String(data).startsWith('retrievedAll|')) {
        // getMinimapfromMapName(map)
        selfState.minimapCache[mapInternalName] = getMinimapfromMapName(mapInternalName);
        selfState.storage.set('mapCache', selfState.minimapCache);
        notice(true, 'Map Downloaded ', mapInternalName);
      } else if (String(data).startsWith('error|' + mapInternalName)) {
        notice(true, 'Map Error ', mapInternalName);
      }
    });
  }
}

module.exports = {
  LauncherInterface,
};
