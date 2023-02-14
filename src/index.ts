import './components';
import './pages';
import { Paths } from './types';
import { Router } from './core';
import { setupRootEventListeners } from './initHandlers';

setupRootEventListeners();

Router.use(Paths.signIn)
  .use(Paths.signIn)
  .use(Paths.signUp)
  .use(Paths.chat, { private: 'true' })
  .use(Paths.dev)
  .start();
