import { app, BrowserWindow, screen, ipcMain, Notification } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { appPrefs, userPrefs, IUserPrefs } from './store';

ipcMain.on('toMain', (event, args) => {
  console.log('toMain:', args)
  event.sender.send('fromMain', args);
});

ipcMain.on('userPrefs:get', (event) => {
  event.returnValue = userPrefs.store;
});

ipcMain.on('userPrefs:set', (event, data) => {
  userPrefs.store = data;
});

ipcMain.on('userPrefs:set:key', (event, key: string, data: any) => {
  userPrefs.set(key, data);
});

ipcMain.on('userPrefs:reset', (event) => {
  userPrefs.reset();
});

ipcMain.on('userPrefs:reset:key', (event, key: keyof IUserPrefs) => {
  userPrefs.reset(key);
});


ipcMain.on('notification:send', (event, isProd, title, body) => {
  // https://docs.microsoft.com/en-us/uwp/api/Windows.UI.Notifications.ToastTemplateType?redirectedfrom=MSDN&view=winrt-19041
  const iconPath = path.join(app.getAppPath(), isProd ? 'dist' : 'src', 'assets/icons/yoc.png');

        // const notification = new window.interop.ToastNotification({
        //     appId: 'gg.yoc.chumchat',
        //     // template: `<toast><visual><binding template="ToastText01"><text id="1">%s</text></binding></visual></toast>`,
        //     template: `<toast><visual><binding template="ToastImageAndText02">
        //         <image id="1" src="%s"/>
        //         <text id="1">%s</text>
        //         <text id="2">%s</text>
        //         </binding></visual></toast>`,
        //     // template: '<toast launch="app-defined-string"><visual><binding template="ToastGeneric"><text id="1">%s</text></binding></visual><audio src="ms-winsoundevent:Notification.Reminder"/></toast>',
        //     strings: [iconPath, 'Hi!', 'This is a test message that could be fairly long, so we\'ll see how good it looks.']
        // });
        // notification.on('activated', () => console.log('Activated!'));
        // notification.show();


  const notification = new Notification({
      title,
      body,
      icon: iconPath,
  });
  notification.on('click', (event) => {
    // console.log();
    // console.log('-------');
    // console.log('clicked notif');
    // console.log('-------');
    // console.log();
    app.focus();
    win.focus();
  });
  notification.show();
});

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  // const { appPrefs } = require('./store');
  const appPrefObj = appPrefs();
  console.log(appPrefObj, appPrefObj.get('windowBounds'));

  const size = screen.getPrimaryDisplay().workAreaSize;

  const { x, y, width, height } = appPrefObj.get('windowBounds');

  console.log('store values:', width, height);

  // Create the browser window.
  const iconPath = path.join(__dirname, 'yoc.png');
  win = new BrowserWindow({
    x: x,
    y: y,
    width,
    height,
    icon: iconPath,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      // sandbox: true,
      enableRemoteModule: false,
      // allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
      argv: ['--serve'],
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.webContents.openDevTools();
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('move', () => {
    const bounds = win!.getBounds();

    appPrefObj.set('windowBounds', bounds);
  });

  win.on('resize', () => {
    const bounds = win!.getBounds();

    appPrefObj.set('windowBounds', bounds);
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {

  app.allowRendererProcessReuse = false;

  if (serve) {
    // app.setAppUserModelId('gg.yoc.chumchat');
    // app.setAppUserModelId(process.execPath)
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
