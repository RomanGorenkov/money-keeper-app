import { routing } from '../../../global-constants/routing';
import { icons } from '../../../global-constants/icons';

export const headerButtons: HeaderButtons[] = [
  {
    placeholder: 'authorization.signIn',
    iconId: icons.signIn.iconId,
    routerUrl: routing.authorisation.login,
  },
  {
    placeholder: 'authorization.signUp',
    iconId: icons.userPlus.iconId,
    routerUrl: routing.authorisation.registration,
  },
];
