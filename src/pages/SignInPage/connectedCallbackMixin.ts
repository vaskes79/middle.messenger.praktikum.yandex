import type { SignInDTO } from '../../api/auth/SignInApi';
import { Form, FormDataYpr } from '../../components/Form';
import { UserLoginDTO } from '../../types';
import { API } from '../../api';

export async function connectedCallbackMixin(root: ShadowRoot) {
  const form = root.querySelector('ypr-form') as Form;
  form.actions = function (formData: FormDataYpr) {
    const data = formData.reduce((acc, { name, value }) => {
      if (name === 'email') {
        name = 'login';
        value = value.split('@')[0];
      }
      return { ...acc, [name]: value };
    }, {} as UserLoginDTO);

    const signInDTO: SignInDTO = { data };

    API.auth.signIn(signInDTO);
  };
}
