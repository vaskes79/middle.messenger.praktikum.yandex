import html from 'bundle-text:./Icons.html';
import spriteUrl from './icons-sprite.svg';

export class Icon extends HTMLElement {
  name: string;
  color: string;
  width: string;
  height: string;
  _iconElem: HTMLElement | null;
  _iconContainer: SVGElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.width = '16px';
    this.height = '16px';
    this.name = 'arrowforward';

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._iconElem = this.shadowRoot.getElementById('iconElem');
      this._iconContainer = this.shadowRoot.querySelector('.icon') as SVGElement;
    }
  }

  static get observedAttributes() {
    return ['name', 'color', 'width', 'height'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'name' && oldValue !== newValue) {
      this._updateIcon(newValue);
    }

    if (name === 'color' && oldValue !== newValue) {
      this._updateColor(newValue);
    }

    if (name === 'width' || (name === 'height' && oldValue !== newValue)) {
      this.updateSize({ width: newValue, height: newValue });
    }
  }

  connectedCallback() {
    this._updateIcon();
  }

  _updateColor = (color?: string) => {
    if (this._iconContainer) {
      color = color || 'var(--blue-500)';
      this._iconContainer.style.fill = color;
    }
  };

  public updateSize = (size?: { width: string; height: string }) => {
    if (this._iconContainer && size) {
      const { width, height } = size;

      this.width = width;
      this.height = height;
    }

    this._iconContainer.style.width = this.width;
    this._iconContainer.style.height = this.height;
  };

  _updateIcon = (name?: string) => {
    if (this._iconElem) {
      this.name = name || this.name;
      const newIcon = spriteUrl + '#' + this.name;
      this._iconElem.setAttribute('href', newIcon);
    }
  };
}

export default customElements.define('ypr-icon', Icon);
