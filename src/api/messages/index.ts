import { GetWSConnectLinkApi } from './GetWSConnectLinkApi';
import { MessageSocket } from './MessageSocket';

export const messages = {
  getWSConnectLink: (id: string) => new GetWSConnectLinkApi().request(id),
  connectToChat: () => new MessageSocket()
};
