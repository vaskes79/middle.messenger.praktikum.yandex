import './components';
import { routes } from './pages'
import { Paths } from './types'
import { checkExistPath, cretaDemoContent } from './utils'


const root = document.getElementById("root")
const path = window.location.pathname;
const pathExist = checkExistPath(path);

if (root) {
  if (pathExist) {
    root.insertAdjacentHTML("afterbegin", routes[path])
  }

  if (!pathExist) {
    root.insertAdjacentHTML("afterbegin", routes[Paths.error404])
  }
}

cretaDemoContent();
