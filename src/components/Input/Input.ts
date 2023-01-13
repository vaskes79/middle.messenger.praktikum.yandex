import html from 'bundle-text:./Input.html';
import { Elem } from '../../types/Components';
import uuid from 'uuid';

export class Input extends HTMLElement {
  _containerEl: HTMLElement;
  _infoEl: HTMLElement;
  _detailsEl: HTMLElement;
  _requireEl: HTMLElement;
  _inputEl: HTMLInputElement;
  _labelEl: HTMLElement;

  _detailsContent: string;
  _detailsShow: boolean = false;

  _errorContent: string;
  _error: boolean = false;

  _require: boolean = false;

  _name: string;
  _value: string;

  _label: string = 'Input Label';

  _removeEventListeners: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._containerEl = this.shadowRoot.querySelector('.container') as HTMLElement;
      this._infoEl = this.shadowRoot.querySelector('.info') as HTMLElement;
      this._detailsEl = this.shadowRoot.querySelector('.details') as HTMLElement;
      this._requireEl = this.shadowRoot.querySelector('.require') as HTMLElement;
      this._inputEl = this.shadowRoot.querySelector('input') as HTMLInputElement;
      this._labelEl = this.shadowRoot.querySelector('.label') as HTMLElement;
    } else {
      throw new Error('Input Root element not found');
    }
  }

  connectedCallback() {
    this._removeEventListeners = this._addEventListeners();

    if (this.hasAttribute("leftIcon")) {
      this._containerEl.classList.add('container--icon')
    }

    this._setupInput();
    this._setupLabel();
    this._setupDetails();
    this._setupInfo();
  }

  disconnectedCallback() {
    console.log("unmount input", this);
  }

  static get observedAttributes() {
    return ["error"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "error" && oldValue !== newValue) {
      this.showError(newValue);
    }
  }

  _infoMouseoverListener = () => {
    this.showDetails();
  }

  _infoMouseleaveListener = () => {
    this.hideDetails();
  }

  _onChangeInputListener = (e: Event) => {
    const { target } = e;
    this._value = (target as HTMLInputElement).value;
    if (!this._value && this._error) {
      this.clearError();
    }
    this._setupLabel();
  }

  _addEventListeners() {
    this._infoEl.addEventListener('mouseover', this._infoMouseoverListener);
    this._infoEl.addEventListener('mouseleave', this._infoMouseleaveListener);
    this._inputEl.addEventListener('change', this._onChangeInputListener)

    return () => {
      this._infoEl.removeEventListener('mouseover', this._infoMouseoverListener);
      this._infoEl.removeEventListener('mouseleave', this._infoMouseleaveListener);
      this._inputEl.removeEventListener('change', this._onChangeInputListener)
    }
  }

  _setupInput = () => {
    if (this.hasAttribute("require")) {
      this._requireEl.style.opacity = "1";
      this._inputEl.setAttribute('require', '')
      this._require = true;
    }
    if (this.hasAttribute('type')) {
      const type = this.getAttribute('type') || 'text';
      this._inputEl.setAttribute('type', type)
    }
    if (this.hasAttribute('value')) {
      const value = this.getAttribute('value') || '';
      this._inputEl.setAttribute('value', value)
      this._value = value;
      this._setupLabel();
    }
    if (this.hasAttribute('name')) {
      const name = this.getAttribute('name') || uuid();
      this._name = name;
      this._inputEl.setAttribute('name', name)
    }
  }

  _setupLabel = () => {
    if (this.hasAttribute('label')) {
      let label = this.getAttribute('label') || this._label;
      const labelElText = this._labelEl.querySelector('span');
      if (labelElText) {
        labelElText.textContent = label;
      }
      if (this._inputEl) {
        label = this._require ? label + " *" : label;
        this._inputEl.placeholder = label;
      }
    }

    if (this._value) {
      this._labelEl.style.opacity = "1";
    }
    if (!this.value) {
      this._labelEl.style.opacity = "0";
    }
  }

  _setupInfo = () => {
    if (this.hasAttribute('info')) {
      this._infoEl.classList.add('info--show');
    }
  }

  _setupDetails = () => {
    if (this.hasAttribute('details')) {
      this._detailsContent = this.getAttribute('details') || "";
      this._detailsEl.textContent = this._detailsContent;
    }
  }

  public get name() {
    return this._name;
  }

  public get value() {
    return this._value;
  }

  public showError = (errorText?: string) => {
    this._error = true;
    this._errorContent = errorText || "Error input";
    this._containerEl.classList.add("error");
    if (this._detailsEl) {
      this._detailsEl.textContent = this._errorContent;
    }
  }

  public clearError = () => {
    this._containerEl.classList.remove("error");
    this.removeAttribute("error");
    this._error = false;
    this._errorContent = '';
    this._detailsEl.textContent = this._detailsContent;
  }

  public showDetails = () => {
    if (this._detailsEl) {
      this._detailsEl.style.opacity = "1"
    }
  }

  public hideDetails = () => {
    if (this._detailsEl) {
      this._detailsEl.style.opacity = '0';
    }
  }
}

export default customElements.define('ypr-input', Input)
