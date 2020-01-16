import { DropdownMenuItem } from '../interfaces/dropdown-menu-item.interfase';
import { currencies } from '../../../../../global-constants/currencies';

export const currencyList: DropdownMenuItem[] = [
  {
    name: currencies.rub.split(' ').shift(),
    symbol: currencies.rub.slice(-1),
  },
  {
    name: currencies.byn.split(' ').shift(),
    symbol: currencies.byn.slice(-1),
  },
  {
    name: currencies.usd.split(' ').shift(),
    symbol: currencies.usd.slice(-1),
  },
  {
    name: currencies.eur.split(' ').shift(),
    symbol: currencies.eur.slice(-1),
  },
];
