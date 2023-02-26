import type { SignUpDTO } from '../../api/auth/SignUpApi';
import type { UserDTO } from '../../types';
import { Form, FormDataYpr } from '../../components/Form';
import { API } from '../../api';
import { BaseError } from '../../core';

export async function connectedCallbackMixin(root: ShadowRoot) {
  const form = root.querySelector('ypr-form') as Form;
  const errorHandler = new BaseError('SignUp');
  form.actions = async function (formData: FormDataYpr) {
    const data = formData.reduce((acc, { name, value }) => {
      return { ...acc, [name]: value };
    }, {} as UserDTO);

    const signUpDTO: SignUpDTO = { data };

    try {
      await API.auth.signUp(signUpDTO);
    } catch (error) {
      console.error(error);
      errorHandler.error('connectedCallbackMixin');
    }
  };
}
