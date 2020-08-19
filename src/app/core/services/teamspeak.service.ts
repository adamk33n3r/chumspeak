import { Injectable, EventEmitter, NgZone } from '@angular/core';

import { ts3client } from 'node-ts3sdk-client';
import { Observable, Subject, throwError } from 'rxjs';
import { first } from 'rxjs/operators';

// import ts from 'node-ts3sdk-client';

interface ClientData {
    id: number;
    nickname: string;
    isTalking: boolean;
}

interface ObjectArray<T> {
    [index: number]: T;
}

export interface ConnectedClients extends ObjectArray<ClientData> {}

export interface ServerData {
    id: number;
    channels: ObjectArray<{
        id: number;
        clients: ConnectedClients;
    }>;
}

@Injectable({
    providedIn: 'root'
})
export class TeamSpeakService {

    public ts3client: typeof ts3client;

    public identity: string;
    public schID: number;

    public newChannel: Subject<number> = new Subject();
    public onConnected: Subject<number> = new Subject();
    public onDisconnected: Subject<void> = new Subject();

    public get connectedClients() { return JSON.parse(JSON.stringify(this._connectedClients)); }

    private _connectedClients: ConnectedClients = {};

    constructor(private ngZone: NgZone) {
        this.init();
    }

    public init() {
        // this.ngZone.runOutsideAngular(() => {

        this.ts3client = window.interop.ts3client;
        this.ts3client.setLogVerbosity(this.ts3client.LogLevel.WARNING);

        const logPath = undefined;
        const soundBackendPath = this.ts3client.getResourcePath().replace('app.asar', 'app.asar.unpacked');
        console.log(soundBackendPath);

        console.log(this.ts3client.getClientLibVersion(), this.ts3client.getClientLibVersionNumber());
        // const ids = this.ts3client.getServerConnectionHandlerList();
        // console.log(ids);
        // if (ids && ids.length > 0) {
        //     this.schID = ids[0];
        //     this.destroy();
        // }
        this.ts3client.initClientLib(this.ts3client.LogTypes.CONSOLE, logPath, soundBackendPath);
        // this.ts3client.initClientLib(this.ts3client.LogTypes.FILE | this.ts3client.LogTypes.CONSOLE, logPath, soundBackendPath);

        this.schID = this.ts3client.spawnNewServerConnectionHandler();
        console.log(this.schID);

        console.log(this.ts3client.getCaptureDeviceList());
        console.log(this.ts3client.getCaptureModeList());
        console.log(this.ts3client.getDefaultCaptureDevice());
        this.ts3client.openCaptureDevice(this.schID);
        // this.ts3client.openPlaybackDevice(this.schID);
        const modes = this.ts3client.getPlaybackModeList();
        console.log(modes);
        // console.log(this.ts3client.getDefaultCaptureMode());
        // console.log(this.ts3client.getDefaultCaptureDevice(this.ts3client.getDefaultCaptureMode()));
        // console.log(this.ts3client.getDefaultPlaybackMode());
        // console.log(this.ts3client.getDefaultPlaybackDevice(this.ts3client.getDefaultPlaybackMode()));
        const devices = this.ts3client.getPlaybackDeviceList();
        console.log(devices, devices[1]);
        this.ts3client.openPlaybackDevice(this.schID, this.ts3client.getDefaultPlaybackMode(), devices[1][1]);

        const identity = localStorage.getItem('identity');
        if (identity) {
            this.identity = identity;
        } else {
            this.identity = this.ts3client.createIdentity();
            localStorage.setItem('identity', this.identity);
        }

        this.setupListeners();
        // });
    }

    public connect(address: string, password: string, nickname: string) {

        console.log('IDENTITY:', this.identity);
        try {
            const status = this.ts3client.getConnectionStatus(this.schID);
            if (status !== this.ts3client.ConnectStatus.DISCONNECTED) {
                return throwError('Already connected');
            }
            this.ts3client.startConnection(
                this.schID,
                this.identity,
                address,
                9987,
                nickname,
                undefined,
                undefined,
                password,
            );
        } catch (err) {
            console.error('Could not start connection:', err);
        }

        this.onConnected.pipe(first()).subscribe((id) => {
            this.ts3client.requestChannelSubscribeAll(this.schID);
            const curChannel = this.ts3client.getChannelOfClient(this.schID, id);
            console.log(this.ts3client.getChannelVariableAsInt(this.schID, curChannel, this.ts3client.ChannelProperties.CODEC));
            console.log(this.ts3client.getChannelVariableAsInt(this.schID, curChannel, this.ts3client.ChannelProperties.CODEC_QUALITY));
        });
        return this.onConnected.pipe(first());
    }

    public destroy() {
        console.log('destroying tsclient');
        this.ts3client.stopConnection(this.schID);
        this.ts3client.destroyServerConnectionHandler(this.schID);
        this.ts3client.destroyClientLib();
    }

    public openCaptureDevice(device: string);
    public openCaptureDevice(mode: string, device?: string) {
        // Only one param, so use default mode and treat `mode` as device
        if (!device) {
            device = mode;
            mode = undefined;
        }

        this.ts3client.openCaptureDevice(this.schID, mode, device);
    }

    public openPlaybackDevice(device: string);
    public openPlaybackDevice(mode: string, device?: string) {
        // Only one param, so use default mode and treat `mode` as device
        if (!device) {
            device = mode;
            mode = undefined;
        }

        this.ts3client.openPlaybackDevice(this.schID, mode, device);
    }

    public closeDevices(capture: boolean = true, playback: boolean = true) {
        this.ts3client.closeCaptureDevice(this.schID);
        this.ts3client.closePlaybackDevice(this.schID);
    }

    private setupListeners() {
        this.ts3client.on('onClientMoveTimeoutEvent', (schID, clientID, oldChannelID, newChannelID, visibility, timeoutMessage) => {});
        this.ts3client.on('onTalkStatusChangeEvent', (schID, status, isWhisper, clientID) => {
            this.ngZone.run(() => {
                console.log('onTalkStatusChangeEvent:', schID, status, isWhisper, clientID);
                const clientData = this._connectedClients[clientID]
                if (!clientData)
                    return;
                clientData.isTalking = status === this.ts3client.TalkStatus.TALKING;
            });
        });
        this.ts3client.on('onConnectStatusChangeEvent', (schID, status, errno) => {
            const msg = this.ts3client.getErrorMessage(errno);
            console.log('connect status:', schID, status, errno, msg);
            switch (status) {
                case this.ts3client.ConnectStatus.CONNECTING:
                    console.log('CONNECTING');
                    break;
                case this.ts3client.ConnectStatus.CONNECTED:
                    console.log('CONNECTED');
                    const welcomeMsg = this.ts3client.getServerVariableAsString(this.schID, this.ts3client.VirtualServerProperties.WELCOMEMESSAGE);
                    const clientID = this.ts3client.getClientID(this.schID);
                    const nickname = this.ts3client.getClientVariableAsString(this.schID, clientID, this.ts3client.ClientProperties.NICKNAME);
                    this._connectedClients[clientID] = {
                        id: clientID,
                        nickname,
                        isTalking: false,
                    };
                    this.onConnected.next(clientID);
                    // this.onConnected.complete();
                    console.log(welcomeMsg);
                    break;
                case this.ts3client.ConnectStatus.DISCONNECTED:
                    this._connectedClients = {};
                    console.log('DISCONNECTED');
                    if (errno !== 0) {
                        this.onConnected.error(errno + ': ' + msg);
                    }
                    this.onDisconnected.next();
                    break;
                case this.ts3client.ConnectStatus.ESTABLISHING:
                    console.log('ESTABLISHING');
                    break;
                case this.ts3client.ConnectStatus.ESTABLISHED:
                    console.log('ESTABLISHED');
                    break;
                default:
                    console.log('Unknown status:', status);
                    break;
            }
            this.ts3client.logMessage(msg, this.ts3client.LogLevel.DEBUG);
        });

        this.ts3client.on('onServerErrorEvent', (_, err, retCode, extraMsg) => {
            if (err === 'ok') {
                return;
            }
            console.error('onServerErrorEvent:', err, retCode, extraMsg);
        });

        this.ts3client.on('onNewChannelCreatedEvent', (_, channelID, channelParentID, invokerID, invokerName) => {
            console.log('new channel created!', channelID, channelParentID, invokerID, invokerName);
            this.newChannel.next(channelID);
        });
    }

    public createChannel(name: string, description: string): Observable<number> {
        /* int createChannel(uint64 scHandlerID, uint64 parentChannelID, const char* name, const char* topic,
                            const char* description, const char* password, int codec, int codecQuality,
                            int maxClients, int familyMaxClients, int order, int perm,
                            int semiperm, int default)
    
        CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_NAME, name));
        CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_TOPIC, topic));
        CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_DESCRIPTION, desc));
        CHECK_ERROR(ts3client_setChannelVariableAsString(scHandlerID, 0, CHANNEL_PASSWORD, password));
        CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_CODEC, codec));
        CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_CODEC_QUALITY, codecQuality));
        CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_MAXCLIENTS, maxClients));
        CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_MAXFAMILYCLIENTS, familyMaxClients));
        CHECK_ERROR(ts3client_setChannelVariableAsUInt64(scHandlerID, 0, CHANNEL_ORDER, order));
        CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_FLAG_PERMANENT, perm));
        CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_FLAG_SEMI_PERMANENT, semiperm));
        CHECK_ERROR(ts3client_setChannelVariableAsInt (scHandlerID, 0, CHANNEL_FLAG_DEFAULT, default));
        */

        return new Observable((subscriber) => {
            const subscription = this.newChannel.subscribe((channelID) => {
                subscriber.next(channelID);
                subscriber.complete();
                subscription.unsubscribe();
            });

            this.ts3client.setChannelVariableAsString(this.schID, 0, this.ts3client.ChannelProperties.NAME, name);
            this.ts3client.setChannelVariableAsString(this.schID, 0, this.ts3client.ChannelProperties.DESCRIPTION, description);
            this.ts3client.setChannelVariableAsInt(this.schID, 0, this.ts3client.ChannelProperties.FLAG_PERMANENT, 1);

            this.ts3client.flushChannelCreation(this.schID, 0);
        });
    }


}
