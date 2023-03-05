import type { State, KeysOfState } from '../types';
import { EventBus } from './EventBus';

const initialState: State = {
  currentChat: null,
  user: null,
  chatList: [],
  currentChatWSLink: null,
  currentWSconnect: null,
  messageItemList: [],
  editProfileData: null,
  changePasswordData: {
    oldPassword: '',
    newPassword: ''
  }
};

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

  static getState<K extends KeysOfState, S extends K extends KeysOfState ? State[K] : State>(
    key?: K
  ) {
    if (key) {
      return this._instance._state[key] as S;
    }

    return this._instance._state as S;
  }

  static setState<K extends KeysOfState, S extends (typeof this._instance._state)[K]>(
    key: K,
    value: S
  ) {
    const currentState = this._instance._state;
    const newState = { ...currentState, [key]: value };
    const isChanged = JSON.stringify(currentState) !== JSON.stringify(newState);

    if (isChanged) {
      this._instance._state = newState;
      this._instance._eventBus.emmit('store:update', { key, newState });
    }
  }
}
