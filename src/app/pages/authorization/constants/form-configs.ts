import { FormGroup, Validators } from '@angular/forms';

import { FormInput } from '../interfaces/form-input.interface';
import { FormConfigs } from '../interfaces/form-configs.interface';
import { InputTypes } from '../../../global-constants/input-types';
import { ValidationPattern } from '../../../global-constants/validation-pattern';

const loginInputs: FormInput[] = [
  {
    type: InputTypes.Email,
    name: 'email',
    placeholder: 'authorization.fields.email',
    validators: [
      Validators.required,
      Validators.pattern(ValidationPattern.Email),
    ],
  },
  {
    type: InputTypes.Password,
    name: 'password',
    placeholder: 'authorization.fields.password',
    validators: [
      Validators.required,
      Validators.minLength(6),
    ],
  },
];

const registrationInputs = [
  {
    type: InputTypes.Text,
    name: 'username',
    placeholder: 'authorization.fields.username',
    validators: [
      Validators.required,
    ],
  },
  ...loginInputs,
  {
    type: InputTypes.Password,
    name: 'passwordConfirm',
    placeholder: 'authorization.fields.passwordConfirm',
    validators: [
      Validators.required,
      Validators.minLength(6),
    ],
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
      repeatPasswordValidator,
    ],
  },
  login: {
    formInputs: loginInputs,
    externalValidators: [],
  },
};

