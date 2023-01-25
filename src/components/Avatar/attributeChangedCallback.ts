import { AttributeChangedCallback } from '../../types';

export const attributeChangedCallback: AttributeChangedCallback = (
  name: string,
  oldValue: string,
  newValue: string
) => {
  if (name === 'name' && oldValue !== newValue) {
    this.updateName(newValue);
  }

  if (name === 'status' && oldValue !== newValue) {
    this._statusUserEl.setAttribute('status', newValue);
  }

  if (name === 'imgurl' && oldValue !== newValue) {
    this._img.setAttribute('src', newValue);
    this._nameEl.style.display = 'none';
  }
};
