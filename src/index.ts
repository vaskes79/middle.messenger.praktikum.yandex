import './components';
import './pages';
import { Paths } from './types';
import { setupRootEventListeners } from './initHandlers';
import { Router } from './core';

setupRootEventListeners();

Router.use(Paths.signIn)
  .use(Paths.signIn)
  .use(Paths.signUp)
  .use(Paths.chat, { private: 'true' })
  .use(Paths.dev)
  .start();
