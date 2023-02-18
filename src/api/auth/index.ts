import { SignUpApi, SignUpDTO } from './SignUpApi';
import { SignInApi, SignInDTO } from './SignInApi';
import { LogoutApi } from './LogoutApi';
import { GetUserApi } from './GetUserApi';

export const auth = {
  signUp: (userData: SignUpDTO) => new SignUpApi().create(userData),
  signIn: (userData: SignInDTO) => new SignInApi().create(userData),
  logout: () => new LogoutApi().create(),
  getUser: () => new GetUserApi().request()
};
