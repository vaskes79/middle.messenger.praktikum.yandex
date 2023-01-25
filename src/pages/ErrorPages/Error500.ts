import html from 'bundle-text:./Error500.html';
import { createPage } from '../../core/CreatePage';

export default createPage({
  html,
  tagName: 'ypr-500-page',
  attributes: ['id', 'protected']
});
