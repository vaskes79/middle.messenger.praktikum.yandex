import { EventBus } from '../../core';
import { HTTPTransport } from '../../core';
import { Handlers } from '../../types';

const eventBuss = EventBus.getInstance();
type TodoItem = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const handleModal = () => {
  eventBuss.emmit('modal:open', 'id');
};

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
      // testPostRequest();
      // testPutRequest();
      testDeleteRequest();
    }
  }
];

async function testDeleteRequest() {
  const data = await HTTPTransport.DELETE('https://jsonplaceholder.typicode.com/posts/1');

  console.log(data);
}

// type DTOTodoItem = Omit<TodoItem, 'id'>;
// async function testGetRequest() {
//   const data = await HTTPTransport.GET<TodoItem>('https://jsonplaceholder.typicode.com/posts/1');
//   console.log({ data });
// }

// async function testPostRequest() {
//   const data = await HTTPTransport.POST<DTOTodoItem, { id: number }>(
//     'https://jsonplaceholder.typicode.com/posts',
//     {
//       data: {
//         title: 'foo',
//         body: 'bar',
//         userId: 1
//       }
//     }
//   );
//   console.log({ data });
// }

// async function testPutRequest() {
//   const data = await HTTPTransport.PUT<DTOTodoItem, { id: number }>(
//     'https://jsonplaceholder.typicode.com/posts/1',
//     {
//       data: {
//         title: 'foo000',
//         body: 'bar',
//         userId: 1
//       }
//     }
//   );
//   console.log({ data });
// }
