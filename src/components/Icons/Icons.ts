import html from './Icons.html';
import css from './Icons.css';
import { BaseComponent } from '../../core';
import spriteUrl from './icons-sprite.svg';

const tagName = 'ypr-icon';

export class Icon extends BaseComponent {
  name: string;
  color: string;
  width: string;
  height: string;
  _iconElem: HTMLElement;
  _iconContainer: SVGElement;

  constructor() {
    super({ html, css, tagName });

    this._iconElem = this._root.getElementById('iconElem') as HTMLElement;
    this._iconContainer = this._root.querySelector('.icon') as SVGElement;

    this.width = '16px';
    this.height = '16px';
    this.name = 'arrowforward';
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

export default customElements.define(tagName, Icon);
