import html from 'bundle-text:./Profile.html';
import css from 'bundle-text:./Profile.css';
import { BaseComponent, Store } from '../../core';
import { Input } from '../Input';

const tagName = 'ypr-profile';

export class Profile extends BaseComponent {
  private _emailEl: Input;
  private _loginEl: Input;
  private _firstNameEl: Input;
  private _secondNameEl: Input;
  private _displayNameEl: Input;
  private _phoneEl: Input;

  constructor() {
    super({ html, css, tagName });
    this._emailEl = this._root.querySelector('ypr-input[name=email]') as Input;
    this._loginEl = this._root.querySelector('ypr-input[name=login]') as Input;
    this._firstNameEl = this._root.querySelector('ypr-input[name=first_name]') as Input;
    this._secondNameEl = this._root.querySelector('ypr-input[name=second_name]') as Input;
    this._displayNameEl = this._root.querySelector('ypr-input[name=display_name]') as Input;
    this._phoneEl = this._root.querySelector('ypr-input[name=phone]') as Input;
  }

  protected _mount() {
    this._eventBuss.on('store:update', () => {
      const user = Store.getState('user');
      if (user) {
        this._emailEl.setAttribute('value', user.email);
        this._loginEl.setAttribute('value', user.login);
        this._firstNameEl.setAttribute('value', user.first_name);
        this._secondNameEl.setAttribute('value', user.second_name);
        this._displayNameEl.setAttribute('value', user.display_name || 'Not Set');
        this._phoneEl.setAttribute('value', user.phone);
      }
    });
  }
}

export default customElements.define(tagName, Profile);
