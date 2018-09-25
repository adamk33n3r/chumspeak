import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { TeamSpeakService } from '../../providers/teamspeak.service';

import * as TS from 'node-ts3sdk-client';

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

  @ViewChild('messageList')
  public messageList!: ElementRef<HTMLElement>;

  private ts: typeof TS;

  constructor(private tss: TeamSpeakService) {
    this.ts = tss.ts3client;
  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
    console.log(this.messageList.nativeElement);
    // this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
  }

  public ngOnDestroy() {
    this.tss.destroy();
  }

  public connect() {
    this.tss.connect(this.address, this.password, this.nickname);
  }

  public disconnect() {
    this.ts.stopConnection(this.tss.schID);
  }

  public mute(val: boolean) {
    this.ts.setClientSelfVariableAsInt(this.tss.schID, this.ts.ClientProperties.INPUT_MUTED, val ? 1 : 0);
    this.ts.flushClientSelfUpdates(this.tss.schID, '');
  }

}
