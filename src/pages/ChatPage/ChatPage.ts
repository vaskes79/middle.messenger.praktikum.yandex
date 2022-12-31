import { chatList } from "./ChatData";

function buildChatPage(data: { imgurl: string, name: string }) {
  return `
    <div>
        <h2>ChatList</h2>
        <ypr-avatar imgurl="${data.imgurl}" name="${data.name}"></ypr-avatar>
    </div>
  `
}

export function ChatPage() {
  return buildChatPage(chatList);
}
