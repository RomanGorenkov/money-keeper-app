import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserPresets } from '../../pages/authorization/interfaces/user-presets.interface';
import { currencyList } from '../../pages/application/pages/main/constants/currency-list';
import { environment } from '../../../environments/environment';
import { apiUrls } from '../../global-constants/api-urls';
import { storageConstants } from '../../global-constants/storage-constants';
import { languages } from '../../global-constants/languages';
import { currencies } from '../../global-constants/currencies';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../storage/storage.service';
import { CostService } from '../cost/cost.service';
import { DateService } from '../date/date.service';

@Injectable()
export class PresetService {

  currency: string;
  language: string;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private storageService: StorageService,
    private costService: CostService,
    private dateService: DateService,
  ) {
    this.checkLocalPresets();
  }

  get currencySymbol() {
    return this.currency.slice(-1);
  }

  get getLanguage() {
    return this.language;
  }

  get getCurrency() {
    return this.currency;
  }

  changeCurrency(currency: string) {
    this.http.post(`${environment.serverUrl}/${apiUrls.currency}`, JSON.stringify({currency: currency.slice(0, -2)}))
      .subscribe(
        () => this.setCurrency(currency),
      );
  }

  changeLanguage(language: string) {
    this.http.post(`${environment.serverUrl}/${apiUrls.language}`, JSON.stringify({language}))
      .subscribe(
        () => this.setLanguage(language),
      );
  }

  setUserPresets(userPresets: UserPresets) {
    if (JSON.stringify(userPresets) !== '{}') {
      this.setLanguage(userPresets.language);
      this.setCurrencyByName(userPresets.currencyName);
    }
  }


  setUserPresetsFromStorage(userPresets: UserPresets) {
    this.setLanguage(userPresets.language);
    this.setCurrency(userPresets.currency);
  }

  setLanguage(language: string) {
    if (language) {
      this.language = language;
      this.translate.use(language);
      this.storageService.updateLocalPresets('language', language);
    }
  }

  setCurrency(currency: string) {
    if (currency) {
      this.currency = currency;
      this.storageService.updateLocalPresets('currency', currency);
      this.costService.updateCurrentCostList(this.dateService.currentElement.startDate, this.dateService.currentElement.endDate);
    }
  }

  setCurrencyByName(currencyName: string) {
    if (currencyName) {
      const presets: UserPresets = JSON.parse(localStorage.getItem(storageConstants.presets));
      const currency = currencyList.find(currencyConfig => currencyConfig.name === currencyName);
      this.currency = `${currency.name} ${currency.symbol}`;
      presets.currency = this.currency;
      localStorage.setItem(storageConstants.presets, JSON.stringify(presets));
    }
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

}
