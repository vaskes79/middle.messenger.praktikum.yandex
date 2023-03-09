import { BaseAPI, OptionsWithoutMethod, HEADERS } from '../../core';

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
    dataDTO.headers = {
      [HEADERS.CONTENT_TYPE]: HEADERS.JSON
    };
    const data = await this._http.DELETE<Data>(this._url, dataDTO);
    console.log('DeleteUserFromChatApi: ', data);
  }
}
