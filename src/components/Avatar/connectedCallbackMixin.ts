import { StatusUser } from '../Status';

export function connectedCallbackMixin(root: ShadowRoot) {
  this._img = root.querySelector('.img') as HTMLImageElement;
  this._container = root.querySelector('.container') as HTMLDivElement;
  this._nameEl = root.querySelector('.name') as HTMLElement;
  this._statusUserEl = root.querySelector('ypr-status-user') as StatusUser;
  this._statusUserEl.setAttribute('status', 'ofline');
  this._imgUrl = this.getAttribute('imgurl') || this._imgUrl;
  this._img.setAttribute('src', this._imgUrl);
}
