/** Declaration file generated by dts-gen */

declare module 'node-ts3sdk-client' {

    export const ChannelProperties: {
        CODEC: number;
        CODEC_IS_UNENCRYPTED: number;
        CODEC_LATENCY_FACTOR: number;
        CODEC_QUALITY: number;
        DELETE_DELAY: number;
        DESCRIPTION: number;
        FLAG_DEFAULT: number;
        FLAG_PASSWORD: number;
        FLAG_PERMANENT: number;
        FLAG_SEMI_PERMANENT: number;
        MAXCLIENTS: number;
        MAXFAMILYCLIENTS: number;
        NAME: number;
        ORDER: number;
        PASSWORD: number;
        SECURITY_SALT: number;
        TOPIC: number;
    };

    export const ClientProperties: {
        DEFAULT_CHANNEL: number;
        DEFAULT_CHANNEL_PASSWORD: number;
        FLAG_TALKING: number;
        IDLE_TIME: number;
        INPUT_DEACTIVATED: number;
        INPUT_HARDWARE: number;
        INPUT_MUTED: number;
        IS_MUTED: number;
        IS_RECORDING: number;
        META_DATA: number;
        NICKNAME: number;
        OUTPUTONLY_MUTED: number;
        OUTPUT_HARDWARE: number;
        OUTPUT_MUTED: number;
        PLATFORM: number;
        SECURITY_HASH: number;
        SERVER_PASSWORD: number;
        UNIQUE_IDENTIFIER: number;
        VERSION: number;
        VERSION_SIGN: number;
        VOLUME_MODIFICATOR: number;
    };

    export const CodecEncryptionMode: {
        FORCED_OFF: number;
        FORCED_ON: number;
        PER_CHANNEL: number;
    };

    export const CodecType: {
        CELT_MONO: number;
        OPUS_MUSIC: number;
        OPUS_VOICE: number;
        SPEEX_NARROWBAND: number;
        SPEEX_ULTRAWIDEBAND: number;
        SPEEX_WIDEBAND: number;
    };

    export const ConnectStatus: {
        DISCONNECTED: 0x00;
        CONNECTING: 0x01;
        CONNECTED: 0x02;
        ESTABLISHING: 0x03;
        ESTABLISHED: 0x04;
    };

    export const HardwareInputStatus: {
        DISABLED: number;
        ENABLED: number;
    };

    export const HardwareOutputStatus: {
        DISABLED: number;
        ENABLED: number;
    };

    export const InputDeactivationStatus: {
        ACTIVE: number;
        DEACTIVATED: number;
    };

    export const LogLevel: {
        CRITICAL: number;
        DEBUG: number;
        DEVEL: number;
        ERROR: number;
        INFO: number;
        WARNING: number;
    };

    export const LogTypes: {
        CONSOLE: number;
        DATABASE: number;
        FILE: number;
        NONE: number;
        NO_NETLOGGING: number;
        SYSLOG: number;
        USERLOGGING: number;
    };

    export const MuteInputStatus: {
        MUTED: number;
        NONE: number;
    };

    export const MuteOutputStatus: {
        MUTED: number;
        NONE: number;
    };

    export const ReasonIdentifier: {
        CHANNELEDIT: number;
        CHANNELUPDATE: number;
        CLIENTDISCONNECT: number;
        CLIENTDISCONNECT_SERVER_SHUTDOWN: number;
        KICK_CHANNEL: number;
        KICK_SERVER: number;
        KICK_SERVER_BAN: number;
        LOST_CONNECTION: number;
        MOVED: number;
        NONE: number;
        SERVERSTOP: number;
        SUBSCRIPTION: number;
    };

    export const TalkStatus: {
        NOT_TALKING: number;
        TALKING: number;
        TALKING_WHILE_DISABLED: number;
    };

    export const TextMessageTargetMode: {
        CHANNEL: number;
        CLIENT: number;
        SERVER: number;
    };

    export const VirtualServerProperties: {
        CHANNELS_ONLINE: number;
        CLIENTS_ONLINE: number;
        CODEC_ENCRYPTION_MODE: number;
        CREATED: number;
        MAXCLIENTS: number;
        NAME: number;
        PASSWORD: number;
        PLATFORM: number;
        UNIQUE_IDENTIFIER: number;
        UPTIME: number;
        VERSION: number;
        WELCOMEMESSAGE: number;
    };

    export const Visibility: {
        ENTER: number;
        LEAVE: number;
        RETAIN: number;
    };

    export function activateCaptureDevice(): any;

    export function allowWhispersFrom(): any;

    export function cleanUpConnectionInfo(): any;

    export function closeCaptureDevice(): any;

    export function closePlaybackDevice(): any;

    export function createIdentity(): string;

    export function destroyClientLib(): any;

    export function destroyServerConnectionHandler(schID: number): any;

    export function flushChannelCreation(): any;

    export function flushChannelUpdates(): any;

    export function flushClientSelfUpdates(schID: number, returnCode?: number | string): any;

    export function getAverageTransferSpeed(): any;

    export function getBindingsPath(): any;

    export function getCaptureDeviceList(): any;

    export function getCaptureModeList(): any;

    export function getChannelClientList(): any;

    export function getChannelEmptySecs(): any;

    export function getChannelIDFromChannelNames(): any;

    export function getChannelList(): any;

    export function getChannelOfClient(): any;

    export function getChannelVariableAsInt(): any;

    export function getChannelVariableAsString(): any;

    export function getChannelVariableAsUInt64(): any;

    export function getClientID(): any;

    export function getClientLibVersion(): any;

    export function getClientLibVersionNumber(): any;

    export function getClientList(): any;

    export function getClientSelfVariableAsInt(): any;

    export function getClientSelfVariableAsString(): any;

    export function getClientVariableAsInt(): any;

    export function getClientVariableAsString(): any;

    export function getClientVariableAsUInt64(): any;

    export function getConnectionStatus(schID: number): any;

    export function getConnectionVariableAsDouble(): any;

    export function getConnectionVariableAsString(): any;

    export function getConnectionVariableAsUInt64(): any;

    export function getCurrentCaptureDeviceName(): any;

    export function getCurrentCaptureMode(): any;

    export function getCurrentPlaybackDeviceName(): any;

    export function getCurrentPlaybackMode(): any;

    export function getCurrentTransferSpeed(): any;

    export function getEncodeConfigValue(): any;

    export function getErrorMessage(errno: number): string;

    export function getInstanceSpeedLimitDown(): any;

    export function getInstanceSpeedLimitUp(): any;

    export function getLastError(): any;

    export function getLastErrorMessage(): any;

    export function getParentChannelOfChannel(): any;

    export function getPlatform(): any;

    export function getPlaybackConfigValueAsFloat(): any;

    export function getPlaybackDeviceList(): any;

    export function getPlaybackModeList(): any;

    export function getPreProcessorConfigValue(): any;

    export function getPreProcessorInfoValueFloat(): any;

    export function getResourcePath(): any;

    export function getServerConnectionHandlerList(): any;

    export function getServerConnectionHandlerSpeedLimitDown(): any;

    export function getServerConnectionHandlerSpeedLimitUp(): any;

    export function getServerConnectionVariableAsFloat(): any;

    export function getServerConnectionVariableAsUInt64(): any;

    export function getServerVariableAsInt(): any;

    export function getServerVariableAsString(schID: number, variable: number): string;

    export function getServerVariableAsUInt64(): any;

    export function getTransferFileName(): any;

    export function getTransferFilePath(): any;

    export function getTransferFileRemotePath(): any;

    export function getTransferFileSize(): any;

    export function getTransferFileSizeDone(): any;

    export function getTransferRunTime(): any;

    export function getTransferStatus(): any;

    export function haltTransfer(): any;

    export function identityStringToUniqueIdentifier(): any;

    export function initClientLib(logType: number, logPath?: string, soundBackendPath?: string): any;

    export function initiateGracefulPlaybackShutdown(): any;

    export function isTransferSender(): any;

    export function logMessage(message: string, logLevel: number): any;

    type EventNames =
        'onConnectStatusChangeEvent' |
        'onTalkStatusChangeEvent' |
        'onClientMoveEvent' |
        'onServerErrorEvent'
    ;
    export function on(message: EventNames, cb: any): any;

    export function openCaptureDevice(schID: number): any;

    export function openPlaybackDevice(schID: number): any;

    export function playWaveFile(): any;

    export function removeFromAllowedWhispersFrom(): any;

    export function requestChannelDelete(): any;

    export function requestChannelDescription(): any;

    export function requestChannelMove(): any;

    export function requestChannelSubscribe(): any;

    export function requestChannelSubscribeAll(): any;

    export function requestChannelUnsubscribe(): any;

    export function requestChannelUnsubscribeAll(): any;

    export function requestClientIDs(): any;

    export function requestClientKickFromChannel(): any;

    export function requestClientKickFromServer(): any;

    export function requestClientMove(): any;

    export function requestClientSetWhisperList(): any;

    export function requestClientVariables(): any;

    export function requestConnectionInfo(): any;

    export function requestCreateDirectory(): any;

    export function requestDeleteFile(): any;

    export function requestFile(): any;

    export function requestFileInfo(): any;

    export function requestFileList(): any;

    export function requestMuteClients(): any;

    export function requestRenameFile(): any;

    export function requestSendChannelTextMsg(): any;

    export function requestSendPrivateTextMsg(): any;

    export function requestSendServerTextMsg(): any;

    export function requestServerConnectionInfo(): any;

    export function requestServerVariables(): any;

    export function requestUnmuteClients(): any;

    export function sendFile(): any;

    export function setChannelVariableAsInt(): any;

    export function setChannelVariableAsString(): any;

    export function setChannelVariableAsUInt64(): any;

    export function setClientSelfVariableAsInt(schID: number, property: number, value: number): any;

    export function setClientSelfVariableAsString(): any;

    export function setClientVolumeModifier(): any;

    export function setInstanceSpeedLimitDown(): any;

    export function setInstanceSpeedLimitUp(): any;

    export function setLocalTestMode(): any;

    export function setLogVerbosity(): any;

    export function setPlaybackConfigValue(): any;

    export function setPreProcessorConfigValue(): any;

    export function setServerConnectionHandlerSpeedLimitDown(): any;

    export function setServerConnectionHandlerSpeedLimitUp(): any;

    export function setTransferSpeedLimit(): any;

    export function spawnNewServerConnectionHandler(): number;

    export function startConnection(
        schID: number,
        identity: string,
        host: string,
        port: number,
        nickname: string,
        defaultChannels?: string[],
        defaultChannelPassword?: string,
        serverPassword?: string,
    ): void;

    export function startConnectionWithChannelID(): any;

    export function startVoiceRecording(): any;

    export function stopConnection(schID: number): any;

    export function stopVoiceRecording(): any;

    // export namespace activateCaptureDevice {
    //     const prototype: {
    //     };

    // }

    // export namespace allowWhispersFrom {
    //     const prototype: {
    //     };

    // }

    // export namespace cleanUpConnectionInfo {
    //     const prototype: {
    //     };

    // }

    // export namespace closeCaptureDevice {
    //     const prototype: {
    //     };

    // }

    // export namespace closePlaybackDevice {
    //     const prototype: {
    //     };

    // }

    // export namespace createIdentity {
    //     const prototype: {
    //     };

    // }

    // export namespace destroyClientLib {
    //     const prototype: {
    //     };

    // }

    // export namespace destroyServerConnectionHandler {
    //     const prototype: {
    //     };

    // }

    // export namespace flushChannelCreation {
    //     const prototype: {
    //     };

    // }

    // export namespace flushChannelUpdates {
    //     const prototype: {
    //     };

    // }

    // export namespace flushClientSelfUpdates {
    //     const prototype: {
    //     };

    // }

    // export namespace getAverageTransferSpeed {
    //     const prototype: {
    //     };

    // }

    // export namespace getBindingsPath {
    //     const prototype: {
    //     };

    // }

    // export namespace getCaptureDeviceList {
    //     const prototype: {
    //     };

    // }

    // export namespace getCaptureModeList {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelClientList {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelEmptySecs {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelIDFromChannelNames {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelList {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelOfClient {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelVariableAsInt {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelVariableAsString {
    //     const prototype: {
    //     };

    // }

    // export namespace getChannelVariableAsUInt64 {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientID {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientLibVersion {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientLibVersionNumber {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientList {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientSelfVariableAsInt {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientSelfVariableAsString {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientVariableAsInt {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientVariableAsString {
    //     const prototype: {
    //     };

    // }

    // export namespace getClientVariableAsUInt64 {
    //     const prototype: {
    //     };

    // }

    // export namespace getConnectionStatus {
    //     const prototype: {
    //     };

    // }

    // export namespace getConnectionVariableAsDouble {
    //     const prototype: {
    //     };

    // }

    // export namespace getConnectionVariableAsString {
    //     const prototype: {
    //     };

    // }

    // export namespace getConnectionVariableAsUInt64 {
    //     const prototype: {
    //     };

    // }

    // export namespace getCurrentCaptureDeviceName {
    //     const prototype: {
    //     };

    // }

    // export namespace getCurrentCaptureMode {
    //     const prototype: {
    //     };

    // }

    // export namespace getCurrentPlaybackDeviceName {
    //     const prototype: {
    //     };

    // }

    // export namespace getCurrentPlaybackMode {
    //     const prototype: {
    //     };

    // }

    // export namespace getCurrentTransferSpeed {
    //     const prototype: {
    //     };

    // }

    // export namespace getEncodeConfigValue {
    //     const prototype: {
    //     };

    // }

    // export namespace getErrorMessage {
    //     const prototype: {
    //     };

    // }

    // export namespace getInstanceSpeedLimitDown {
    //     const prototype: {
    //     };

    // }

    // export namespace getInstanceSpeedLimitUp {
    //     const prototype: {
    //     };

    // }

    // export namespace getLastError {
    //     const prototype: {
    //     };

    // }

    // export namespace getLastErrorMessage {
    //     const prototype: {
    //     };

    // }

    // export namespace getParentChannelOfChannel {
    //     const prototype: {
    //     };

    // }

    // export namespace getPlatform {
    //     const prototype: {
    //     };

    // }

    // export namespace getPlaybackConfigValueAsFloat {
    //     const prototype: {
    //     };

    // }

    // export namespace getPlaybackDeviceList {
    //     const prototype: {
    //     };

    // }

    // export namespace getPlaybackModeList {
    //     const prototype: {
    //     };

    // }

    // export namespace getPreProcessorConfigValue {
    //     const prototype: {
    //     };

    // }

    // export namespace getPreProcessorInfoValueFloat {
    //     const prototype: {
    //     };

    // }

    // export namespace getResourcePath {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerConnectionHandlerList {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerConnectionHandlerSpeedLimitDown {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerConnectionHandlerSpeedLimitUp {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerConnectionVariableAsFloat {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerConnectionVariableAsUInt64 {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerVariableAsInt {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerVariableAsString {
    //     const prototype: {
    //     };

    // }

    // export namespace getServerVariableAsUInt64 {
    //     const prototype: {
    //     };

    // }

    // export namespace getTransferFileName {
    //     const prototype: {
    //     };

    // }

    // export namespace getTransferFilePath {
    //     const prototype: {
    //     };

    // }

    // export namespace getTransferFileRemotePath {
    //     const prototype: {
    //     };

    // }

    // export namespace getTransferFileSize {
    //     const prototype: {
    //     };

    // }

    // export namespace getTransferFileSizeDone {
    //     const prototype: {
    //     };

    // }

    // export namespace getTransferRunTime {
    //     const prototype: {
    //     };

    // }

    // export namespace getTransferStatus {
    //     const prototype: {
    //     };

    // }

    // export namespace haltTransfer {
    //     const prototype: {
    //     };

    // }

    // export namespace identityStringToUniqueIdentifier {
    //     const prototype: {
    //     };

    // }

    // export namespace initClientLib {
    //     const prototype: {
    //     };

    // }

    // export namespace initiateGracefulPlaybackShutdown {
    //     const prototype: {
    //     };

    // }

    // export namespace isTransferSender {
    //     const prototype: {
    //     };

    // }

    // export namespace logMessage {
    //     const prototype: {
    //     };

    // }

    // export namespace on {
    //     const prototype: {
    //     };

    // }

    // export namespace openCaptureDevice {
    //     const prototype: {
    //     };

    // }

    // export namespace openPlaybackDevice {
    //     const prototype: {
    //     };

    // }

    // export namespace playWaveFile {
    //     const prototype: {
    //     };

    // }

    // export namespace removeFromAllowedWhispersFrom {
    //     const prototype: {
    //     };

    // }

    // export namespace requestChannelDelete {
    //     const prototype: {
    //     };

    // }

    // export namespace requestChannelDescription {
    //     const prototype: {
    //     };

    // }

    // export namespace requestChannelMove {
    //     const prototype: {
    //     };

    // }

    // export namespace requestChannelSubscribe {
    //     const prototype: {
    //     };

    // }

    // export namespace requestChannelSubscribeAll {
    //     const prototype: {
    //     };

    // }

    // export namespace requestChannelUnsubscribe {
    //     const prototype: {
    //     };

    // }

    // export namespace requestChannelUnsubscribeAll {
    //     const prototype: {
    //     };

    // }

    // export namespace requestClientIDs {
    //     const prototype: {
    //     };

    // }

    // export namespace requestClientKickFromChannel {
    //     const prototype: {
    //     };

    // }

    // export namespace requestClientKickFromServer {
    //     const prototype: {
    //     };

    // }

    // export namespace requestClientMove {
    //     const prototype: {
    //     };

    // }

    // export namespace requestClientSetWhisperList {
    //     const prototype: {
    //     };

    // }

    // export namespace requestClientVariables {
    //     const prototype: {
    //     };

    // }

    // export namespace requestConnectionInfo {
    //     const prototype: {
    //     };

    // }

    // export namespace requestCreateDirectory {
    //     const prototype: {
    //     };

    // }

    // export namespace requestDeleteFile {
    //     const prototype: {
    //     };

    // }

    // export namespace requestFile {
    //     const prototype: {
    //     };

    // }

    // export namespace requestFileInfo {
    //     const prototype: {
    //     };

    // }

    // export namespace requestFileList {
    //     const prototype: {
    //     };

    // }

    // export namespace requestMuteClients {
    //     const prototype: {
    //     };

    // }

    // export namespace requestRenameFile {
    //     const prototype: {
    //     };

    // }

    // export namespace requestSendChannelTextMsg {
    //     const prototype: {
    //     };

    // }

    // export namespace requestSendPrivateTextMsg {
    //     const prototype: {
    //     };

    // }

    // export namespace requestSendServerTextMsg {
    //     const prototype: {
    //     };

    // }

    // export namespace requestServerConnectionInfo {
    //     const prototype: {
    //     };

    // }

    // export namespace requestServerVariables {
    //     const prototype: {
    //     };

    // }

    // export namespace requestUnmuteClients {
    //     const prototype: {
    //     };

    // }

    // export namespace sendFile {
    //     const prototype: {
    //     };

    // }

    // export namespace setChannelVariableAsInt {
    //     const prototype: {
    //     };

    // }

    // export namespace setChannelVariableAsString {
    //     const prototype: {
    //     };

    // }

    // export namespace setChannelVariableAsUInt64 {
    //     const prototype: {
    //     };

    // }

    // export namespace setClientSelfVariableAsInt {
    //     const prototype: {
    //     };

    // }

    // export namespace setClientSelfVariableAsString {
    //     const prototype: {
    //     };

    // }

    // export namespace setClientVolumeModifier {
    //     const prototype: {
    //     };

    // }

    // export namespace setInstanceSpeedLimitDown {
    //     const prototype: {
    //     };

    // }

    // export namespace setInstanceSpeedLimitUp {
    //     const prototype: {
    //     };

    // }

    // export namespace setLocalTestMode {
    //     const prototype: {
    //     };

    // }

    // export namespace setLogVerbosity {
    //     const prototype: {
    //     };

    // }

    // export namespace setPlaybackConfigValue {
    //     const prototype: {
    //     };

    // }

    // export namespace setPreProcessorConfigValue {
    //     const prototype: {
    //     };

    // }

    // export namespace setServerConnectionHandlerSpeedLimitDown {
    //     const prototype: {
    //     };

    // }

    // export namespace setServerConnectionHandlerSpeedLimitUp {
    //     const prototype: {
    //     };

    // }

    // export namespace setTransferSpeedLimit {
    //     const prototype: {
    //     };

    // }

    // export namespace spawnNewServerConnectionHandler {
    //     const prototype: {
    //     };

    // }

    // export namespace startConnection {
    //     const prototype: {
    //     };

    // }

    // export namespace startConnectionWithChannelID {
    //     const prototype: {
    //     };

    // }

    // export namespace startVoiceRecording {
    //     const prototype: {
    //     };

    // }

    // export namespace stopConnection {
    //     const prototype: {
    //     };

    // }

    // export namespace stopVoiceRecording {
    //     const prototype: {
    //     };

    // }

}
