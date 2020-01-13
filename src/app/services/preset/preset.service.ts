import { Injectable } from '@angular/core';
import { dropDownMenuConfig } from '../../pages/application/pages/main/constants/dropdown-menu-config';
import { UserPresets } from '../../pages/authorization/interfaces/user-presets.interface';
import { currencyList } from '../../pages/application/pages/main/constants/currency-list';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { apiUrls } from '../../global-constants/api-urls';
import { storageConstants } from '../../global-constants/storage-constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PresetService {

  currency: string;
  language: string;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    this.checkLocalPresets();
  }

  get getLanguage() {
    return this.language;
  }

  get getCurrency() {
    return this.currency;
  }


  get currencySymbol() {
    return this.currency.slice(-1);
  }


  changeCurrency(currency: string) {
    this.http.post(`${environment.serverUrl}/${apiUrls.currency}`, JSON.stringify({currency: currency.slice(0, -2)})).subscribe(
      () => {
        this.currency = currency;
      },
      error => {
        console.log(error);
      }
    );
  }

  changeLanguage(language: string) {
    this.http.post(`${environment.serverUrl}/${apiUrls.language}`, JSON.stringify({language})).subscribe(
      answer => {
        this.setLanguage(language);
      },
      error => {
        console.log(error);
      }
    );
  }

  setUserPresets(userPresets: UserPresets) {
    this.language = userPresets.language;
    this.translate.use(this.language);
    const currency = currencyList.find(currencyConfig => currencyConfig.name === userPresets.currencyName);
    this.currency = `${currency.name} ${currency.symbol}`;
    localStorage.setItem(storageConstants.presets.language, this.language);
    localStorage.setItem(storageConstants.presets.currency, this.currency);
  }

  setLanguage(language: string) {
    this.language = language;
    this.translate.use(language);
    localStorage.setItem(storageConstants.presets.language, this.language);
  }

  setDefaultPresets() {
    this.currency = dropDownMenuConfig.currency.menuItems[0].name + ' ' + dropDownMenuConfig.currency.menuItems[0].symbol;
    this.language = dropDownMenuConfig.language.menuItems[0].name;
    this.translate.use(this.language);
  }

  checkLocalPresets() {
    if (localStorage.getItem(storageConstants.presets.language) && localStorage.getItem(storageConstants.presets.currency)) {
      this.currency = localStorage.getItem(storageConstants.presets.currency);
      this.language = localStorage.getItem(storageConstants.presets.language);
      this.translate.use(this.language);
    } else {
      this.setDefaultPresets();
    }
  }
}
