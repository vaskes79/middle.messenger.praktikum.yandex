import './components';
import './pages';
import { Paths } from './types';
import { Router } from './core';
import { setupRootEventListeners } from './initHandlers';
// import { API } from './api';

setupRootEventListeners();

Router.use(Paths.signIn)
  .use(Paths.signIn)
  .use(Paths.signUp)
  .use(Paths.chat, { private: 'true' })
  .use(Paths.dev)
  .start();

// API.auth.signUp({
//   first_name: 'Vasily',
//   second_name: 'Pterov',
//   login: 'vasily-petrov',
//   email: 'vasily-petrov@mail.com',
//   password: '1979dfcz',
//   phone: '+79111111111'
// });

// API.auth.signIn({
//   login: 'vasily-perov',
//   password: '1979dfcz'
// });

// API.auth.logout();
// API.auth.getUser();

// window.API = API;
