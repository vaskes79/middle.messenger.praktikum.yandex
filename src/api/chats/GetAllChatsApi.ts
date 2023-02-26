import { Chat, ErrorRes } from '../../types';
import { BaseAPI, Store } from '../../core';

export enum GetAllChatsApiEvents {
  apiGetAllChatsApiUpdate = 'api:chatlist:update'
}

export class GetAllChatsApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats', baseUrl);
  }

  async request() {
    try {
      const data = await this._http.GET<undefined, Chat[]>(this._url);
      if (data?.length) {
        Store.setState('chatList', data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
