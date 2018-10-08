import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatInputModule } from '@angular/material';

import { NewChannelComponent } from './new-channel/new-channel.component';

const dialogs: any[] = [
    NewChannelComponent,
];

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
    ],
    declarations: dialogs,
    entryComponents: dialogs,
})
export class DialogsModule {}
