import { Chat } from '../../types';
import { BaseAPI, Store } from '../../core';

export enum GetAllChatsApiEvents {
  apiGetAllChatsApiUpdate = 'api:chatlist:update'
}

export class GetAllChatsApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats?limit=100', baseUrl);
  }

  async request() {
    const data = await this._http.GET<undefined, Chat[]>(this._url);
    if (data?.length) {
      Store.setState('chatList', data);
    }
  }
}
