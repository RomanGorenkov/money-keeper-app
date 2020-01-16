import { FormInput } from '../../../../authorization/interfaces/form-input.interface';

export const settingInputs: FormInput[] = [
  {
    type: 'file',
    name: 'avatarFile',
    placeholder: 'settings.selectFile',
    defaultImageUrl: '../../../../../../assets/img/plus.svg',
    validators: [
    ]
  },
  {
    type: 'text',
    name: 'username',
    placeholder: 'settings.username',
    validators: [
    ]
  },
];
