import { BaseAPI, Store } from '../../core';

export class GetCurrentChatTokenApi extends BaseAPI {
  constructor(chatId: number, baseUrl?: string) {
    super(`/chats/token/${chatId}`, baseUrl);
  }

  async request() {
    const data = await this._http.POST<undefined, { token: string }>(this._url, {});

    if (data.token) {
      Store.setState('chatToken', data.token);
    }
  }
}
