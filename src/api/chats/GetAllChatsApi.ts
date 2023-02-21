import { BaseAPI } from '../../core';

export enum GetAllChatsApiEvents {
  apiGetAllChatsApiUpdate = 'api:chatlist:update'
}

export class GetAllChatsApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats', baseUrl);
  }

  async request() {
    const data = await this._http.GET(this._url);
    this._eventBus.emmit('api:chatlist:update', data);
  }
}
