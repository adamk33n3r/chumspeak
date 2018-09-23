import { Injectable } from '@angular/core';

// import TS3 from 'node-ts3sdk-client';
// const TS3 = window.require('node-ts3sdk-client');
// console.log(TS3);

import * as TS3 from 'node-ts3sdk-client';

// console.log('IMPORTS:', TS3, ChannelProperties);

@Injectable({
  providedIn: 'root'
})
export class TeamSpeakService {

  public ts3client: typeof TS3;

  constructor() {
    // TS3.f();
    // console.log(TS3);
    this.ts3client = window.require('node-ts3sdk-client');
  }

}
