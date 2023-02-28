import type { SignInDTO } from '../../api/auth/SignInApi';
import { Form, FormDataYpr } from '../../components/Form';
import { Paths, UserLoginDTO } from '../../types';
import { API } from '../../api';
import { Store, Router, BaseError } from '../../core';

export async function connectedCallbackMixin(root: ShadowRoot) {
  const form = root.querySelector('ypr-form') as Form;
  const errorHandler = new BaseError('SignUp');
  form.actions = async function (formData: FormDataYpr) {
    const data = formData.reduce((acc, { name, value }) => {
      return { ...acc, [name]: value };
    }, {} as UserLoginDTO);

    const signInDTO: SignInDTO = { data };

    try {
      const data = await API.auth.signIn(signInDTO);
      const user = await API.auth.getUser();

      if (data === 'OK' && user) {
        Store.setState('user', user);
        Router.go(Paths.chat);
      }

      form.clearInputs();
    } catch (error) {
      console.error(error);
      errorHandler.error('connectedCallbackMixin');
    }
  };
}
