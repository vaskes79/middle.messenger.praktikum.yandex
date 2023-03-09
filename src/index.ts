import './api';
import './components';
import './pages';
import './index.css';
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
