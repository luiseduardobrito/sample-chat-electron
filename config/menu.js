const path = require('path');
const electron = require('electron');

const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Menu = electron.Menu;

module.exports = function (app) {

  var template = [
    {
      label: "Edit",
      submenu: [
        {label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
        {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
        {type: "separator"},
        {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
        {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
        {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
        {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: function () {

            // Create the browser window.
            var win = new BrowserWindow(require('./default').window);

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
              //if (win && windows.indexOf(win) >= 0) {
              //  windows.splice(windows.indexOf(win), 1);
              //  win = null;
              //}

            });

            var menu = Menu.buildFromTemplate(require('./menu')(app));
            Menu.setApplicationMenu(menu);

            win.setMenu(menu);

            // and load the index.html of the app.
            win.loadURL('file://' + path.join(__dirname, '../client/index.html'));
            //windows.push(win);


          }
        },
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {type: "separator"},
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function (item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function () {
            if (process.platform == 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: function (item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.toggleDevTools();
          }
        },
        {type: "separator"},
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'About this Project',
          click: function () {
            require('electron').shell.openExternal('http://github.com/luiseduardobrito/mc714-1s2016-lista3')
          }
        },
        {
          label: 'About Electron Platform',
          click: function () {
            require('electron').shell.openExternal('http://electron.atom.io')
          }
        }
      ]
    }
  ];

  if (process.platform == 'darwin') {

    var name = app.getName();

    template.unshift({

      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function () {
            app.quit();
          }
        }
      ]
    });

    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  return template;

};