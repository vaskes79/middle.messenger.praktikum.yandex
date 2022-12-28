import { Chat } from '../feature/chat'
import { Paths } from './Paths'

const SignIn = `<h1>SignIn</h1>`
const SignUp = `<h1>SignUp</h1>`
const Settings = `<h1>Settings</h1>`
const Error404 = `<h1>Error 404</h1>`
const Error500 = `<h1>Error 500</h1>`
const PageNotFound = `<h1>Page Not Found</h1>`

export const routes = {
  [Paths.home]: Chat(),
  [Paths.signIn]: SignIn,
  [Paths.signUp]: SignUp,
  [Paths.settings]: Settings,
  [Paths.error404]: Error404,
  [Paths.error500]: Error500,
  [Paths.pageNotFound]: PageNotFound
}
