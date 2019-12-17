import { routing } from '../../global-constants/routing';

export const headerButtons: HeaderButtons[] = [
  {
    placeholder: 'Sign In',
    iconId: 'sign-in-icon',
    routerUrl: routing.authorisation.login,
  },
  {
    placeholder: 'Sign Up',
    iconId: 'user-plus-icon',
    routerUrl: routing.authorisation.registration,
  },
];
