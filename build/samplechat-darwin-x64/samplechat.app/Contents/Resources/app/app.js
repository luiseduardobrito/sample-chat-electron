'use strict';

const path = require('path');

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Menu = electron.Menu;

// Initialize the development socket server
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  console.log('Initializing socket server...');
  require('./server');
}

// Set the app global name
console.log('Initializing application "' + app.getName() + '"...');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var windows = [];

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }

});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

  // Create the browser window.
  var win = new BrowserWindow(require('./config/default').window);

  // Open the DevTools.
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    win.webContents.openDevTools({
      detach: true
    });
  }

  // Emitted when the window is closed.
  win.on('closed', function () {

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    if (win && windows.indexOf(win) >= 0) {
      windows.splice(windows.indexOf(win), 1);
      win = null;
    }

  });

  var menu = Menu.buildFromTemplate(require('./config/menu')(app));
  Menu.setApplicationMenu(menu);

  win.setMenu(menu);

  // and load the index.html of the app.
  win.loadURL('file://' + path.join(__dirname, './client/index.html'));
  windows.push(win);

});