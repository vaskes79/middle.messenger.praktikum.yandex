import { BaseAPI, OptionsWithoutMethod } from '../../core';

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
    const data = await this._http.PUT(this._url, dataDTO);
    console.log('UserPasswordUpdateDTO: ', data);
  }
}
