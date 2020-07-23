import { Injectable, EventEmitter } from '@angular/core';

import * as TS3 from 'node-ts3sdk-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamSpeakService {

  public ts3client: typeof TS3;

  public identity: string;
  public schID: number;

  public newChannel: Subject<number> = new Subject();

  constructor() {
    this.ts3client = window.require('node-ts3sdk-client');
    console.log(this.ts3client);

    const logPath = undefined;
    const soundBackendPath = this.ts3client.getResourcePath();
    console.log(soundBackendPath);

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
    console.log('IDENTITY:', this.identity);
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
    // this.ts3client.destroyServerConnectionHandler(this.schID);
    // this.ts3client.destroyClientLib();
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
      if (err === 'ok') {
        return;
      }
      console.error('onServerErrorEvent:', err, retCode, extraMsg);
    });

    this.ts3client.on('onNewChannelCreatedEvent', (_, channelID, channelParentID, invokerID, invokerName) => {
      console.log('new channel created!', channelID, channelParentID, invokerID, invokerName);
      this.newChannel.next(channelID);
    });
  }

  public createChannel(name: string, description: string): Observable<number> {
    /* int createChannel(uint64 scHandlerID, uint64 parentChannelID, const char* name, const char* topic,
                        const char* description, const char* password, int codec, int codecQuality,
                        int maxClients, int familyMaxClients, int order, int perm,
                        int semiperm, int default)

    CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_NAME, name));
    CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_TOPIC, topic));
    CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_DESCRIPTION, desc));
    CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_PASSWORD, password));
    CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_CODEC, codec));
    CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_CODEC_QUALITY, codecQuality));
    CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_MAXCLIENTS, maxClients));
    CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_MAXFAMILYCLIENTS, familyMaxClients));
    CHECK_ERROR(ts3client_setChannelVariableAsUInt64(scHandlerID, 0, CHANNEL_ORDER, order));
    CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_FLAG_PERMANENT, perm));
    CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_FLAG_SEMI_PERMANENT, semiperm));
    CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_FLAG_DEFAULT, default));
    */

    return new Observable((subscriber) => {
      const subscription = this.newChannel.subscribe((channelID) => {
        subscriber.next(channelID);
        subscriber.complete();
        subscription.unsubscribe();
      });

      this.ts3client.setChannelVariableAsString(this.schID, 0, this.ts3client.ChannelProperties.NAME, name);
      this.ts3client.setChannelVariableAsString(this.schID, 0, this.ts3client.ChannelProperties.DESCRIPTION, description);
      this.ts3client.setChannelVariableAsInt(this.schID, 0, this.ts3client.ChannelProperties.FLAG_PERMANENT, 1);

      this.ts3client.flushChannelCreation(this.schID, 0);
    });
  }


}
