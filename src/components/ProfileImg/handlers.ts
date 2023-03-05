import { API } from '../../api';
import { Handlers } from '../../types';

function handleChange(event: InputEvent) {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const img = input.files[0];
    const formData = new FormData();

    formData.append('avatar', img, `${img.name}`);
    readImage(img, this._containerEl);

    API.user.updateAvatar({
      data: formData
    });
  }
}

export const handlers: Handlers[] = [
  {
    event: 'change',
    selector: '#profileImg',
    handler: handleChange
  }
];

function readImage(file: File, elem: HTMLElement) {
  const reader = new FileReader();

  reader.addEventListener('load', (event) => {
    if (event.target?.result) {
      elem.style.backgroundSize = 'cover';
      elem.style.backgroundImage = `url(${event.target?.result})`;
    }
  });

  reader.readAsDataURL(file);
}
