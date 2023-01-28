import { EventName } from '../core';

export type Handlers = {
  event: EventName;
  selector: string;
  handler: (event?: Event) => void;
};
