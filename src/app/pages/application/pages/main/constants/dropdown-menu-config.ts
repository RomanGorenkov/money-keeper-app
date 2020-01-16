import { currencyList } from './currency-list';
import { languageList } from './language-list';
import { DropdownMenuConfig } from '../interfaces/dropdown-menu-config.interface';

const currency: DropdownMenuConfig = {
  menuName: 'currency',
  menuTitle: 'toolbar.currency',
  menuItems: currencyList,
  action: 'changeCurrency',
};

const language: DropdownMenuConfig = {
  menuName: 'language',
  menuTitle: 'toolbar.language',
  menuItems: languageList,
  action: 'changeLanguage',
};

export const dropDownMenuConfig = {
  currency,
  language,
};

