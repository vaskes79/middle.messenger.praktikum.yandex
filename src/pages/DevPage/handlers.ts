import { EventBus, Validator } from '../../core';
import { Handlers } from '../../types';

const eventBuss = EventBus.getInstance();

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
      checValidator();
    }
  }
];

function checValidator() {
  const email = 'sldf-sd@sdfhsd.com';
  const first_name = 'Vasily';
  const second_name = 'Гузов';
  const login = 'shfghj_dhfhdfhgert0S';
  const wrongLogin = 'ssesdhklfjsdkhfklsdjfklshdfsdf';
  const pass40 = 'CfGHGj2Lj3qwUKhB79k8dYbEvWCbUb32D5nUtZYs';
  const pass8 = 'ru8bCTfa';
  const wrongPass = 'password';
  const wrongPassNum = 'ily';
  const phone = '+123456789012345';
  const wrongPhone = '+123456789';
  const empty = '';
  const notEmpty = 'Some senetencise';
  console.log('Validator: isEmail', Validator.isEmail(email));
  console.log('Validator: isDisplayName', Validator.isDisplayName(first_name));
  console.log('Validator: isDisplayName', Validator.isDisplayName(second_name));
  console.log('Validator: isLogin', Validator.isLogin(login));
  console.log('Validator: isLogin wrong', Validator.isCorrectPassword(wrongLogin));
  console.log('Validator: isCorrectPassword length: 40', Validator.isCorrectPassword(pass40));
  console.log('Validator: isCorrectPassword length: 8', Validator.isCorrectPassword(pass8));
  console.log(
    'Validator: isCorrectPassword wrong password',
    Validator.isCorrectPassword(wrongPass)
  );
  console.log(
    'Validator: isCorrectPassword wrong password',
    Validator.isCorrectPassword(wrongPassNum)
  );
  console.log('Validator: isCorrectPhoneNumber true', Validator.isCorrectPhoneNumber(phone));
  console.log('Validator: isCorrectPhoneNumber wrong', Validator.isCorrectPhoneNumber(wrongPhone));
  console.log('Validator: isNotEmpty true', Validator.isNotEmpty(notEmpty));
  console.log('Validator: isNotEmpty wrong', Validator.isNotEmpty(empty));
}
