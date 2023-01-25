import ChatPage from './ChatPage';
import SignUpPage from './SignUpPage';

import { Paths } from '../types';

export const routes = {
  [Paths.home]: ChatPage,
  [Paths.dev]: `<ypr-dev-page id="ypr-dev-page"></ypr-dev-page>`,
  [Paths.signIn]: `<ypr-signin-page></ypr-signin-page>`,
  [Paths.signUp]: SignUpPage,
  [Paths.error404]: `<ypr-404-page></ypr-404-page>`,
  [Paths.error500]: `<ypr-500-page></ypr-500-page>`
};
