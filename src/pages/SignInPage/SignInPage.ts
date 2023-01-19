import html from 'bundle-text:./SignInPage.html';
import css from 'bundle-text:./SignInPage.css';

const tmpl = `<style>${css}</style>${html}`;

function buildPage() {
  return tmpl;
}

export function SignInPage() {
  return buildPage();
}
