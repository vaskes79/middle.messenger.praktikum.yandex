import { createPage } from '../../core';
import html from './ChatPage.html';
import css from './ChatPage.css';
import { handlers } from './handlers';
import { connectedCallbackMixin } from './connectedCallbackMixin';

export default createPage({
  html,
  css,
  tagName: 'ypr-chat-page',
  handlers,
  connectedCallbackMixin
});
