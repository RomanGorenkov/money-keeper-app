import { roads } from '../../../global-constants/roads';

export const headerButtons: HeaderButtons[] = [
  {
    placeholder: 'authorization.signIn',
    iconColor: 'white',
    iconUrl: '../../../../assets/icons/sign-in-alt-solid.svg',
    routerUrl: roads.authorisation.login,
  },
  {
    placeholder: 'authorization.signUp',
    iconColor: 'white',
    iconUrl: '../../../../assets/icons/user-plus-solid.svg',
    routerUrl: roads.authorisation.registration,
  },
];
