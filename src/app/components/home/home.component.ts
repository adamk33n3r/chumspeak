import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as TS from 'node-ts3sdk-client';

import { TeamSpeakService } from '../../providers/teamspeak.service';
import { NewChannelComponent } from '../../dialogs/new-channel/new-channel.component';
import { ThemeService } from '../../providers/theme.service';

export interface IChannel {
  id: string;
  name: string;
  description: string;
  messages: any[];
}

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  public address: string = 'localhost';
  public password: string = 'secret';
  public nickname: string = 'Adam';

  public selectedChannel: string | null = null;

  public get count(): number[] {
    return Array(0);
  }

  public get VAD(): number {
    return this.ts.getPreProcessorConfigValue(this.tss.schID, 'voiceactivation_level');
  }
  public set VAD(val: number) {
    this.ts.setPreProcessorConfigValue(this.tss.schID, 'voiceactivation_level', val.toString());
  }

  public currentDecibels: number = 0;

  public channels: Observable<IChannel[]>;

  public get user() {
    return this.$auth.auth.currentUser;
  }

  private vadTestID: number = 0;

  private ts: typeof TS;

  constructor(
    private tss: TeamSpeakService,
    private db: AngularFirestore,
    private $auth: AngularFireAuth,
    private $dialog: MatDialog,
    private $theme: ThemeService,
  ) {
    this.ts = tss.ts3client;

    this.channels = db.collection<IChannel>('channels').snapshotChanges().pipe(map((changes) => {
      return changes.map((change) => {
        const doc = change.payload.doc;
        return { id: doc.id, ...doc.data() };
      });
    }));
    // this.channels = db.collection<IChannel>('channels').valueChanges();
    this.channels.subscribe((channels) => {
      console.log('channels:', channels);
      this.selectedChannel = channels[1].id;
    });

    this.$auth.auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged:', user);
    });

  }

  public ngOnInit() {
    // setTimeout(() => this.newChannel(), 0);
  }

  public ngAfterViewInit() {
    // this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    console.log(this.VAD);
  }

  public ngOnDestroy() {
    this.tss.destroy();
  }

  public connect() {
    this.tss.connect(this.address, this.password, this.nickname);

    // this.db.collection<IChannel>('channels').add({
    //   name: 'test',
    //   description: 'this is descript',
    //   messages: [],
    // });
    // this.authService.auth.signInWithEmailAndPassword('adam.g.keenan@gmail.com', 'password')
    // .then((cred) => {
    //   console.log(cred);
    // });
  }

  public disconnect() {
    this.ts.stopConnection(this.tss.schID);
  }

  public mute(val: boolean) {
    this.ts.setClientSelfVariableAsInt(this.tss.schID, this.ts.ClientProperties.INPUT_MUTED, val ? 1 : 0);
    this.ts.flushClientSelfUpdates(this.tss.schID, '');
  }

  public startVADTest(): void {
    if (this.vadTestID !== 0) {
      return;
    }

    this.vadTestID = window.setInterval(() => {
      this.currentDecibels = this.getCurrentDecibels();
    }, 100);
  }

  public stopVADTest(): void {
    clearInterval(this.vadTestID);
    this.vadTestID = 0;
  }

  public newChannel() {
    const dialogRef = this.$dialog.open(NewChannelComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log('closed:', data);
    });
  }

  public switchToChannel(channel: IChannel) {
    console.log(channel);
    this.selectedChannel = channel.id;
  }

  public toggleTheme() {
    this.$theme.toggleTheme();
  }

  private getCurrentDecibels(): number {
    return this.ts.getPreProcessorInfoValueFloat(this.tss.schID, 'decibel_last_period');
  }

}
