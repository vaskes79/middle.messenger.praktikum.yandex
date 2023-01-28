import html from 'bundle-text:./DevPage.html';
import { createPage } from '../../core';
import { attributeChangedCallback } from './attributeChangedCallback';
import { handlers } from './handlers';

export default createPage({
  html,
  tagName: 'ypr-dev-page',
  handlers,
  attributes: ['id', 'protected'],
  attributeChangedCallback,
  connectedCallbackMixin: () => {
    console.log('connectedCallbackMixin ypr-dev-page');
  },
  disconnectedCallbackMixin: () => {
    console.log('disconnectedCallbackMixin ypr-dev-page');
  }
});
