import { MessageSocktEvents } from '../api/messages';
import { ApiChatsEvents } from '../api/chats';
import { LayoutEvents } from '../components/Layout';
import { ModalEvents } from '../components/Modal';
import { PageEvents } from '../types/Page';
import { BaseComponentEvents } from './BaseComponent';
import { StoreEvents } from './Store';
import { MessageInputEvents } from '../components/MessageInput';
import { FormEvents } from '../components/Form';

export type EventName =
  | keyof GlobalEventHandlersEventMap
  | 'logout'
  | `${StoreEvents}`
  | `${PageEvents}`
  | `${BaseComponentEvents}`
  | `${LayoutEvents}`
  | `${ApiChatsEvents}`
  | `${MessageSocktEvents}`
  | `${MessageInputEvents}`
  | `${FormEvents}`
  | `${ModalEvents}`;

export type Callback<T = unknown> = (...args: T[]) => void;
type ListenersList = Record<EventName, Callback[]>;

export class EventBus {
  private static _instance: EventBus = new EventBus();
  private _listeners = {} as ListenersList;

  constructor() {
    if (EventBus._instance) {
      this._error('Instantiation failed: Use EventBus.getInstance() instead of new.');
    }
    EventBus._instance = this;
  }

  private _error(msg?: string) {
    msg = `Error: ${msg}` || 'Error: EventBus';
    throw new Error(msg);
  }

  public static getInstance(): EventBus {
    return EventBus._instance;
  }

  on<T>(event: EventName, callback: Callback<T>) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off<T>(event: EventName, callback: Callback<T>) {
    if (!this._listeners[event]) {
      this._error(`Event ${event} not found`);
    }

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  emmit<T>(event: EventName, ...args: T[]) {
    if (!this._listeners[event]) {
      this._error(`Event ${event} not found`);
    }

    this._listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
