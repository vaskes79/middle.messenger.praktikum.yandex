import html from 'bundle-text:./ChatPage.html';
import css from 'bundle-text:./ChatPage.css';

import { createPage } from '../../core';

export default createPage({ html, css, tagName: 'ypr-chat-page' });
