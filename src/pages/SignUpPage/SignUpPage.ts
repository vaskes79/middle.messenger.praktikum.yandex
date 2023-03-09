import html from './SignUpPage.html';
import css from './SignUpPage.css';
import { handlers } from './handlers';
import { connectedCallbackMixin } from './connectedCallbackMixin';

import { createPage } from '../../core';

export default createPage({
  html,
  css,
  tagName: 'ypr-signup-page',
  handlers,
  connectedCallbackMixin
});
