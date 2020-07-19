import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { NewChannelComponent } from './new-channel/new-channel.component';
import { DeleteChannelComponent } from './delete-channel/delete-channel.component';
import { FormsModule } from '@angular/forms';

const dialogs: any[] = [
  NewChannelComponent,
  DeleteChannelComponent,
];

@NgModule({
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: dialogs,
  entryComponents: dialogs,
})
export class DialogsModule {}
