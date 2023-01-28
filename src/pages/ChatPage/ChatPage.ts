import { createPage } from '../../core';

import html from 'bundle-text:./ChatPage.html';
import css from 'bundle-text:./ChatPage.css';
import {
  chatListHandlers,
  chatSettingsHandlers,
  clearChatHandler,
  generateContentHandler,
  settingsPanelHandlers
} from './handlers';

function connectedCallbackMixin(root: ShadowRoot) {
  generateContentHandler(root);
  settingsPanelHandlers(root);
  chatListHandlers(root);
  chatSettingsHandlers(root);
  clearChatHandler(root);
}

export default createPage({ html, css, tagName: 'ypr-chat-page', connectedCallbackMixin });
