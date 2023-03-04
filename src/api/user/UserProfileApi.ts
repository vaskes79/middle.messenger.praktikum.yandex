import { UserDTO, ErrorRes } from '../../types';
import { BaseAPI, OptionsWithoutMethod } from '../../core';

export type UpdateUserDTO = OptionsWithoutMethod<Partial<UserDTO>>;

export class UserProfileApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/user/profile', baseUrl);
  }

  async update(dataDTO: UpdateUserDTO) {
    try {
      const data = await this._http.PUT(this._url, dataDTO);
      this._eventBus.emmit('profile:save:success', data);
    } catch (error: unknown) {
      const userUpdateError = error as ErrorRes;
      this._eventBus.emmit('profile:save:error', userUpdateError);
    }
  }
}
