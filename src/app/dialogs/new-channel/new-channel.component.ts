import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss']
})
export class NewChannelComponent implements OnInit {

  constructor(private dialog: MatDialogRef<NewChannelComponent>) { }

  ngOnInit() {
  }

}
