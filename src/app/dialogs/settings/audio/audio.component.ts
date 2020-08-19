import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AudioDevice as TS3AudioDevice } from 'node-ts3sdk-client';

import { IUserPrefs } from 'app/../../store';
import { PrefsService } from 'app/core/services/prefs.service';
import { TeamSpeakService } from 'app/core/services/teamspeak.service';

interface AudioDevice {
    name: string;
    id: string;
    isDefault: boolean;
}

@Component({
    selector: 'chum-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

    public prefs: IUserPrefs['audio'];

    public captureDevices: AudioDevice[];
    public playbackDevices: AudioDevice[];

    public currentDecibels: number = -50;
    public vadTestID: number;

    @ViewChild('errorTemplate')
    public errorRef: TemplateRef<any>;

    constructor(
        private $prefs: PrefsService,
        private $ts: TeamSpeakService,
        private $dialog: MatDialog,
    ) {}

    public ngOnInit(): void {
        this.prefs = this.$prefs.load().audio;
        this.captureDevices = this.$ts.ts3client.getCaptureDeviceList().map((device) => this.convertDevice(device)); 
        this.playbackDevices = this.$ts.ts3client.getPlaybackDeviceList().map((device) => this.convertDevice(device));
        this.captureDevices.unshift(this.convertDevice(this.$ts.ts3client.getDefaultCaptureDevice(), true));
        this.playbackDevices.unshift(this.convertDevice(this.$ts.ts3client.getDefaultPlaybackDevice(), true));
    }

    public startVADTest() {
        this.vadTestID = window.setInterval(() => {
            this.currentDecibels = this.getCurrentDecibels();
        }, 50);
    }

    public stopVADTest() {
        clearInterval(this.vadTestID);
        this.vadTestID = null;
        this.currentDecibels = -50;
    }

    public setCaptureDevice(id: string) {
        try {
            this.$ts.closeDevices(true, false);
            this.$ts.openCaptureDevice(this.captureDevices.find((device) => id === 'default' ? device.isDefault : (device.id === id)).id);
        } catch (err) {
            console.error(err);
            this.$dialog.open(this.errorRef, {data: {msg: err.message}});
        }
    }

    public setPlaybackDevice(id: string) {
        try {
            this.$ts.closeDevices(false, true);
            this.$ts.openPlaybackDevice(this.captureDevices.find((device) => id === 'default' ? device.isDefault : (device.id === id)).id);
        } catch (err) {
            console.error(err);
            this.$dialog.open(this.errorRef, {data: {msg: err.message}});
        }
    }

    public save() {
        this.$prefs.setKey('audio', this.prefs);
    }

    private getCurrentDecibels(): number {
        return this.$ts.ts3client.getPreProcessorInfoValueFloat(this.$ts.schID, 'decibel_last_period');
    }

    private convertDevice(device: TS3AudioDevice, isDefault: boolean = false): AudioDevice {
        let name = device[0];
        if (isDefault) {
            name = `Default (${name})`;
        }
        return {
            id: device[1],
            name,
            isDefault,
        };
    }

}
