import {FormGroup, Validators} from '@angular/forms';
import {FormInput} from '../interfaces/form-input.interface';
import {FormConfigs} from '../interfaces/form-configs.interface';

const loginInputs: FormInput[] = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email Address',
    validators: [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ]
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    validators: [
      Validators.required,
      Validators.minLength(6),
    ]
  },
];

const registrationInputs = [
  {
    type: 'text',
    name: 'username',
    placeholder: 'Username',
    validators: [
      Validators.required,
    ]
  },
  ...loginInputs,
  {
    type: 'password',
    name: 'passwordConfirm',
    placeholder: 'Confirm Password',
    validators: [
      Validators.required,
      Validators.minLength(6),
    ]
  },
];

function repeatPasswordValidator(group: FormGroup): { passwordsNotEqual: boolean } {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.passwordConfirm.value;

  return password === passwordConfirmation ? null : {passwordsNotEqual: true};
}

export const formConfigs: FormConfigs = {
  registration: {
    formInputs: registrationInputs,
    externalValidators: [
      repeatPasswordValidator
    ]
  },
  login: {
    formInputs: loginInputs,
    externalValidators: []
  },
};

