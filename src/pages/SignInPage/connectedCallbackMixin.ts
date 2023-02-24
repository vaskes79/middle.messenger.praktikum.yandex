import type { SignInDTO } from '../../api/auth/SignInApi';
import { Form, FormDataYpr } from '../../components/Form';
import { Paths, UserLoginDTO } from '../../types';
import { API } from '../../api';
import { Router } from '../../core';

export async function connectedCallbackMixin(root: ShadowRoot) {
  const form = root.querySelector('ypr-form') as Form;
  form.actions = async function (formData: FormDataYpr) {
    const data = formData.reduce((acc, { name, value }) => {
      if (name === 'email') {
        name = 'login';
        value = value.split('@')[0];
      }

      return { ...acc, [name]: value };
    }, {} as UserLoginDTO);

    const signInDTO: SignInDTO = { data };

    await API.auth.signIn(signInDTO);

    Router.go(Paths.chat);
  };
}
