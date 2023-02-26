import { BaseAPI, BASE_WS_URL, Store } from '../../core';
import type { User } from '../../types';

export class GetWSConnectLinkApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super(`/chats/token/`, baseUrl);
  }

  async request(chatId: string) {
    const data = await this._http.POST<undefined, { token: string }>(this._url + chatId, {});

    if (data.token) {
      const user = Store.getState('user') as User;

      const wsChatUrl = `${BASE_WS_URL}/${user.id}/${chatId}/${data.token}`;
      Store.setState('currentChatWSLink', wsChatUrl);
    }
  }
}
