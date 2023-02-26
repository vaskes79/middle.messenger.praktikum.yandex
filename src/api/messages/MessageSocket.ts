import { mapMessageResToMessageItemData } from '../../pages/ChatPage/utils';
import { BaseError, Store } from '../../core';
import { MessageItemListRes } from '../../types';

type MessageSocketDataType = 'user connected' | 'ping' | 'get old' | 'message' | 'file' | 'sticker';

export type MessageSocketData = {
  type: MessageSocketDataType;
  content?: string;
};

type MessageItemsData = { id: number }[];

export class MessageSocket {
  private _soket: WebSocket;
  private _handleError: BaseError;
  private _intervalId: number;
  private _delay = 30000;
  private _ofsetMessages = 0;

  constructor() {
    const wsUrl = Store.getState('currentChatWSLink');
    this._handleError = new BaseError('ConnectToChatApi');

    if (typeof wsUrl === 'string') {
      this._soket = new WebSocket(wsUrl);
      this._setupOpenListener();
      this._setupCloseListener();
      this._setupErrorHandling();
      this._setupMessageListener();
      this._pingConnection();
      Store.setState('currentWSconnect', this);
    } else {
      console.error(wsUrl);
      this._handleError.error('incorrect url connection WebSocket');
    }
  }

  private _setupOpenListener() {
    this._soket.addEventListener('open', () => {
      this.getNextMessages();
    });
  }

  private _updateMessageHandler(newMsg: MessageItemsData) {
    const lastId = newMsg.slice(-1)[0]?.id;

    if (lastId) {
      this._ofsetMessages = lastId;
      const msg = Store.getState('messageItemList');
      const msgItemData = mapMessageResToMessageItemData(newMsg as MessageItemListRes);
      Store.setState('messageItemList', msg.concat(msgItemData));
    }
  }

  private _setupMessageListener() {
    this._soket.addEventListener('message', (rawData: MessageEvent) => {
      const data = JSON.parse(rawData.data);
      if (Array.isArray(data)) {
        this._updateMessageHandler(data);
      }
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

  private _pingConnectionCallback = () => {
    this.send({ type: 'ping' });
  };

  private _pingConnection() {
    this._intervalId = setInterval(this._pingConnectionCallback, this._delay);
  }

  getNextMessages() {
    this.send({
      type: 'get old',
      content: `${this._ofsetMessages}`
    });
  }

  close() {
    window.clearInterval(this._intervalId);
    this._soket.close();
  }

  send(data: MessageSocketData) {
    const serializeData = JSON.stringify(data);
    this._soket.send(serializeData);
  }
}
