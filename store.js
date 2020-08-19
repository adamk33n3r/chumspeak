"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPrefs = exports.appPrefs = void 0;
var electron_1 = require("electron");
var Store = require("electron-store");
exports.appPrefs = function () {
    var size = (electron_1.screen || electron_1.remote.screen).getPrimaryDisplay().workAreaSize;
    return new Store({
        name: 'app-store',
        // defaults: {
        //   windowBounds: { x: size.width / 2, y: size.height / 2, width: 1440, height: 800 },
        // },
        schema: {
            windowBounds: {
                type: 'object',
                default: {},
                properties: {
                    x: {
                        type: 'number',
                        default: size.width / 2,
                    },
                    y: {
                        type: 'number',
                        default: size.height / 2,
                    },
                    width: {
                        type: 'number',
                        default: 1440,
                    },
                    height: {
                        type: 'number',
                        default: 800,
                    },
                },
            },
        },
    });
};
exports.userPrefs = new Store({
    name: 'user-preferences',
    schema: {
        audio: {
            type: 'object',
            additionalProperties: false,
            default: {},
            properties: {
                captureDevice: {
                    type: 'string',
                    default: 'default',
                },
                playbackDevice: {
                    type: 'string',
                    default: 'default',
                },
                activationMode: {
                    type: 'string',
                    enum: ['ptt', 'vad'],
                    default: 'vad',
                },
                pttKey: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                    default: ['F12'],
                },
                vadLevel: {
                    type: 'integer',
                    default: 0,
                },
                noiseSuppression: {
                    type: 'boolean',
                    default: true,
                },
                echoCancellation: {
                    type: 'boolean',
                    default: false,
                },
                automaticGainControl: {
                    type: 'boolean',
                    default: true,
                },
            },
        },
        notifications: {
            type: 'object',
            additionalProperties: false,
            default: {},
            properties: {
                voiceChat: {
                    type: 'object',
                    default: {},
                    properties: {
                        connected: {
                            type: 'boolean',
                            default: true,
                        },
                        disconnected: {
                            type: 'boolean',
                            default: true,
                        },
                        userJoined: {
                            type: 'boolean',
                            default: true,
                        },
                        userLeft: {
                            type: 'boolean',
                            default: true,
                        },
                    },
                },
                messages: {
                    type: 'object',
                    default: {},
                    properties: {
                        mentions: {
                            type: 'boolean',
                            default: true,
                        },
                    },
                },
            },
        },
    },
});
//# sourceMappingURL=store.js.map