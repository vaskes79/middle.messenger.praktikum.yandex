export type MessageSocketDataType =
  | 'user connected'
  | 'ping'
  | 'get old'
  | 'message'
  | 'file'
  | 'sticker';

export type MessageSocketData = {
  type: MessageSocketDataType;
  content?: string;
};

export type MessageItemsData = { id: number }[];

export enum MessageSocktEvents {
  userConnected = 'ws:userContented',
  ping = 'ws:ping',
  messageList = 'ws:message:list',
  message = 'ws:message',
  file = 'ws:file',
  stiker = 'ws:sticker',
  connectionOpen = 'ws:open',
  connectionClose = 'ws:close'
}
