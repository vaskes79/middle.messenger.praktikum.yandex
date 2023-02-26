// import {ConnectToChatApi} from './ConnectToChatApi';
import { GetWSConnectLinkApi } from './GetWSConnectLinkApi';

export const messages = {
  getWSConnectLink: (id: string) => new GetWSConnectLinkApi().request(id)
};
