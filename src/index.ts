import './components';
import './pages';
import { Paths } from './types';
import { BaseComponentEvents, EventBus } from './core';
import { routes } from './pages';
import { checkExistPath, cretaDemoContent } from './utils';

const eventBus = EventBus.getInstance();
const root = document.getElementById('root');
const path = window.location.pathname;
const pathExist = checkExistPath(path);

eventBus.on(BaseComponentEvents.MOUNT, (name: string) => {
  console.log(`Component ${name} MOUNT`);
});

eventBus.on(BaseComponentEvents.UNMOUNT, (name: string) => {
  console.log(`Component ${name} UNMOUNT`);
});

if (root) {
  if (pathExist) {
    root.insertAdjacentHTML('afterbegin', routes[path as Paths]);
  }

  if (!pathExist) {
    root.insertAdjacentHTML('afterbegin', routes[Paths.error404]);
  }
}

cretaDemoContent();
