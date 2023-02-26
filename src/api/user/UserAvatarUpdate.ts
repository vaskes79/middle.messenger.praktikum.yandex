import type { UserDTO } from '../../types';
import { BaseAPI, OptionsWithoutMethod } from '../../core';

type UserAvatarRes = UserDTO & {
  id: number;
  avatar: string;
};

type Data = {
  formData: FormData;
};

export type UserAvatarUpdateDTO = OptionsWithoutMethod<Data>;

export class UserAvatarUpdateApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/user/profile/avatar', baseUrl);
  }

  async update(dataDTO: UserAvatarUpdateDTO) {
    const data = await this._http.PUT<Data, UserAvatarRes>(this._url, dataDTO);
    console.log('UserAvatarUpdate: ', data);
  }
}
