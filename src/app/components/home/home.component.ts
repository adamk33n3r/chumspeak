import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import * as TS from 'node-ts3sdk-client';

import { TeamSpeakService } from '../../providers/teamspeak.service';

interface IChannel {
  name: string;
  description: string;
  messages: [];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  public address: string = 'localhost';
  public password: string = 'secret';
  public nickname: string = 'Adam';

  public get count(): number[] {
    return Array(1000);
  }

  public get VAD(): number {
    return this.ts.getPreProcessorConfigValue(this.tss.schID, 'voiceactivation_level');
  }
  public set VAD(val: number) {
    this.ts.setPreProcessorConfigValue(this.tss.schID, 'voiceactivation_level', val);
  }

  public currentDecibels: number = 0;

  public channels: Observable<IChannel[]>;

  private vadTestID: number = 0;

  @ViewChild('messageList')
  public messageList!: ElementRef<HTMLElement>;

  private ts: typeof TS;

  constructor(private tss: TeamSpeakService, private db: AngularFirestore, private authService: AngularFireAuth) {
    this.ts = tss.ts3client;

    this.channels = db.collection<IChannel>('channels').valueChanges();
    this.channels.subscribe((channels) => {
      console.log('channel:', channels);
    });

  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
    console.log(this.messageList.nativeElement);
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

    this.vadTestID = setInterval(() => {
      this.currentDecibels = this.getCurrentDecibels();
    });
  }

  public stopVADTest(): void {
    clearInterval(this.vadTestID);
    this.vadTestID = 0;
  }

  private getCurrentDecibels(): number {
    return this.ts.getPreProcessorInfoValueFloat(this.tss.schID, 'decibel_last_period');
  }

}
