import './components';
import './pages';
import { Paths } from './types';
import { Router } from './core';
import { setupRootEventListeners } from './initHandlers';
import { API } from './api';

setupRootEventListeners();

Router.use(Paths.signIn)
  .use(Paths.signIn)
  .use(Paths.signUp)
  .use(Paths.chat, { private: 'true' })
  .use(Paths.dev)
  .start();

API.signUp.create({
  first_name: 'Vasily',
  second_name: 'Perov',
  login: 'vasily-perov',
  email: 'vasily-perov@mail.com',
  password: '1979dfcz',
  phone: '+79111111111'
});
