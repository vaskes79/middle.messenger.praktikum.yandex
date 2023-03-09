import html from './Error.html';
import { createPage } from '../../core';

export default createPage({
  html,
  tagName: 'ypr-404-page',
  attributes: ['id', 'protected']
});
