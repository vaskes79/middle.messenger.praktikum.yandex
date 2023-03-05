import { BaseAPI, OptionsWithoutMethod, HEADERS } from '../../core';
import { ErrorRes } from '../../types';

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
    try {
      const data = await this._http.PUT(this._url, dataDTO);
      if (data === 'OK') {
        this._eventBus.emmit('profile:password:update:success');
      }
    } catch (error) {
      const errorUpdatePassword = error as ErrorRes;
      this._eventBus.emmit('profile:password:update:error', errorUpdatePassword);
    }
  }
}
