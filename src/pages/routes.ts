import SettingsPage from './SettingsPage'
import ChatPage from './ChatPage'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import { Error404, Error500, PageNotFound } from './ErrorPages'

import { Paths } from '../types'

export const routes = {
  [Paths.home]: ChatPage,
  [Paths.settings]: SettingsPage,
  [Paths.signIn]: SignInPage,
  [Paths.signUp]: SignUpPage,
  [Paths.error404]: Error404(),
  [Paths.error500]: Error500(),
  [Paths.pageNotFound]: PageNotFound()
}
