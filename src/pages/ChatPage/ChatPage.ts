import html from "bundle-text:./ChatPage.html";
import css from "bundle-text:./ChatPage.css";

const tmpl = `<style>${css}</style>${html}`;

function buildChatPage() {
  return tmpl;
}

export function ChatPage() {
  return buildChatPage();
}
