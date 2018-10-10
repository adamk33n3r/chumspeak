import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatInputModule } from '@angular/material';

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
