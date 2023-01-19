import {
  rand,
  randImg,
  randNumber,
  randBetweenDate,
  randParagraph,
  randFullName,
  randAvatar,
  randTextRange
} from '@ngneat/falso';

import format from 'date-fns/format';
import { OwnerMessage, TypeContentMessage } from '../components/MessageItem/MessageItem';
import { StatusUserValue, StatusMessageState } from '../components/Status';

export function randomStatusUser() {
  return rand<StatusUserValue>(['online', 'empty', 'ofline', 'not-set']);
}

export function randomStatusMessage() {
  return rand<StatusMessageState>(['read', 'seen', 'sent']);
}

export function randomOwnerMessage() {
  return rand<OwnerMessage>(['me', 'user']);
}
export function randomTypeMessage() {
  return rand<TypeContentMessage>(['text', 'image']);
}

export function randomImage() {
  return randImg();
}

export function randomNumber() {
  return randNumber({ min: 0, max: 15 });
}

export function randomTime(formatTime?: string) {
  formatTime = formatTime || 'hh:mm';
  const date = randBetweenDate({ from: new Date('10/07/2021'), to: new Date() });
  return format(date, formatTime);
}

export function randomFullName() {
  return randFullName();
}

export function randomAvatar() {
  return randAvatar();
}

export function randomWords() {
  return randTextRange({ min: 5, max: 20 });
}

export function randomMessage() {
  return randParagraph();
}

export function generateItems<Type = unknown>(itemGenerator: () => Type, itemNumber?: number) {
  itemNumber = itemNumber || 20;
  const items: Type[] = [];

  Array.from({ length: itemNumber }).forEach(() => {
    items.push(itemGenerator());
  });

  return items;
}

export function generateCotnent<ItemType extends HTMLElement, ItemDataType = unknown>(
  selector: string,
  elemName: string,
  itemList: ItemDataType[]
) {
  const target = document.getElementById(selector);

  if (target) {
    itemList.forEach((data) => {
      const elem = document.createElement(elemName) as ItemType;
      elem.setAttribute('data', JSON.stringify(data));
      target.append(elem);
    });
  }
}
