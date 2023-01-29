import html from 'bundle-text:./SignUpPage.html';
import css from 'bundle-text:./SignUpPage.css';
import { handlers } from './handlers';

import { createPage } from '../../core';

export default createPage({ html, css, tagName: 'ypr-signup-page', handlers });
