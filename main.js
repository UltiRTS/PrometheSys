/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {app, BrowserWindow} = require('electron');
const ipcMain = require('electron').ipcMain;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,

    }, show: false,
  });


  mainWindow.setMenu(null);
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();

  splash = new BrowserWindow({transparent: false, frame: false, alwaysOnTop: true});
  splash.maximize();
  splash.loadFile('loadingUI.html');


  mainWindow.webContents.once('did-finish-load', function() {
    mainWindow.show();
    mainWindow.maximize();
    splash.destroy();
  });


  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

ipcMain.on('main', (cmd) => {
  switch (cmd) {
    case 'close':
      mainWindow.close();
      break;
    case 'minimize':
      mainWindow.minimize();
      break;
    case 'maximize':
      mainWindow.maximize();
      break;
    case 'restore':
      mainWindow.restore();
      break;
    case 'show':
      mainWindow.show();
      break;
    case 'hide':
      mainWindow.hide();
      break;
    case 'reload':
      mainWindow.reload();
      break;
    case 'load':
      mainWindow.loadFile('index.html');
      break;
    case 'toggleDevTools':
      mainWindow.webContents.toggleDevTools();
      break;
  }
});
