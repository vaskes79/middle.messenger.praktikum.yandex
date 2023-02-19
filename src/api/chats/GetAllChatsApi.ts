import { BaseAPI } from '../../core';

export class GetAllChatsApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats', baseUrl);
  }

  async request() {
    const data = await this._http.GET(this._url);
    console.log('GetAllChats: ', data);
  }
}
