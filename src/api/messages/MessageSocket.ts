import { BaseError, Store } from '../../core';

export class MessageSocket {
  private _soket: WebSocket;
  private _handleError: BaseError;

  constructor() {
    const wsUrl = Store.getState('currentChatWSLink');
    this._handleError = new BaseError('ConnectToChatApi');

    if (typeof wsUrl === 'string') {
      this._soket = new WebSocket(wsUrl);
      this._setupOpenListener();
      this._setupCloseListener();
      this._setupErrorHandling();
      Store.setState('currentWSconnect', this._soket);
    } else {
      console.error(wsUrl);
      this._handleError.error('incorrect url connection WebSocket');
    }
  }

  private _setupOpenListener() {
    this._soket.addEventListener('open', () => {
      console.log('open ws connection');
    });
  }

  private _setupCloseListener() {
    this._soket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('connection is close');
      } else {
        console.log('lost connection');
      }

      console.log(`code: ${event.code} | reason: ${event.reason}`);
    });
  }

  private _setupErrorHandling() {
    this._soket.addEventListener('error', (event) => {
      console.error(event);
      this._handleError.error('error ws processing');
    });
  }

  close() {
    this._soket.close();
  }
}
