import html from 'bundle-text:./SignInPage.html';
import css from 'bundle-text:./SignInPage.css';
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
