import { Component, OnInit, Inject } from '@angular/core';

import { IChannel } from '../../components/home/home.component';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'chumspeak-delete-channel',
  templateUrl: './delete-channel.component.html',
  styleUrls: ['./delete-channel.component.scss']
})
export class DeleteChannelComponent implements OnInit {

  public channel: IChannel;
  public confirmation: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    console.log(data);
    this.channel = data.channel;
  }

  ngOnInit() {
  }

}
