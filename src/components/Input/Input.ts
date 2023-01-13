import html from 'bundle-text:./Input.html';
import { Elem } from '../../types/Components';

export class Input extends HTMLElement {
  _containerEl: Elem;
  _infoEl: Elem;
  _detailsEl: Elem;

  _detailsContent: string;
  _detailsShow: boolean = false;

  _errorContent: string;
  _error: boolean = false;

  _removeEventListeners: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._containerEl = this.shadowRoot?.querySelector('.container')
      this._infoEl = this.shadowRoot?.querySelector('.info')
      this._detailsEl = this.shadowRoot?.querySelector('.details')
    }

    if (this.hasAttribute("leftIcon")) {
      this._containerEl?.classList.add('container--icon')
    }

    this._setupDetails();
    this._setupInfo();
  }

  connectedCallback() {
    this._removeEventListeners = this._addEventListeners();
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

  _addEventListeners() {
    this._infoEl?.addEventListener('mouseover', this._infoMouseoverListener);
    this._infoEl?.addEventListener('mouseleave', this._infoMouseleaveListener);

    return () => {
      this._infoEl?.removeEventListener('mouseover', this._infoMouseoverListener);
      this._infoEl?.removeEventListener('mouseleave', this._infoMouseleaveListener);
    }
  }

  _setupInfo = () => {
    if (this.hasAttribute('info')) {
      this._infoEl?.classList.add('info--show');
    }
  }

  _setupDetails = () => {
    if (this.hasAttribute('details') && this._detailsEl) {
      this._detailsContent = this.getAttribute('details') || "";
      this._detailsEl.textContent = this._detailsContent;
    }
  }

  public showError = (errorText?: string) => {
    this._error = true;
    this._errorContent = errorText || "Error input";
    this._containerEl?.classList.add("error");
    if (this._detailsEl) {
      this._detailsEl.textContent = this._errorContent;
    }
  }

  public clearError = () => {
    this._containerEl?.classList.remove("error");
    this._error = false;
    this._errorContent = '';
    if (this._detailsEl) {
      this._detailsEl.textContent = this._detailsContent;
    }
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
