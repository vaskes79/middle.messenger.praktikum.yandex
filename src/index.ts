import './components';
import './pages';
import { Paths } from './types';
import { routes } from './pages';
import { checkExistPath } from './utils';
import { setupRootEventListeners } from './initHandlers';

setupRootEventListeners();

const root = document.getElementById('root');
const path = window.location.pathname;
const pathExist = checkExistPath(path);

if (root) {
  if (pathExist) {
    root.insertAdjacentHTML('afterbegin', routes[path as Paths]);
  }

  if (!pathExist) {
    root.insertAdjacentHTML('afterbegin', routes[Paths.error404]);
  }
}
