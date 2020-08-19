import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ts3client } from 'node-ts3sdk-client';

import { TeamSpeakService } from '../core/services/teamspeak.service';
import { NewChannelComponent } from '../dialogs/new-channel/new-channel.component';
import { ThemeService } from '../core/services/theme.service';
import { SettingsComponent } from 'app/dialogs/settings/settings.component';

export interface IChannelDB {
  name: string;
  description: string;
  messages: any[];
}
export interface IChannel extends IChannelDB {
  id: string;
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

  public channels: Observable<IChannel[]>;

  public get user() {
    return this._user;
    return this.$auth.auth.currentUser;
  }
  private _user: any;

  public get connectedClients() { return this.tss.connectedClients; }

  private vadTestID: number = 0;

  private ts: typeof ts3client;

  constructor(
    private tss: TeamSpeakService,
    private $db: AngularFirestore,
    private $auth: AngularFireAuth,
    private $dialog: MatDialog,
    private $theme: ThemeService,
    private cdr: ChangeDetectorRef,
  ) {
    this.ts = tss.ts3client;
    this.ts.setPreProcessorConfigValue(this.tss.schID, 'agc', 'false');

    // setTimeout(() => this.openSettings());

    // const client = sdk.createClient('https://yoc.gg');
    // setTimeout(async () => {
    //   const response = await client.login('m.login.password', {
    //     user: 'adamk33n3r',
    //     password: 'Nike27nike27?',
    //   });
    //   console.log(response);
    //   client.publicRooms({ }, (err: any, data: any) => {
    //     console.log(data);
    //   });
    // });

    this.channels = this.$db.collection<IChannelDB>('channels').snapshotChanges().pipe(map((changes) => {
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
      // console.log('onAuthStateChanged:', user);
      this._user = user;
      this.cdr.detectChanges();
    });

  }

  public ngOnInit() {
    // setTimeout(() => this.newChannel(), 0);
  }

  public ngAfterViewInit() {
    // this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
  }

  public ngOnDestroy() {
    console.log('ngOnDestroy');
    this.tss.destroy();
  }

  public connect() {
    this.tss.connect(this.address, this.password, this.nickname).subscribe((id) => {
      console.log('we connected!', id);
      console.log(this.ts.getClientList(this.tss.schID));
      console.log(this.ts.getChannelList(this.tss.schID));
      console.log(this.ts.getChannelClientList(this.tss.schID, 1));
    }, (err) => console.error(err));
  }

  public disconnect() {
    this.ts.stopConnection(this.tss.schID);
  }

  public reset() {
    this.disconnect();
    this.tss.destroy();
    this.tss.init();
  }

  public mute(val: boolean) {
    this.ts.setClientSelfVariableAsInt(this.tss.schID, this.ts.ClientProperties.INPUT_MUTED, val ? 1 : 0);
    this.ts.flushClientSelfUpdates(this.tss.schID);
  }

  public openSettings() {
    const dialogRef = this.$dialog.open(SettingsComponent, {
      width: '80%',
      height: '80%',
    });
  }

  public newChannel() {
    const dialogRef = this.$dialog.open<NewChannelComponent, any, IChannel>(NewChannelComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((channel) => {
      console.log('closed:', channel);
      if (channel) {
        this.switchToChannel(channel);
      }
    });
  }

  public switchToChannel(channel: IChannel) {
    console.log(channel);
    this.selectedChannel = channel.id;
  }

  public toggleTheme() {
    this.$theme.toggleTheme();
  }

}
