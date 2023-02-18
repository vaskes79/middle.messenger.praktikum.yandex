import { BaseAPI } from '../../core';
import type { UserLoginDTO } from '../../types';

export class SignInApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signin', baseUrl);
  }

  async create(userData: UserLoginDTO): Promise<void> {
    const data = await this._http.POST<UserLoginDTO, void>(this._url, { data: userData });
    console.log('SignInApi: ', data);
  }
}
