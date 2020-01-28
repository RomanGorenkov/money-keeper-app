import { DropdownMenuItem } from '../interfaces/dropdown-menu-item.interfase';
import { currencies } from '../../../../../global-constants/currencies';

export const currencyList: DropdownMenuItem[] = [
  {
    name: currencies.rub.split(' ').shift(),
    symbol: currencies.rub.split(' ').pop(),
  },
  {
    name: currencies.byn.split(' ').shift(),
    symbol: currencies.byn.split(' ').pop(),
  },
  {
    name: currencies.usd.split(' ').shift(),
    symbol: currencies.usd.split(' ').pop(),
  },
  {
    name: currencies.eur.split(' ').shift(),
    symbol: currencies.eur.split(' ').pop(),
  },
];
