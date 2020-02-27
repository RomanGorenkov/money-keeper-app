import { Validators } from '@angular/forms'

import { FormInput } from '../../../../authorization/interfaces/form-input.interface'
import { InputTypes } from '../../../../../global-constants/input-types'

export const settingInputs: FormInput[] = [
  {
    type: InputTypes.File,
    name: 'userAvatarUrl',
    placeholder: 'settings.selectFile',
    defaultImageUrl: '../../../../../../assets/img/plus.svg',
    validators: [],
  },
  {
    type: InputTypes.Text,
    name: 'username',
    placeholder: 'settings.username',
    validators: [Validators.required],
  },
]
