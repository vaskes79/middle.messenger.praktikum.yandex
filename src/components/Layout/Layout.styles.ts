export const styles = `
<style>
    :host {
      margin: inherit;
    }

  .container {
    box-sizing: inherit;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid red;
  }

  .panel {
    width: 100%;
    height: inherit;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    transition: all 300ms ease;
    background: var(--blue-100);
    box-shadow: 2px 0px 2px 0px;
  }
  

  .chatlist {
    transform: translateX(-100vw);
    z-index: 1000;
  }

  .settings {
    transform: translateX(-100vw);
    z-index: 2000;
  }

  .chat {
    background: var(--gray-100);
  }


  .chatsettings {
    left: auto;
    right: 0;
    transform: translateX(100vw);
    z-index: 3000;
    box-shadow: -2px 0px 2px 0px;
  }

  header, 
  main, 
  footer {
      padding: 16px;
  }

  header {
    border-bottom: 1px solid red;
  }

  main {
    overflow-y: auto;
    flex-basis: 100%;
  }

  footer {
    border-top: 1px solid red;
  }

  .panel--open {
    transform: translateX(0);
  }


  @media (min-width: 700px) {
    .chatlist,
    .settings,
    .chatsettings {
      width: 320px;
    }
    .chatlist {
      transform: translateX(0);
    }
    .chat {
      margin-left: 320px;
    }
  }

    slot[name=chat-header]::slotted(h2) {
margin: 0 !important;
color:red;
    }
</style>
`
