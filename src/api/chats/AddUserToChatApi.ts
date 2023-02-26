import { BaseAPI, OptionsWithoutMethod } from '../../core';

type Data = {
  users: number[];
  chatId: number;
};

export type AddUserToChatDTO = OptionsWithoutMethod<Data>;

export class AddUserToChatApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats/users', baseUrl);
  }

  async update(chatDTO: AddUserToChatDTO) {
    const data = await this._http.PUT<Data>(this._url, chatDTO);
    console.log('AddUserToChatDTO: ', data);
  }
}
