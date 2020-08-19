const electron = require('electron');
const { contextBridge, ipcRenderer } = require('electron');
import { ts3client } from 'node-ts3sdk-client';
import * as path from 'path';
// import { ToastNotification, Template } from 'electron-windows-notifications';

import { userPrefs } from './store';

const ipc = {
    send: (channel: string, ...args: any) => {
        ipcRenderer.send(channel, ...args);
    },
    sendSync: (channel: string, ...args: any) => {
        return ipcRenderer.sendSync(channel, ...args);
    },
    invoke: (channel: string, ...args: any) => {
        return ipcRenderer.invoke(channel, ...args);
    },
    on: (channel: string, cb: (...args: any) => void) => {
        ipcRenderer.on(channel, (event, ...args) => cb(...args));
    },
};

export interface IInterop {
    ipc: typeof ipc;
    ts3client: typeof ts3client;
    userPrefs: typeof userPrefs.store;
    sendNotification: (isProd: boolean, title: string, body: string) => void;
}

const interop: IInterop = {
    ipc,
    ts3client,
    userPrefs: ipc.sendSync('userPrefs:get'),
    sendNotification: (isProd: boolean, title: string, body: string) => {
        ipc.send('notification:send', isProd, title, body);
    },
};

// remote.app.getAppPath();

try {

    contextBridge.exposeInMainWorld('interop', interop);

    // contextBridge.exposeInMainWorld('ipc', ipc);
    // contextBridge.exposeInMainWorld('ts3sdk', ts3client);
    // contextBridge.exposeInMainWorld('userPrefs', ipc.sendSync('userPrefs:get'));
    // contextBridge.exposeInMainWorld('sendNotification', (isProd: boolean, title: string, body: string) => {
    //     return ipc.send('notification:send', isProd, title, body);
    // });

} catch (err) {

    window.interop = interop;

    // (window as any).ipc = ipc;
    // (window as any).ts3sdk = ts3client;
    // (window as any).userPrefs = ipc.sendSync('userPrefs:get');
    // (window as any).sendNotification = (isProd: boolean, title: string, body: string) => {
    //     return ipc.send('notification:send', isProd, title, body);
    // };
    // (window as any).ToastNotification = ToastNotification;
    // (window as any).notify = () => new ToastNotification({
    //     appId: 'gg.yoc.chumchat',
    //     template: new Template({
    //         templateText: `<text id="1">%s</text>`,
    //         // templateImage: '<image id="1" src="%s"/><text>This is a simple actions toast notification example</text>',
    //     }).getXML(),
    //     strings: ['Hi!'],
    //     // strings: [__dirname + '/assets/icons/yoc.png', 'Hi!']
    // });

}
