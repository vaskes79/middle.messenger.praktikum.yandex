import { BaseAPI, OptionsWithoutMethod } from '../../core';

type Data = {
  users: number[];
  chatId: number;
};

export type DeleteUserFromChatDTO = OptionsWithoutMethod<Data>;

export class DeleteUserFromChatApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats/users', baseUrl);
  }

  async delete(dataDTO: DeleteUserFromChatDTO) {
    const data = await this._http.DELETE<Data>(this._url, dataDTO);
    console.log('DeleteUserFromChatApi: ', data);
  }
}
