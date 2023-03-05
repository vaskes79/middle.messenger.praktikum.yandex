import type { User, ErrorRes } from '../../types';
import { BaseAPI, OptionsWithoutMethod } from '../../core';

type Data = FormData;

export type UserAvatarUpdateDTO = OptionsWithoutMethod<Data>;

export class UserAvatarUpdateApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/user/profile/avatar', baseUrl);
  }

  async update(dataDTO: UserAvatarUpdateDTO) {
    try {
      const data = await this._http.PUT<Data, User>(this._url, dataDTO);
      this._eventBus.emmit('profile:save:avatar', data);
    } catch (error) {
      const userUpdateError = error as ErrorRes;
      this._eventBus.emmit('profile:save:avatar:error', userUpdateError);
    }
  }
}
