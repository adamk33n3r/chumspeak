import { Component, OnInit, OnDestroy } from '@angular/core';

import { TeamSpeakService } from '../../providers/teamspeak.service';

import * as TS from 'node-ts3sdk-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public address: string = 'localhost';
  public password: string = 'secret';
  public nickname: string = 'Adam';

  private ts: typeof TS;
  private schID: number;
  private ident: string;

  constructor(tss: TeamSpeakService) {
    this.ts = tss.ts3client;
  }

  public ngOnInit() {
    const logPath = undefined;
    const soundBackendPath = this.ts.getResourcePath();
    console.log('SOUND BACKEND PATH:', soundBackendPath);
    try {

      this.ts.initClientLib(this.ts.LogTypes.FILE | this.ts.LogTypes.CONSOLE, logPath, soundBackendPath);

      this.schID = this.ts.spawnNewServerConnectionHandler();
      this.ts.openCaptureDevice(this.schID);
      this.ts.openPlaybackDevice(this.schID);


      const identity = localStorage.getItem('identity');
      if (identity) {
        this.ident = identity;
      } else {
        this.ident = this.ts.createIdentity();
        localStorage.setItem('identity', this.ident);
      }


      console.log(this.schID, this.ident);

      this.ts.on('onConnectStatusChangeEvent', (schID_, status, errno) => {
        const msg = this.ts.getErrorMessage(errno);
        console.log('connect status:', schID_, status, errno, msg);
        switch (status) {
          case this.ts.ConnectStatus.CONNECTING:
            console.log('CONNECTING');
            break;
          case this.ts.ConnectStatus.CONNECTED:
            console.log('CONNECTED');
            const welcomeMsg = this.ts.getServerVariableAsString(this.schID, this.ts.VirtualServerProperties.WELCOMEMESSAGE);
            console.log(welcomeMsg);
            break;
          case this.ts.ConnectStatus.DISCONNECTED:
            console.log('DISCONNECTED');
            break;
          case this.ts.ConnectStatus.ESTABLISHING:
            console.log('ESTABLISHING');
            break;
          case this.ts.ConnectStatus.ESTABLISHED:
            console.log('ESTABLISHED');
            break;
        }
        this.ts.logMessage(msg, this.ts.LogLevel.DEBUG);
      });

      this.ts.on('onServerErrorEvent', (_, err, retCode, extraMsg) => {
        console.error('onServerErrorEvent:', err, retCode, extraMsg);
      });

    } catch (err) {
      console.error('ERR:', err);
    }
  }

  public ngOnDestroy() {
    this.ts.destroyServerConnectionHandler(this.schID);
    this.ts.destroyClientLib();
  }

  public connect() {
    try {
      this.ts.startConnection(
        this.schID,
        this.ident,
        this.address,
        9987,
        this.nickname,
        undefined,
        undefined,
        this.password,
      );
      console.log(this.ts.getConnectionStatus(this.schID));
    } catch (err) {
      console.error('ERR', err);
    }
  }

  public disconnect() {
    this.ts.stopConnection(this.schID);
  }

  public mute(val: boolean) {
    this.ts.setClientSelfVariableAsInt(this.schID, this.ts.ClientProperties.INPUT_MUTED, val ? 1 : 0);
    this.ts.flushClientSelfUpdates(this.schID, '');
  }

}
