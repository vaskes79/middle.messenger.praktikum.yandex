import { expect } from 'chai';
import { BaseComponent } from '../BaseComponent';

describe('BaseComponent Tests', () => {
  const html = `<div><button id="btn">test button</button></div>`;
  const css = `div {background-color: red}`;
  const tagName = `ypr-test-class`;

  class TestClass extends BaseComponent {
    private _btnEl: HTMLButtonElement;

    constructor() {
      super({ html, css, tagName });
      this._btnEl = this._root.querySelector('#btn') as HTMLButtonElement;
    }

    protected _mount(): void {
      this._btnEl.addEventListener('click', () => 'OK');
    }
  }

  before(() => {
    window.customElements.define(tagName, TestClass);
    const buttonElem = document.createElement('ypr-test-class');
    document.body.appendChild(buttonElem);
  });

  describe('Initialisation Tests', () => {
    it('shoul be instance of BaseComponent', () => {
      expect(TestClass).instanceof(BaseComponent.constructor);
    });

    it('should create html element ypr-test-class', () => {
      expect(document.body.innerHTML).to.contain('<ypr-test-class></ypr-test-class>');
    });
  });
});
