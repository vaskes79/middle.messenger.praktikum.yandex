import type { State, KeysOfState } from '../types';
import { EventBus } from './EventBus';

const initialState: State = {
  currentChat: null,
  user: null,
  chatList: [],
  currentChatWSLink: null,
  currentWSconnect: null
};

export enum StoreEvents {
  updateStore = 'store:update'
}

export class Store {
  private static _instance: Store = new Store();
  private _state: State = initialState;
  private _eventBus = EventBus.getInstance();

  constructor() {
    if (Store._instance) {
      this._error('using new Store disabled');
    }
    Store._instance = this;
  }

  private _error(msg?: string) {
    msg = `Error: ${msg}` || 'Error: Store';
    throw new Error(msg);
  }

  static getState<K extends KeysOfState, S extends (typeof this._instance._state)[K]>(key?: K) {
    if (key) {
      return this._instance._state[key] as S;
    }

    return this._instance._state;
  }

  static setState<K extends KeysOfState, S extends (typeof this._instance._state)[K]>(
    key: K,
    value: S
  ) {
    const currentState = this._instance._state;
    this._instance._state = { ...currentState, [key]: value };
    this._instance._eventBus.emmit(StoreEvents.updateStore, key);
  }
}
