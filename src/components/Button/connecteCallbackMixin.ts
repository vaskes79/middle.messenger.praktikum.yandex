export function connectedCallbackMixin() {
  if (this.hasAttribute('disabled')) {
    this._btn.setAttribute('disabled', '');
  }

  if (this.hasAttribute('type')) {
    const type = this.getAttribute('type') || 'button';
    this._btn.setAttribute('type', type);
  }

  if (this.hasAttribute('natural')) {
    this._btn.classList.add('natural');
  }

  if (this.hasAttribute('outline')) {
    this._btn.classList.add('outline');
  }

  if (this.hasAttribute('link')) {
    this._btn.classList.add('link');
  }

  if (this.hasAttribute('distructive')) {
    this._btn.classList.add('distructive');
  }
}
