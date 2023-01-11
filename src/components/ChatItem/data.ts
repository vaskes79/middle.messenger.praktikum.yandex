import { faker } from '@faker-js/faker';
import { format } from 'date-fns'
import { StatusUserValue, StatusMessageState } from '../Status';
import { ChatItemData } from "./ChatItem";

export const chatListData: ChatItemData[] = [];

export function createDemoChatItems(): ChatItemData {
  return {
    name: faker.name.fullName(),
    imgurl: faker.image.avatar(),
    time: format(faker.datatype.datetime(), "hh:mm"),
    statusUser: faker.helpers.arrayElement<StatusUserValue>(["online", "empty", "ofline", "not-set"]),
    statusMessage: faker.helpers.arrayElement<StatusMessageState>(["read", "seen", "sent"]),
    lastMessage: faker.random.words(5),
    conterMessages: faker.helpers.arrayElement([faker.random.numeric(), faker.random.numeric(2)])
  };
}

Array.from({ length: 20 }).forEach(() => {
  chatListData.push(createDemoChatItems());
});

export const defaultData: ChatItemData = {
  name: "Vasily Guzov",
  imgurl: "https://avatars.githubusercontent.com/u/3108240?v=4",
  time: "12:34",
  statusUser: "online",
  statusMessage: "read",
  lastMessage: "message text",
  conterMessages: 5
}

