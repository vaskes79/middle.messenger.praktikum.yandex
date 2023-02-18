import { EventBus } from './EventBus';
import { HTTPTransport, Options } from './HTTPTransport';
import type { EventBus as EventBusType } from './EventBus';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export abstract class BaseAPI {
  protected _eventBus: EventBusType = EventBus.getInstance();
  protected _http: typeof HTTPTransport = HTTPTransport;
  protected _url = '';

  constructor(url: string, baseURL?: string) {
    baseURL = baseURL || BASE_URL;
    this._url = `${baseURL}${url}`;
  }

  create(data: unknown) {
    console.log(data);
    throw new Error('Not implemented');
  }

  request<Req = undefined>(opt?: Options<Req>) {
    console.log(opt);
    throw new Error('Not implemented');
  }

  update() {
    throw new Error('Not implemented');
  }

  delete() {
    throw new Error('Not implemented');
  }
}
