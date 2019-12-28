import {Injectable} from '@angular/core';
import {dropDownMenuConfig} from '../../constants/dropdown-menu-config';

@Injectable()
export class CostsService {

  currency: string =  dropDownMenuConfig.currency.menuItems[0].symbol;
  language: string =  dropDownMenuConfig.language.menuItems[0].name;

  constructor() {
  }


  changeCurrency(currency: string) {
    this.currency = currency.slice(-1);
  }

  changeLanguage(language: string) {
    this.language = language;
  }

}
