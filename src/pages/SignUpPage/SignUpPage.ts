import html from "bundle-text:./SignUpPage.html";
import css from "bundle-text:./SignUpPage.css";

const tmpl = `<style>${css}</style>${html}`;

function buildPage() {
  return tmpl;
}

export function SignUpPage() {
  return buildPage();
}
