import {currencyList} from './currency-list';
import {languageList} from './language-list';
import {DropdownMenuConfig} from '../interfaces/dropdown-menu-config.interface';

const currency: DropdownMenuConfig = {
  menuTitle:  'Currency',
  menuItems: currencyList,
  action: 'changeCurrency',
};

const language: DropdownMenuConfig = {
  menuTitle:  'Language',
  menuItems: languageList,
  action: 'changeLanguage',
};

export const dropDownMenuConfig = {
  currency,
  language,
};

