import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { TeamSpeakService } from '../../providers/teamspeak.service';

interface IChannel {
  name: string;
  description: string;
  teamspeak: number;
}

@Component({
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss']
})
export class NewChannelComponent implements OnInit {

  public name: string = '';
  public description: string = '';

  public saving: boolean = false;

  constructor(
    private $db: AngularFirestore,
    private dialog: MatDialogRef<NewChannelComponent>,
    private ts: TeamSpeakService,
  ) { }

  public ngOnInit() {
  }

  public create() {
    this.saving = true;

    this.ts.createChannel(this.name, this.description).subscribe((channelID) => {
      console.log('created teamspeak channel. ID:', channelID);

      // this.$db.collection<IChannel>('channels').add({
      //   name: this.name,
      //   description: this.description,
      //   teamspeak: channelID,
      // }).then((docRef) => {
      //   console.log('added channel, getting data');
      //   docRef.get().then((val) => {
      //     console.log('got data. closing dialog');
      //     this.dialog.close({ id: docRef.id, ...val.data() });
      //   });
      // });
      this.dialog.close();
    });

  }

}
