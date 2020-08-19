"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require('electron');
var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
var node_ts3sdk_client_1 = require("node-ts3sdk-client");
var ipc = {
    send: function (channel) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        ipcRenderer.send.apply(ipcRenderer, __spreadArrays([channel], args));
    },
    sendSync: function (channel) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return ipcRenderer.sendSync.apply(ipcRenderer, __spreadArrays([channel], args));
    },
    invoke: function (channel) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return ipcRenderer.invoke.apply(ipcRenderer, __spreadArrays([channel], args));
    },
    on: function (channel, cb) {
        ipcRenderer.on(channel, function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return cb.apply(void 0, args);
        });
    },
};
var interop = {
    ipc: ipc,
    ts3client: node_ts3sdk_client_1.ts3client,
    userPrefs: ipc.sendSync('userPrefs:get'),
    sendNotification: function (isProd, title, body) {
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
}
catch (err) {
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
//# sourceMappingURL=preload.js.map