import html from 'bundle-text:./Error.html';
import { createPage } from '../../core/CreatePage';

export default createPage({
  html,
  tagName: 'ypr-404-page',
  attributes: ['id', 'protected']
});
