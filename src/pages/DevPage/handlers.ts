import { EventBus } from '../../core';
import { HTTPTransport } from '../../core/HTTPTransport';
import { Handlers } from '../../types';

const eventBuss = EventBus.getInstance();

const handleModal = () => {
  eventBuss.emmit('modal:open', 'id');
};

async function testGetRequest() {
  const data = await HTTPTransport.GET<{
    id: number;
    title: string;
    body: string;
    userId: number;
  }>('https://jsonplaceholder.typicode.com/posts/1');
  console.log({ data });
}

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#openModalBtn',
    handler: () => handleModal()
  },
  {
    event: 'click',
    selector: '#btn',
    handler: () => {
      console.log('testGetRequest');
      testGetRequest();
    }
  }
];
