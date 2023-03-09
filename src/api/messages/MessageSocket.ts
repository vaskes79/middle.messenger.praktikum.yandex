import { mapMessageResToMessageItemData } from '../../pages/ChatPage/utils';
import { BaseError, EventBus, Store } from '../../core';
import { MessageItemListRes } from '../../types';
import { MessageItemsData, MessageSocketData } from './types';

export class MessageSocket {
  private _soket: WebSocket;
  private _handleError: BaseError;
  private _intervalId: ReturnType<typeof setInterval>;
  private _delay = 30000;
  private _ofsetMessages = 0;
  private _eventBus: EventBus;

  constructor() {
    const wsUrl = Store.getState('currentChatWSLink');
    this._handleError = new BaseError('ConnectToChatApi');
    this._eventBus = EventBus.getInstance();

    if (typeof wsUrl === 'string') {
      this._soket = new WebSocket(wsUrl);
      this._setupOpenListener();
      this._setupCloseListener();
      this._setupErrorHandling();
      this._setupMessageListener();
      this._pingConnection();
    } else {
      console.error(wsUrl);
      this._handleError.error('incorrect url connection WebSocket');
    }
  }

  private _setupOpenListener() {
    this._soket.addEventListener('open', () => {
      this.getNextMessages();
      this._eventBus.emmit('ws:open', this);
    });
  }

  private _setupCloseListener() {
    this._soket.addEventListener('close', (event) => {
      if (event.wasClean) {
        this._eventBus.emmit('ws:close');
      } else {
        this._eventBus.emmit('ws:close');
      }
    });
  }

  private _updateMessageHandler(newMsg: MessageItemsData) {
    const lastId = newMsg.slice(-1)[0]?.id;

    if (lastId) {
      this._ofsetMessages = lastId;
      const msgItemData = mapMessageResToMessageItemData(newMsg as MessageItemListRes);
      this._eventBus.emmit('ws:message:list', msgItemData);
    }
  }

  private _setupMessageListener() {
    this._soket.addEventListener('message', (rawData: MessageEvent) => {
      const data = JSON.parse(rawData.data);
      if (Array.isArray(data)) {
        this._updateMessageHandler(data);
      }
      if (data.type === 'message') {
        this._updateMessageHandler([data]);
      }
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
