import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

import * as path from 'path';

// import { remote } from 'electron';

import { TeamSpeakService } from 'app/core/services/teamspeak.service';

import { IUserPrefs } from 'app/../../store';
import { AppConfig } from 'environments/environment';
import { AudioComponent } from './audio/audio.component';
import { NotificationsComponent } from './notifications/notifications.component';

const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 100,
  touchendHideDelay: 1000,
};

@Component({
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
    ],
})
export class SettingsComponent implements OnInit {

    public get selectedTab(): string {
        return this.options[0];
    }
    public options = ['audio'];
    public settings: IUserPrefs;

    @ViewChild(AudioComponent)
    public audioRef: AudioComponent;

    @ViewChild(NotificationsComponent)
    public notificationRef: NotificationsComponent;

    constructor(
        private dialogRef: MatDialogRef<SettingsComponent>,
        private $ts: TeamSpeakService,
    ) {
        this.settings = window.interop.userPrefs;
        // console.log(this.settings);
    }

    public ngOnInit(): void {
        // window.interop.sendNotification(AppConfig.production, 'New Message', 'this is a test');
    }

    public save() {
        this.audioRef.save();
        this.notificationRef.save();
        this.dialogRef.close();
    }

}
