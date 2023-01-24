import { ChatPageEvent } from '../pages/ChatPage/ChatPage';

export type EventName =
  | keyof GlobalEventHandlersEventMap
  | `${ChatPageEvent}`
  | 'open:modal'
  | 'close:modal';
export type Callback<T = any> = (...args: T[]) => void;
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
