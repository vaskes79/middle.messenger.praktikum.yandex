import { AttributeChangedCallback } from '../../types';

export const attributeChangedCallback: AttributeChangedCallback = (name, oldName, newValue) => {
  if (oldName !== newValue) {
    console.log({ name, oldName, newValue });
  }
};
