import html from 'bundle-text:./Profile.html';
import css from 'bundle-text:./Profile.css';
import { BaseComponent, Store } from '../../core';
import { Input } from '../Input';
import { ProfileImg } from '../ProfileImg';
import { handlers } from './handlers';
import type { StoreProps, KeysOfUserDTO } from '../../types';
import type { ProfileData } from './types';
import { isEmpty } from '../../utils';

const tagName = 'ypr-profile';

export class Profile extends BaseComponent<ProfileData> {
  private _emailEl: Input;
  private _loginEl: Input;
  private _firstNameEl: Input;
  private _secondNameEl: Input;
  private _displayNameEl: Input;
  private _phoneEl: Input;
  private _avatarEl: ProfileImg;

  constructor() {
    super({ html, css, tagName, handlers });
    this._emailEl = this._root.querySelector('ypr-input[name=email]') as Input;
    this._loginEl = this._root.querySelector('ypr-input[name=login]') as Input;
    this._firstNameEl = this._root.querySelector('ypr-input[name=first_name]') as Input;
    this._secondNameEl = this._root.querySelector('ypr-input[name=second_name]') as Input;
    this._displayNameEl = this._root.querySelector('ypr-input[name=display_name]') as Input;
    this._phoneEl = this._root.querySelector('ypr-input[name=phone]') as Input;
    this._phoneEl = this._root.querySelector('ypr-input[name=phone]') as Input;
    this._avatarEl = this._root.querySelector('ypr-profile-input') as ProfileImg;
    this.data = Store.getState('user');
  }

  protected _mount() {
    this.data = Store.getState('user');
    this._updateData();
    this._eventBus.on('store:update', this._storeUpdateCallback);
    this._eventBus.on('profile:edit', this._handleEditProfile);
  }

  protected _unmount(): void {
    this.data = null;
    this._eventBus.off('store:update', this._storeUpdateCallback);
    this._eventBus.off('profile:edit', this._handleEditProfile);
  }

  private _storeUpdateCallback = (props: StoreProps) => {
    const {
      key,
      newState: { user }
    } = props;
    if (key === 'user' && user) {
      this.data = user;
      this._updateData();
    }
  };

  private _handleEditProfile = (props: { name: KeysOfUserDTO; value: string }) => {
    const { name, value } = props;

    if (this.data) {
      const isEdited = this.data[name] !== value;
      const editProfileData = Store.getState('editProfileData') || {};

      if (isEdited) {
        Store.setState('editProfileData', { ...editProfileData, [name]: value });
      }

      if (!isEdited) {
        delete editProfileData[name];
        if (isEmpty(editProfileData)) {
          Store.setState('editProfileData', null);
          return;
        }

        Store.setState('editProfileData', { ...editProfileData, [name]: value });
      }
    }
  };

  private _updateData() {
    if (this._data) {
      this._emailEl.setAttribute('value', this._data.email);
      this._loginEl.setAttribute('value', this._data.login);
      this._firstNameEl.setAttribute('value', this._data.first_name);
      this._secondNameEl.setAttribute('value', this._data.second_name);
      this._displayNameEl.setAttribute('value', this._data.display_name || 'Not Set');
      this._phoneEl.setAttribute('value', this._data.phone);
      if (this._data.avatar) {
        const avatarUrl = `https://ya-praktikum.tech/api/v2/resources${this._data.avatar}`;
        this._avatarEl.setAttribute('avatar', avatarUrl);
      }
    }
  }
}

export default customElements.define(tagName, Profile);
