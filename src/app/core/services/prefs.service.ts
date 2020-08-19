import { Injectable } from '@angular/core';
import { IUserPrefs } from 'app/../../store';

@Injectable({
    providedIn: 'root'
})
export class PrefsService {

    private store: IUserPrefs;

    constructor() {
        this.store = window.interop.userPrefs;
    }

    public load() {
        this.store = window.interop.ipc.sendSync('userPrefs:get');
        return this.store;
    }

    public save() {
        window.interop.ipc.send('userPrefs:set', this.store);
    }

    public saveKey<Key extends keyof IUserPrefs>(key: Key) {
        window.interop.ipc.send('userPrefs:set:key', key, this.store[key]);
    }

    public get(): IUserPrefs {
        return this.store;
    }

    public getKey<Key extends keyof IUserPrefs>(key: Key) {
        return this.store[key];
    }

    public set(prefs: IUserPrefs) {
        this.store = prefs;
        this.save();
    }

    public setKey<Key extends keyof IUserPrefs>(key: Key, value: IUserPrefs[Key]) {
        this.store[key] = value;
        this.saveKey(key);
    }
}
