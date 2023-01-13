import { rand, randImg, randNumber, randBetweenDate, randSentence, randParagraph, randFullName, randAvatar } from '@ngneat/falso';

import format from 'date-fns/format';
import { OwnerMessage, TypeContentMessage } from '../components/MessageItem/MessageItem';
import { StatusUserValue, StatusMessageState } from '../components/Status';

export function randomStatusUser() {
  return rand<StatusUserValue>(["online", "empty", "ofline", "not-set"]);
}

export function randomStatusMessage() {
  return rand<StatusMessageState>(["read", "seen", "sent"]);
}

export function randomOwnerMessage() {
  return rand<OwnerMessage>(["me", "user"]);
}
export function randomTypeMessage() {
  return rand<TypeContentMessage>(["text", "image"]);
}

export function randomImage() {
  return randImg();
}

export function randomNumber() {
  return randNumber({ min: 0, max: 99 });
}

export function randomTime(formatTime?: string) {
  formatTime = formatTime || "hh:mm";
  const date = randBetweenDate({ from: new Date('10/07/2021'), to: new Date() })
  return format(date, formatTime);
}

export function randomFullName() {
  return randFullName();
}

export function randomAvatar() {
  return randAvatar()
}

export function randomWords(wordCount?: number) {
  const length = wordCount || 5;
  return randSentence({ length })
}

export function randomMessage() {
  return randParagraph();
}

export function generateItems<Type = any>(itemGenerator: () => Type, itemNumber?: number) {
  itemNumber = itemNumber || 20;
  const items: Type[] = [];

  Array.from({ length: 20 }).forEach(() => {
    items.push(itemGenerator());
  });

  return items;
}
