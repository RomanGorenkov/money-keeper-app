import { routing } from '../../../global-constants/routing';
import { icons } from '../../../global-constants/icons';

export const headerButtons: HeaderButtons[] = [
  {
    placeholder: 'Sign In',
    iconId: icons.signIn.iconId,
    routerUrl: routing.authorisation.login,
  },
  {
    placeholder: 'Sign Up',
    iconId: icons.userPlus.iconId,
    routerUrl: routing.authorisation.registration,
  },
];
