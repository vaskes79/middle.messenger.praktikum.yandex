import { Chat } from './modules/chat'

console.log("entry point")

const root = document.getElementById("root")

if (root) {
  root.insertAdjacentHTML("afterbegin", Chat())
}
