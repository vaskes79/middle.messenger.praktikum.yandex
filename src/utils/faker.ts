import { faker } from '@faker-js/faker';
import { format } from 'date-fns'
import { StatusUserValue, StatusMessageState } from '../components/Status';

export function randomStatusUser() {
  return faker.helpers.arrayElement<StatusUserValue>(["online", "empty", "ofline", "not-set"]);
}

export function randomStatusMessage() {
  return faker.helpers.arrayElement<StatusMessageState>(["read", "seen", "sent"]);
}

export function randomNumber() {
  return faker.helpers.arrayElement([faker.random.numeric(), faker.random.numeric(2)])
}

export function randomTime(formatTime?: string) {
  formatTime = formatTime || "hh:mm";
  return format(faker.datatype.datetime(), formatTime);
}

export function randomFullName() {
  return faker.name.fullName();
}

export function randomAvatar() {
  return faker.image.avatar();
}

export function randomWords(wordCount?: number) {
  wordCount = wordCount || 5;
  return faker.random.words(5);
}

export function generateItems<Type = any>(itemGenerator: () => Type, itemNumber?: number) {
  itemNumber = itemNumber || 20;
  const items: Type[] = [];

  Array.from({ length: 20 }).forEach(() => {
    items.push(itemGenerator());
  });

  return items;
}
