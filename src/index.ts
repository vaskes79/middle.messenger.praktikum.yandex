import './api';
import './components';
import './pages';
import { Paths } from './types';
import { Router, Store } from './core';
import { setupRootEventListeners } from './initHandlers';

// for Debug api
import { API } from './api';

// for Debug api
//
window.api = API;

window.store = Store;

setupRootEventListeners();

Router.use(Paths.signIn)
  .use(Paths.signIn)
  .use(Paths.signUp)
  .use(Paths.chat, { private: 'true' })
  .use(Paths.dev)
  .start();
