import { defineComponents } from './components';
import { routes, checkExistPath, Paths } from './pages'


const root = document.getElementById("root")
const path = window.location.pathname;
const pathExist = checkExistPath(path);

defineComponents();

if (root) {
  if (pathExist) {
    root.insertAdjacentHTML("afterbegin", routes[path])
  }

  if (!pathExist) {
    root.insertAdjacentHTML("afterbegin", routes[Paths.pageNotFound])
  }
}
