export type Handlers = {
  event: string;
  selector: string;
  handler: (event?: Event) => void;
};
