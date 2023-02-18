import { UserDTO } from '../../types';
import { BaseAPI, OptionsWithoutMethod } from '../../core';

export type UpdateUserDTO = OptionsWithoutMethod<Partial<UserDTO>>;

export class UserProfileApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/user/profile', baseUrl);
  }

  async update(dataDTO: UpdateUserDTO): Promise<void> {
    const data = await this._http.PUT(this._url, dataDTO);
    console.log('UserProfileApi: ', data);
  }
}
