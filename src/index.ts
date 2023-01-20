import './components';
import { EventBus } from './core';
import { routes } from './pages';
import { ChatPageEvent } from './pages/ChatPage/ChatPage';
import { Paths } from './types';
import { checkExistPath, cretaDemoContent } from './utils';

const root = document.getElementById('root');
const path = window.location.pathname;
const pathExist = checkExistPath(path);

if (root) {
  if (pathExist) {
    root.insertAdjacentHTML('afterbegin', routes[path as Paths]);
    const eventBus = EventBus.getInstance();

    const obj = {
      route: '/',
      value: 1
    };

    eventBus.emmit(ChatPageEvent.CHATPAGE_MOUNT, obj);
  }

  if (!pathExist) {
    root.insertAdjacentHTML('afterbegin', routes[Paths.error404]);
  }
}

cretaDemoContent();
