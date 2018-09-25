import { Injectable } from '@angular/core';

import * as TS3 from 'node-ts3sdk-client';

@Injectable({
  providedIn: 'root'
})
export class TeamSpeakService {

  public ts3client: typeof TS3;

  public identity: string;
  public schID: number;

  constructor() {
    this.ts3client = window.require('node-ts3sdk-client');

    const logPath = undefined;
    const soundBackendPath = this.ts3client.getResourcePath();

    this.ts3client.initClientLib(this.ts3client.LogTypes.FILE | this.ts3client.LogTypes.CONSOLE, logPath, soundBackendPath);

    this.schID = this.ts3client.spawnNewServerConnectionHandler();

    this.ts3client.openCaptureDevice(this.schID);
    this.ts3client.openPlaybackDevice(this.schID);

    const identity = localStorage.getItem('identity');
    if (identity) {
      this.identity = identity;
    } else {
      this.identity = this.ts3client.createIdentity();
      localStorage.setItem('identity', this.identity);
    }

    this.setupListeners();
  }

  public connect(address: string, password: string, nickname: string) {
    try {
      this.ts3client.startConnection(
        this.schID,
        this.identity,
        address,
        9987,
        nickname,
        undefined,
        undefined,
        password,
      );
    } catch (err) {
      console.error('Could not start connection:', err);
    }
  }

  public destroy() {
    this.ts3client.destroyServerConnectionHandler(this.schID);
    this.ts3client.destroyClientLib();
  }

  private setupListeners() {
    this.ts3client.on('onConnectStatusChangeEvent', (schID, status, errno) => {
      const msg = this.ts3client.getErrorMessage(errno);
      console.log('connect status:', schID, status, errno, msg);
      switch (status) {
        case this.ts3client.ConnectStatus.CONNECTING:
          console.log('CONNECTING');
          break;
        case this.ts3client.ConnectStatus.CONNECTED:
          console.log('CONNECTED');
          const welcomeMsg = this.ts3client.getServerVariableAsString(this.schID, this.ts3client.VirtualServerProperties.WELCOMEMESSAGE);
          console.log(welcomeMsg);
          break;
        case this.ts3client.ConnectStatus.DISCONNECTED:
          console.log('DISCONNECTED');
          break;
        case this.ts3client.ConnectStatus.ESTABLISHING:
          console.log('ESTABLISHING');
          break;
        case this.ts3client.ConnectStatus.ESTABLISHED:
          console.log('ESTABLISHED');
          break;
      }
      this.ts3client.logMessage(msg, this.ts3client.LogLevel.DEBUG);
    });

    this.ts3client.on('onServerErrorEvent', (_, err, retCode, extraMsg) => {
      console.error('onServerErrorEvent:', err, retCode, extraMsg);
    });
  }


}
