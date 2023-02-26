import { EventBus } from './EventBus';
import { HTTPTransport, OptionsWithoutMethod } from './HTTPTransport';
import { Store } from './Store';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const BASE_WS_URL = 'wss://ya-praktikum.tech/ws/chats';

export interface BaseAPIInterface {
  request?(opt?: OptionsWithoutMethod<unknown>): Promise<void>;
  create?(data?: OptionsWithoutMethod<unknown>): Promise<void>;
  update?(data: OptionsWithoutMethod<unknown>): Promise<void>;
  delete?(opt?: OptionsWithoutMethod<unknown>): Promise<void>;
}

export abstract class BaseAPI {
  protected _url: string;
  protected _eventBus: EventBus;
  protected _http: typeof HTTPTransport;
  protected _store: typeof Store;

  constructor(url: string, baseURL?: string) {
    baseURL = baseURL || BASE_URL;
    this._url = `${baseURL}${url}`;
    this._eventBus = EventBus.getInstance();
    this._http = HTTPTransport;
    this._store = Store;
  }
}
