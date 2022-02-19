/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const exec = require('child_process').exec;


function getMinimapfromMapName(mapName) {
  // read image (note: use async in production)
  const _img = fs.readFileSync(selfState.promethesys.sys.appPath+'/ultiConfig/maps/'+mapName+'.png').toString('base64');
  // example for .png

  return _img;
}

function runCmd(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
    console.log(stdout);
  });
};


function writeFile(path, content, callback) {
  fs.writeFile(path, content, callback);
}

function usyncWriteScript(game) {
  const hostPort=game.mgrPort;
  const hostIP=game.mgrIP;
  const username=global.selfState.promethesys.sys.username;
  const btlToken=game.engineToekn;
  content='[GAME]\n{\nHostIP='+hostIP+';\nHostPort='+hostPort+';\nSourcePort=0;\nIsHost=0;\nMyPlayerName='+username+';\nMyPasswd='+btlToken+';\n}\n';
  writeFile(selfState.promethesys.sys.appPath+'/engine/_script.txt', content, ()=>{
    if (selfState.promethesys.sys.isLinux) {
      console.log('running');
      runCmd('\''+selfState.promethesys.sys.appPath+'/engine/spring\' \''+selfState.promethesys.sys.appPath+'/engine/_script.txt\' --write-dir "'+selfState.promethesys.sys.appPath+'/ultiConfig"', (output) => {
        console.log(output);
        selfState.promethesys.sys.runningEngineCount-=1;
        if (selfState.promethesys.sys.runningEngineCount==0) {
          playSound('lobby_intro.wav', true);
        }
        restoreWindow();
      });
    } else {
      console.log('start \"\" \"'+selfState.promethesys.sys.appPath+'\\engine\\spring.exe\" \"'+selfState.promethesys.sys.appPath+'\\engine\\_script.txt\"');
      runCmd('start \"\" \"'+selfState.promethesys.sys.appPath+'\\engine\\spring.exe\" \"'+selfState.promethesys.sys.appPath+'\\engine\\_script.txt\" --write-dir "'+selfState.promethesys.sys.appPath+'\\ultiConfig"', (output) => {
        console.log(output);
        selfState.promethesys.sys.runningEngineCount-=1;
        if (selfState.promethesys.sys.runningEngineCount==0) {
          playSound('lobby_intro.wav', true);
        }
        restoreWindow();
      });
    }
    stopSound();
    minimizeWindow();
    selfState.promethesys.sys.runningEngineCount+=1;
  });
}

function restoreWindow() {
  // selfState.promethesys.sys.remote.getCurrentWindow().maximize();
  selfState.promethesys.sys.send2Main('main', 'maximize');
}

function minimizeWindow() {
  // selfState.promethesys.sys.remote.getCurrentWindow().minimize();
  selfState.promethesys.sys.send2Main('main', 'minimize');
}

