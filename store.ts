import { screen, remote, app } from 'electron';
import * as Store from 'electron-store';

export const appPrefs = () => {
  const size = (screen || remote.screen).getPrimaryDisplay().workAreaSize;
  return new Store<{windowBounds:{x:number,y:number,width:number,height:number}}>({
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

export interface IUserPrefs {
  audio: {
    captureDevice: string;
    playbackDevice: string;
    activationMode: 'ptt' | 'vad';
    pttKey: string[];
    vadLevel: number;
    noiseSuppression: boolean;
    echoCancellation: boolean;
    automaticGainControl: boolean;
  };
  notifications: {
    messages: {
      mentions: boolean;
    };
    voiceChat: {
      connected: boolean;
      disconnected: boolean;
      userJoined: boolean;
      userLeft: boolean;
    };
  };
}

export const userPrefs = new Store<IUserPrefs>({
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
