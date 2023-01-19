import html from 'bundle-text:./Menu.html';

export class Menu extends HTMLElement {
  _btnEl: HTMLButtonElement;
  _backDropEl: HTMLElement;
  _menuListEl: HTMLUListElement;
  _removeEventListeners: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._btnEl = this.shadowRoot.getElementById('btn') as HTMLButtonElement;
      this._backDropEl = this.shadowRoot.querySelector('.backdrop') as HTMLElement;
      this._menuListEl = this.shadowRoot.querySelector('.menu-list') as HTMLUListElement;
    }
  }

  connectedCallback() {
    this._removeEventListeners = this._addEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _btnClickHandler = (e: Event) => {
    console.log(e);
    this.openMenu();
  };

  _backDropClickHandler = (e: Event) => {
    console.log(e);
    this.closeMenu();
  };

  _addEventListeners = () => {
    this._btnEl.addEventListener('click', this._btnClickHandler);
    this._backDropEl.addEventListener('click', this._backDropClickHandler);
    this._menuListEl.addEventListener('click', this._backDropClickHandler);
    return () => {
      this._btnEl.removeEventListener('click', this._btnClickHandler);
      this._backDropEl.removeEventListener('click', this._backDropClickHandler);
      this._menuListEl.removeEventListener('click', this._backDropClickHandler);
    };
  };

  public openMenu() {
    this._menuListEl.classList.add('menu-list--open');
    this._backDropEl.classList.add('backdrop--open');
  }

  public closeMenu() {
    this._menuListEl.classList.remove('menu-list--open');
    this._backDropEl.classList.remove('backdrop--open');
  }
}

export default customElements.define('ypr-menu', Menu);
