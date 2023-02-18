import { SignUpApi } from './SignUpApi';
import { SignInApi } from './SignInApi';
import { LogoutApi } from './LogoutApi';
import { GetUserApi } from './GetUserApi';

import { UserDTO, UserLoginDTO } from '../types';

export const API = {
  auth: {
    signUp: (userData: UserDTO) => new SignUpApi().create(userData),
    signIn: (userData: UserLoginDTO) => new SignInApi().create(userData),
    logout: () => new LogoutApi().create(),
    getUser: () => new GetUserApi().request()
  }
};
