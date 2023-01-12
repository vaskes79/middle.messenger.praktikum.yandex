import { iconSprite } from "./Icons.sprite";

export const tmpl = document.createElement('template');

tmpl.innerHTML = `
  <style>
    .sprite {
      height: 0;
      width: 0;
      display:none;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: block;
      fill: var(--gray-700);
    }
  </style>
  ${iconSprite}
  <svg class="icon">
    <use id="iconElem" href="#arrowforward" />
  </svg>
`
