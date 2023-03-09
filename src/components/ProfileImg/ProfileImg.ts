import html from './ProfileImg.html';
import css from '!!raw-loader!./ProfileImg.css';
import { BaseComponent, Store } from '../../core';
import { handlers } from './handlers';
import { ErrorRes, User } from '../../types';

const tagName = 'ypr-profile-input';

export class ProfileImg extends BaseComponent {
  private _containerEl: HTMLElement;

  constructor() {
    super({ html, css, tagName, handlers });
    this._containerEl = this._root.querySelector('label') as HTMLElement;
  }

  protected static get observedAttributes(): string[] {
    return ['avatar'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === 'avatar' && oldValue !== newValue) {
      this._containerEl.style.backgroundImage = `url(${newValue})`;
      this._containerEl.style.backgroundSize = `cover`;
    }
  }

  protected _mount(): void {
    this._eventBus.on('profile:save:avatar', this._updateAvatarCallback);
    this._eventBus.on('profile:save:avatar:error', this._errorUpdateAvatar);
  }

  protected _unmount(): void {
    this._eventBus.off('profile:save:avatar', this._updateAvatarCallback);
    this._eventBus.off('profile:save:avatar:error', this._errorUpdateAvatar);
  }

  private _updateAvatarCallback = (newUserData: User) => {
    Store.setState('user', newUserData);
  };

  private _errorUpdateAvatar = (error: ErrorRes) => {
    console.error('ProfileImg avatar update: ', error);
  };
}

export default customElements.define(tagName, ProfileImg);
