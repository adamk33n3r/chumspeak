import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { PrefsService } from 'app/core/services/prefs.service';
import { IUserPrefs } from 'app/../../store';

@Component({
    selector: 'chum-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

    public prefs: IUserPrefs['notifications'];

    constructor(private $prefs: PrefsService) {}

    public ngOnInit(): void {
        this.prefs = this.$prefs.load().notifications;
    }

    public sendTestNotification() {
        window.interop.sendNotification(AppConfig.production, 'Test Notification', 'This is a test notification');
    }

    public playTestNotification() {

        // navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        //     navigator.mediaDevices.enumerateDevices().then(function(devices) {
        //         devices.forEach(function(device) {
        //             console.log(device.label)
        //         });
        //     });
        // }).catch(err => console.error(err));
        const audio = new Audio('assets/test.ogg');
        audio.play();


        // const devices = await navigator.mediaDevices.enumerateDevices();
        // const audioDevices = devices.filter(device => device.kind === 'audiooutput');
        // const audio = document.createElement('audio');
        // await audio.setSinkId(audioDevices[0].deviceId);
        // console.log('Audio is being played on ' + audio.sinkId);

    }

    public save() {
        // this.$prefs.setKey('notifications', { messages: { mentions: true }, voiceChat: { connected: true, disconnected: false, userJoined: true, userLeft: true } });
        this.$prefs.setKey('notifications', this.prefs);
    }

}
