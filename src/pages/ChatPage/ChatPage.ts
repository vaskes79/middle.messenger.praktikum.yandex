import { createPage } from '../../core';
import html from 'bundle-text:./ChatPage.html';
import css from 'bundle-text:./ChatPage.css';
import { handlers } from './handlers';
import { connectedCallbackMixin } from './connectedCallbackMixin';

export default createPage({
  html,
  css,
  tagName: 'ypr-chat-page',
  handlers,
  connectedCallbackMixin
});
