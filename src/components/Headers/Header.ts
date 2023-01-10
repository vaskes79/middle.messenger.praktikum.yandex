class ChatlistHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
        h2 {
          margin: 0;
        }
        .title-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .actions-container {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
          flex-basis: 100%;
        }
        .search {
          width: 100%;
        }
        .search input {
          width: 100%;
          box-sizing: border-box;
          font-size: 1rem;
          background: transparent;
          border: transparent;
          border-bottom: 1px solid var(--gray-500);
        }
      </style>
      <div class="container">
        <div class="title-container">
          <h2>
            <slot name="title">Title</slot>
          </h2>
          <div class="actions-container">
            <slot name="actions">
              <label class="search">
                <input type="text" placeholder="Search" />
              </label>
            </slot>
            <slot name="menu">⫶</slot>
          </div>
        </div>
        <div class="tabs-container">
          <slot name="tabs"></slot>
        </div>
      </div>
    `
    }
  }
}

export default customElements.define('ypr-header', ChatlistHeader);
