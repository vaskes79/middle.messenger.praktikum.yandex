import SettingsPage from './SetingsPage'
import ChatPage from './ChatPage'
import { Paths } from '../types'
import { SignUp, SignIn, Error404, Error500, PageNotFound } from './constants'

export const routes = {
  [Paths.home]: ChatPage,
  [Paths.settings]: SettingsPage,
  [Paths.signIn]: SignIn,
  [Paths.signUp]: SignUp,
  [Paths.error404]: Error404,
  [Paths.error500]: Error500,
  [Paths.pageNotFound]: PageNotFound
}
