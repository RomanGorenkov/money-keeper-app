import { FormControl, Validators } from '@angular/forms';

import { FormInput } from '../../../../authorization/interfaces/form-input.interface';
import { InputTypes } from '../../../../../global-constants/input-types';

function validateUsername(control: FormControl) {

  return control.value !== '' ? null : {
    username: {
      valid: false
    }
  };
}

export const settingInputs: FormInput[] = [
  {
    type: InputTypes.File,
    name: 'avatarFile',
    placeholder: 'settings.selectFile',
    defaultImageUrl: '../../../../../../assets/img/plus.svg',
    validators: [],
  },
  {
    type: InputTypes.Text,
    name: 'username',
    placeholder: 'settings.username',
    validators: [
      Validators.required,
      // validateUsername,
      // Validators.pattern('/.*\\S.*/'),
    ],
  },
];
