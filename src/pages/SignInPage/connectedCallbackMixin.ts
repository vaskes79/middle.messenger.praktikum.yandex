import type { SignInDTO } from '../../api/auth/SignInApi';
import { Form, FormDataYpr } from '../../components/Form';
import { UserLoginDTO } from '../../types';
import { API } from '../../api';

export async function connectedCallbackMixin(root: ShadowRoot) {
  const form = root.querySelector('ypr-form') as Form;
  form.actions = async function (formData: FormDataYpr) {
    const data = formData.reduce((acc, { name, value }) => {
      return { ...acc, [name]: value };
    }, {} as UserLoginDTO);

    const signInDTO: SignInDTO = { data };

    try {
      await API.auth.signIn(signInDTO);
      form.clearInputs();
    } catch (error) {
      console.error(error);
    }
  };
}
