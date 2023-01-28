import html from 'bundle-text:./Menu.html';
import css from 'bundle-text:./Menu.css';
import { BaseComponent } from '../../core';
import { handlers } from './handlers';

const tagName = 'ypr-menu';

export class Menu extends BaseComponent {
  _btnEl: HTMLButtonElement;
  _backDropEl: HTMLElement;
  _menuListEl: HTMLUListElement;
  _removeEventListeners: () => void;

  constructor() {
    super({ html, css, tagName, handlers });
    this._btnEl = this._root.getElementById('btn') as HTMLButtonElement;
    this._backDropEl = this._root.querySelector('.backdrop') as HTMLElement;
    this._menuListEl = this._root.querySelector('.menu-list') as HTMLUListElement;
  }

  public openMenu() {
    this._menuListEl.classList.add('menu-list--open');
    this._backDropEl.classList.add('backdrop--open');
  }

  public closeMenu() {
    this._menuListEl.classList.remove('menu-list--open');
    this._backDropEl.classList.remove('backdrop--open');
  }
}

export default customElements.define(tagName, Menu);
