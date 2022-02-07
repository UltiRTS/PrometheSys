const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule:true,
			contextIsolation: false

		},show: false
	});

	
	mainWindow.setMenu(null)
	mainWindow.loadFile("index.html");
	mainWindow.webContents.openDevTools();
	
	splash = new BrowserWindow({transparent: false, frame: false, alwaysOnTop: true});
	splash.maximize()
	splash.loadFile("loadingUI.html");
	
	
	mainWindow.webContents.once('did-finish-load', function() {
		mainWindow.show();
		mainWindow.maximize();
		splash.destroy();
	});
	
	
	
	mainWindow.on("closed", function () {
		mainWindow = null;
	});
}

app.on("ready", createWindow);
