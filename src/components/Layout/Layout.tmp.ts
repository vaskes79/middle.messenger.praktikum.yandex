import { styles } from './Layout.styles';

export const tmpl = document.createElement('template');

tmpl.innerHTML = `
${styles}
<div class="container">
    <div class="panel chatlist">
      <header>
        <slot name="chatlist-header"><h1>chatlist slot</h1></slot>
      </header>
      <main>
        <slot name="chatlist-main">Chatlist slot</slot>
      </main>
      <footer>
        <slot name="chatlist-footer">
           <button type="button">footer</button>
        </slot>
      </footer>
    </div>

    <div class="panel settings">
      <header>
        <slot name="settings-header"><h1>settings slot</h1></slot>
      </header>
      <main>
        <slot name="settings-main">Settings slot</slot>
      </main>
      <footer>
        <slot name="settings-footer">
           <button type="button">footer</button>
        </slot>
      </footer>
    </div>

    <div class="panel chat">
      <header>
        <slot name="chat-header">
          <h1>Chat</h1>
        </slot>
      </header>
      <main>
        <slot name="chat-main">Chatlist slot</slot>
      </main>
      <footer>
        <slot name="chat-footer">
           <button type="button">footer</button>
        </slot>
      </footer>
    </div>

    <div class="panel chatsettings">
      <header>
        <slot name="chatsettings-header">
          <h1>Chat settings</h1>
        </slot>
      </header>
      <main>
        <slot name="chatsettings-main">Chat settings slot</slot>
      </main>
      <footer>
        <slot name="chatsettings-footer">
           <button type="button">footer</button>
        </slot>
      </footer>
    </div>
</div>
`
