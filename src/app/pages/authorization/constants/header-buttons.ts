import { routing } from '../../../global-constants/routing';

export const headerButtons: HeaderButtons[] = [
  {
    placeholder: 'authorization.signIn',
    iconColor: 'white',
    iconUrl: '../../../../assets/icons/sign-in-alt-solid.svg',
    routerUrl: routing.authorisation.login,
  },
  {
    placeholder: 'authorization.signUp',
    iconColor: 'white',
    iconUrl: '../../../../assets/icons/user-plus-solid.svg',
    routerUrl: routing.authorisation.registration,
  },
];
