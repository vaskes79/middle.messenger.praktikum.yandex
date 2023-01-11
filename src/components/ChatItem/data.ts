import { faker } from '@faker-js/faker';
import { ChatItemData } from "./ChatItem";

export const chatListData: ChatItemData[] = [];

export function createDemoChatItems(): ChatItemData {
  return {
    // userId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    imgurl: faker.image.avatar(),
    time: "12:44",
    statusUser: "online",
    statusMessage: "read",
    lastMessage: faker.random.words(5),
    conterMessages: faker.random.numeric()
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

