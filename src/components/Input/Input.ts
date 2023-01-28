import html from 'bundle-text:./Input.html';
import css from 'bundle-text:./Input.css';
import { nanoid } from 'nanoid';
import { BaseComponent } from '../../core';
import { handlers } from './handlers';

const tagName = 'ypr-input';

export class Input extends BaseComponent {
  _containerEl: HTMLElement;
  _infoEl: HTMLElement;
  _detailsEl: HTMLElement;
  _requireEl: HTMLElement;
  _inputEl: HTMLInputElement;
  _labelEl: HTMLElement;

  _detailsContent: string;
  _detailsShow = false;

  _errorContent: string;
  _error = false;

  _require = false;

  _name: string;
  _value: string;

  _label = 'Input Label';

  constructor() {
    super({ html, css, tagName, handlers });
    this._containerEl = this._root.querySelector('.container') as HTMLElement;
    this._infoEl = this._root.querySelector('.info') as HTMLElement;
    this._detailsEl = this._root.querySelector('.details') as HTMLElement;
    this._requireEl = this._root.querySelector('.require') as HTMLElement;
    this._inputEl = this._root.querySelector('input') as HTMLInputElement;
    this._labelEl = this._root.querySelector('.label') as HTMLElement;
  }

  _mount() {
    if (this.hasAttribute('leftIcon')) {
      this._containerEl.classList.add('container--icon');
    }

    this._setupInput();
    this._setupLabel();
    this._setupDetails();
    this._setupInfo();
  }

  static get observedAttributes() {
    return ['error'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'error' && oldValue !== newValue) {
      this.showError(newValue);
    }
  }

  _setupInput = () => {
    if (this.hasAttribute('require')) {
      this._requireEl.style.opacity = '1';
      this._inputEl.setAttribute('require', '');
      this._require = true;
    }
    if (this.hasAttribute('type')) {
      const type = this.getAttribute('type') || 'text';
      this._inputEl.setAttribute('type', type);
    }
    if (this.hasAttribute('value')) {
      const value = this.getAttribute('value') || '';
      this._inputEl.setAttribute('value', value);
      this._value = value;
      this._setupLabel();
    }
    if (this.hasAttribute('name')) {
      const name = this.getAttribute('name') || nanoid();
      this._name = name;
      this._inputEl.setAttribute('name', name);
    }
  };

  _setupLabel = () => {
    if (this.hasAttribute('label')) {
      let label = this.getAttribute('label') || this._label;
      const labelElText = this._labelEl.querySelector('span');
      if (labelElText) {
        labelElText.textContent = label;
      }
      if (this._inputEl) {
        label = this._require ? label + ' *' : label;
        this._inputEl.placeholder = label;
      }
    }

    if (this._value) {
      this._labelEl.style.opacity = '1';
    }
    if (!this.value) {
      this._labelEl.style.opacity = '0';
    }
  };

  _setupInfo = () => {
    if (this.hasAttribute('info')) {
      this._infoEl.classList.add('info--show');
    }
  };

  _setupDetails = () => {
    if (this.hasAttribute('details')) {
      this._detailsContent = this.getAttribute('details') || '';
      this._detailsEl.textContent = this._detailsContent;
    }
  };

  get name() {
    return this._name;
  }

  get value() {
    return this._value;
  }

  showError = (errorText?: string) => {
    this._error = true;
    this._errorContent = errorText || 'Error input';
    this._containerEl.classList.add('error');
    if (this._detailsEl) {
      this._detailsEl.textContent = this._errorContent;
    }
  };

  clearError = () => {
    this._containerEl.classList.remove('error');
    this.removeAttribute('error');
    this._error = false;
    this._errorContent = '';
    this._detailsEl.textContent = this._detailsContent;
  };

  showDetails = () => {
    if (this._detailsEl) {
      this._detailsEl.style.opacity = '1';
    }
  };

  hideDetails = () => {
    if (this._detailsEl) {
      this._detailsEl.style.opacity = '0';
    }
  };
}

export default customElements.define(tagName, Input);
