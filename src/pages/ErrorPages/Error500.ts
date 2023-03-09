import html from './Error500.html';
import { createPage } from '../../core';

export default createPage({
  html,
  tagName: 'ypr-500-page',
  attributes: ['id', 'protected']
});
