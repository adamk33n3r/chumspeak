import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SettingsComponent } from './settings.component';
import { AudioComponent } from './audio/audio.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
    declarations: [
        SettingsComponent,
        AudioComponent,
        NotificationsComponent,
    ],
    entryComponents: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,

        MatDialogModule,
        MatButtonModule,
        // MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatProgressBarModule,
        MatSelectModule,
        MatTooltipModule,
    ],
})
export class SettingsModule {}
