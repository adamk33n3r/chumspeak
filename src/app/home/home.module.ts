import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'app/material.module';
import { ChannelComponent } from 'app/channel/channel.component';
import { GravitarPipe } from 'app/pipes/gravitar.pipe';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    ChannelComponent,

    GravitarPipe,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule, MaterialModule, MatButtonModule]
})
export class HomeModule {}
