import { Injectable } from '@angular/core';
import { dropDownMenuConfig } from '../../pages/application/pages/main/constants/dropdown-menu-config';
import { UserPresets } from '../../pages/authorization/interfaces/user-presets.interface';
import { currencyList } from '../../pages/application/pages/main/constants/currency-list';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { apiUrls } from '../../global-constants/api-urls';
import { storageConstants } from '../../global-constants/storage-constants';
import { TranslateService } from '@ngx-translate/core';
import { languages } from '../../global-constants/languages';
import { currencies } from '../../global-constants/currencies';

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
        this.setCurrency(currency);
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
    console.log(userPresets);
    if (JSON.stringify(userPresets) === '{}') {
      return;
    } else {
      this.setLanguage(userPresets.language);
      this.setCurrencyByName(userPresets.currencyName);
    }
  }


  setUserPresetsFromStorage(userPresets: UserPresets) {
    this.setLanguage(userPresets.language);
    this.setCurrency(userPresets.currency);
  }

  setLanguage(language: string) {
    if (!language) {
      return;
    }
    this.language = language;
    this.translate.use(language);
    this.updateLocalPresets('language', language);
  }

  setCurrency(currency: string) {
    if (!currency) {
      return;
    }
    this.currency = currency;
    this.updateLocalPresets('currency', currency);
  }

  setCurrencyByName(currencyName: string) {
    if (!currencyName) {
      return;
    }
    const presets: UserPresets = JSON.parse(localStorage.getItem(storageConstants.presets));
    const currency = currencyList.find(currencyConfig => currencyConfig.name === currencyName);
    this.currency = `${currency.name} ${currency.symbol}`;
    presets.currency = this.currency;
    localStorage.setItem(storageConstants.presets, JSON.stringify(presets));
  }

  setDefaultPresets() {
    this.currency = currencies.rub;
    this.language = languages.english;
    this.translate.use(this.language);
  }

  checkLocalPresets() {
    this.setDefaultPresets();
    if (localStorage.getItem(storageConstants.presets)) {
      this.setUserPresetsFromStorage(JSON.parse(localStorage.getItem(storageConstants.presets)));
    }
  }

  updateLocalPresets(presetName: string, presetValue: string) {
    let presets: UserPresets;
    if (localStorage.getItem(storageConstants.presets)) {
      presets = JSON.parse(localStorage.getItem(storageConstants.presets));
    } else {
      presets = {};
    }
    presets[presetName] = presetValue;
    localStorage.setItem(storageConstants.presets, JSON.stringify(presets));
  }
}
