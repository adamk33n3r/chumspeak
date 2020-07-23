import { Component, OnInit, Inject } from '@angular/core';

import { IChannel } from '../../home/home.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './delete-channel.component.html',
  styleUrls: ['./delete-channel.component.scss']
})
export class DeleteChannelComponent implements OnInit {

  public channel: IChannel;
  public confirmation: string = '';

  public saving: boolean = false;

  constructor(
    private $db: AngularFirestore,
    private dialog: MatDialogRef<DeleteChannelComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    console.log(data);
    this.channel = data.channel;
  }

  ngOnInit() {
  }

  public delete() {
    this.saving = true;
    this.$db.collection('channels').doc(this.channel.id).delete().then(() => {
      this.dialog.close(true);
    });
  }

}
