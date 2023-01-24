import ChatPage from './ChatPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import { Error404, Error500 } from './ErrorPages';

import { Paths } from '../types';

export const routes = {
  [Paths.home]: ChatPage,
  [Paths.dev]: `<ypr-dev-page id="ypr-dev-page"></ypr-dev-page>`,
  [Paths.signIn]: SignInPage,
  [Paths.signUp]: SignUpPage,
  [Paths.error404]: Error404(),
  [Paths.error500]: Error500()
};
