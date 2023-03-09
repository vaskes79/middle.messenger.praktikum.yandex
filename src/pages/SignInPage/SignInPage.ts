import html from './SignInPage.html';
import css from './SignInPage.css';
import { createPage } from '../../core';
import { handlers } from './handlers';
import { connectedCallbackMixin } from './connectedCallbackMixin';

export default createPage({
  html,
  css,
  tagName: 'ypr-signin-page',
  handlers,
  connectedCallbackMixin
});
