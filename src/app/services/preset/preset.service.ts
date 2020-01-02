import {Injectable} from '@angular/core';
import {dropDownMenuConfig} from '../../pages/main/constants/dropdown-menu-config';
import {UserPresets} from '../../pages/authorization/interfaces/user-presets.interface';
import {currencyList} from '../../pages/main/constants/currency-list';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { apiUrls } from '../../global-constants/api-urls';

@Injectable()
export class PresetService {

  currency: string;
  language: string;

  constructor(
    private http: HttpClient,
  ) {
    this.setDefaultPresets();
  }


  changeCurrency(currency: string) {
    this.http.post(`${environment.serverUrl}/${apiUrls.currency}`, JSON.stringify({currency: currency.slice(0, -2)})).subscribe(
      answer => {
        this.currency = currency;
        console.log(answer);
      },
      error => {
        console.log(error);
      }
    );
  }

  changeLanguage(language: string) {
    this.http.post(`${environment.serverUrl}/${apiUrls.language}`, JSON.stringify({language})).subscribe(
      answer => {
        this.language = language;
        console.log(answer);
      },
      error => {
        console.log(error);
      }
    );
  }

  setUserPresets(userPresets: UserPresets) {
    this.language = userPresets.language;
    const currency = currencyList.find(currencyConfig => currencyConfig.name === userPresets.currencyName);
    this.currency = `${currency.name} ${currency.symbol}`;
  }

  setDefaultPresets() {
    console.log('set');
    this.currency = dropDownMenuConfig.currency.menuItems[0].name + ' ' + dropDownMenuConfig.currency.menuItems[0].symbol;
    this.language = dropDownMenuConfig.language.menuItems[0].name;
  }
}
