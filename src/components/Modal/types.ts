export enum ModalEvents {
  OPEN = 'modal:open',
  CLOSE = 'modal:close',
  CONFIRM = 'modal:confirm',
  CHANGE_DATA = 'modal:change_data'
}

export type ModalData = {
  value: unknown;
};

export type ChangeDataProps = {
  id: string;
  data: ModalData;
};
