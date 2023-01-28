import { EventBus } from '../../core';
import { HTTPTransport } from '../../core/HTTPTransport';
import { Handlers } from '../../types';

const eventBuss = EventBus.getInstance();
type TodoItem = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type DTOTodoItem = Omit<TodoItem, 'id'>;

const handleModal = () => {
  eventBuss.emmit('modal:open', 'id');
};

// async function testGetRequest() {
//   const data = await HTTPTransport.GET<TodoItem>('https://jsonplaceholder.typicode.com/posts/1');
//   console.log({ data });
// }

async function testPostRequest() {
  const data = await HTTPTransport.POST<DTOTodoItem, { id: number }>(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1
      }
    }
  );
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
      // testGetRequest();
      testPostRequest();
    }
  }
];
