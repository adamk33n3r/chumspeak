import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NewChannelComponent } from './new-channel/new-channel.component';
import { DeleteChannelComponent } from './delete-channel/delete-channel.component';
import { SettingsModule } from './settings/settings.module';

const dialogs: any[] = [
  NewChannelComponent,
  DeleteChannelComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,

    SettingsModule,
  ],
  declarations: dialogs,
  entryComponents: dialogs,
})
export class DialogsModule {}
