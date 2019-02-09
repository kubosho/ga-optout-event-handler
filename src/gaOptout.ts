import { GaIdOptoutStorage, createGaIdOptoutStorage, OptoutStorageKey } from './gaIdOptoutStorage';

const DO_NOT_TRACK_VALUE = {
  no: '0',
  yes: '1',
  unspecified: 'unspecified',
};

declare global {
  interface Window {
    [key: string]: boolean;
  }
}

export class GAOptout {
  private _gaId: string;
  private _storage: GaIdOptoutStorage;

  constructor(gaId: string, optoutKey?: OptoutStorageKey, storage?: GaIdOptoutStorage) {
    this._gaId = gaId;
    this._storage = storage || createGaIdOptoutStorage(optoutKey);
  }

  get optoutGaId(): string {
    return `ga-disable-${this._gaId}`;
  }

  enable() {
    window[this.optoutGaId] = true;

    if (this._storage.getId() === null) {
      this._storage.saveId(this.optoutGaId);
    }
  }

  disable() {
    window[this.optoutGaId] = false;

    if (this._storage.getId() !== null) {
      this._storage.deleteId();
    }
  }

  enabled(): boolean {
    return this._optoutEnabled() || this._isDoNotTrackEnabled();
  }

  _optoutEnabled(): boolean {
    return window[this.optoutGaId] || this._storage.getId() !== null;
  }

  _isDoNotTrackEnabled(): boolean {
    return navigator.doNotTrack === DO_NOT_TRACK_VALUE.yes;
  }
}
