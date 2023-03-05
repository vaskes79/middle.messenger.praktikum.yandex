import { BaseAPI, OptionsWithoutMethod, HEADERS } from '../../core';

export type UserPasswordChangeData = {
  oldPassword: string;
  newPassword: string;
};

export type UserPasswordUpdateDTO = OptionsWithoutMethod<UserPasswordChangeData>;

export class UserPasswordUpdateApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/user/password', baseUrl);
  }

  async update(dataDTO: UserPasswordUpdateDTO) {
    dataDTO.headers = {
      [HEADERS.CONTENT_TYPE]: HEADERS.JSON
    };
    const data = await this._http.PUT(this._url, dataDTO);
    console.log('UserPasswordUpdateDTO: ', data);
  }
}
