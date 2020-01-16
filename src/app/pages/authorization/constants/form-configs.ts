import {FormGroup, Validators} from '@angular/forms';
import {FormInput} from '../interfaces/form-input.interface';
import {FormConfigs} from '../interfaces/form-configs.interface';

const loginInputs: FormInput[] = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'authorization.fields.email',
    validators: [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ]
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'authorization.fields.password',
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
    placeholder: 'authorization.fields.username',
    validators: [
      Validators.required,
    ]
  },
  ...loginInputs,
  {
    type: 'password',
    name: 'passwordConfirm',
    placeholder: 'authorization.fields.passwordConfirm',
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
  }
};

