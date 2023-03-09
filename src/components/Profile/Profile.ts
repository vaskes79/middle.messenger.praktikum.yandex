import html from './Profile.html';
import css from './Profile.css';
import { BaseComponent, Store } from '../../core';
import { Input } from '../Input';
import { ProfileImg } from '../ProfileImg';
import { handlers } from './handlers';
import type { StoreProps, KeysOfUserDTO, User } from '../../types';
import { UpdateUserDTO } from '../../api/user';
import type { ProfileData } from './types';
import { isEmpty } from '../../utils';
import { API } from '../../api';
import { isPasswordFields } from './utils';

const tagName = 'ypr-profile';

export class Profile extends BaseComponent<ProfileData> {
  private _emailEl: Input;
  private _loginEl: Input;
  private _firstNameEl: Input;
  private _secondNameEl: Input;
  private _displayNameEl: Input;
  private _phoneEl: Input;
  private _oldPasswdEl: Input;
  private _newPasswdEl: Input;
  private _newConfirmPasswdEl: Input;
  private _avatarEl: ProfileImg;
  private _passwordUpdate = false;

  constructor() {
    super({ html, css, tagName, handlers });
    this._emailEl = this._root.querySelector('ypr-input[name=email]') as Input;
    this._loginEl = this._root.querySelector('ypr-input[name=login]') as Input;
    this._firstNameEl = this._root.querySelector('ypr-input[name=first_name]') as Input;
    this._secondNameEl = this._root.querySelector('ypr-input[name=second_name]') as Input;
    this._displayNameEl = this._root.querySelector('ypr-input[name=display_name]') as Input;
    this._phoneEl = this._root.querySelector('ypr-input[name=phone]') as Input;
    this._phoneEl = this._root.querySelector('ypr-input[name=phone]') as Input;
    this._oldPasswdEl = this._root.querySelector('ypr-input[name=oldPassword]') as Input;
    this._newPasswdEl = this._root.querySelector('ypr-input[name=newPassword]') as Input;
    this._newConfirmPasswdEl = this._root.querySelector(
      'ypr-input[name=newPasswordConfirm]'
    ) as Input;
    this._avatarEl = this._root.querySelector('ypr-profile-input') as ProfileImg;
    this.data = Store.getState('user');
  }

  protected _mount() {
    this.data = Store.getState('user');
    this._updateData();
    this._eventBus.on('store:update', this._storeUpdateCallback);
    this._eventBus.on('profile:edit', this._handleEditProfile);
    this._eventBus.on('profile:edit:cancel', this._cancelEditCallback);
    this._eventBus.on('profile:password:update:success', this._cancelEditCallback);

    this._eventBus.on('profile:password:update:is_posible', () =>
      this._passwordUpdateCallback(true)
    );
    this._eventBus.on('profile:password:update:is_not_posible', () =>
      this._passwordUpdateCallback(false)
    );

    this._eventBus.on('profile:update:request', this._requestUpdateProfileManager);
    this._eventBus.on('profile:update:success', this._saveProfileSuccessCallback);
    this._eventBus.on('profile:update:error', this._errorSaveProfileCallaback);
  }

  protected _unmount(): void {
    this.data = null;
    this._eventBus.off('store:update', this._storeUpdateCallback);
    this._eventBus.off('profile:edit', this._handleEditProfile);
    this._eventBus.off('profile:edit:cancel', this._cancelEditCallback);

    this._eventBus.on('profile:update:request', this._requestUpdateProfileManager);
    this._eventBus.off('profile:update:success', this._saveProfileSuccessCallback);
    this._eventBus.off('profile:update:error', this._errorSaveProfileCallaback);

    this._eventBus.off('profile:password:update:success', this._cancelEditCallback);
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

  private _errorSaveProfileCallaback = (error: unknown) => {
    console.log(error);
  };

  private _passwordUpdateCallback = (isUpdate: boolean) => {
    this._passwordUpdate = isUpdate;
  };

  private _saveProfileSuccessCallback = (updatedUser: User) => {
    Store.setState('user', updatedUser);
    Store.setState('editProfileData', null);
  };

  private _cancelEditCallback = () => {
    this._passwordUpdate = false;
    Store.setState('editProfileData', null);
    Store.setState('changePasswordData', {
      oldPassword: '',
      newPassword: ''
    });

    const user = Store.getState('user');

    if (user) {
      this.data = user;
      this._updateData();
    }
  };

  private _requestUpdateProfileManager = () => {
    const editProfileDataExist = Store.getState('editProfileData');

    if (this._passwordUpdate) {
      this._requestPasswordUpdateCallback();
    }

    if (editProfileDataExist !== null) {
      this._requestProfileUpdate();
    }
  };

  private _requestPasswordUpdateCallback = () => {
    const changePasswordData = Store.getState('changePasswordData');
    API.user.updateUserPassword({ data: changePasswordData });
  };

  private _handleEditProfile = (props: { name: KeysOfUserDTO; value: string }) => {
    const { name, value } = props;

    if (this.data) {
      const isEdited = this.data[name] !== value;
      const editProfileData = Store.getState('editProfileData') || {};
      const isNotPasswordFields = !isPasswordFields(name);

      if (isEdited && isNotPasswordFields) {
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

  private _requestProfileUpdate = () => {
    const editProfileData = Store.getState('editProfileData');
    const user = Store.getState('user') as User;

    const { first_name, second_name, display_name, login, email, phone } = user;
    const updateUserDTO: UpdateUserDTO = {
      data: {
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        ...editProfileData
      }
    };

    API.user.updateProfile(updateUserDTO);
  };

  private _updateData() {
    if (this._data) {
      const { oldPassword, newPassword } = Store.getState('changePasswordData');
      this._emailEl.setAttribute('value', this._data.email);
      this._loginEl.setAttribute('value', this._data.login);
      this._firstNameEl.setAttribute('value', this._data.first_name);
      this._secondNameEl.setAttribute('value', this._data.second_name);
      this._displayNameEl.setAttribute('value', this._data.display_name || 'Not Set');
      this._phoneEl.setAttribute('value', this._data.phone);
      this._oldPasswdEl.setAttribute('value', oldPassword);
      this._newPasswdEl.setAttribute('value', newPassword);
      this._newConfirmPasswdEl.setAttribute('value', '');
      if (this._data.avatar) {
        const avatarUrl = `https://ya-praktikum.tech/api/v2/resources${this._data.avatar}`;
        this._avatarEl.setAttribute('avatar', avatarUrl);
      }
    }
  }
}

export default customElements.define(tagName, Profile);
