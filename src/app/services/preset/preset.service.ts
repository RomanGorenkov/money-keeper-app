import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core'

import { UserPresets } from '../../pages/authorization/interfaces/user-presets.interface'
import { currencyList } from '../../pages/application/pages/main/constants/currency-list'
import { environment } from '../../../environments/environment'
import { apiUrls } from '../../global-constants/api-urls'
import { storageKeys } from '../../global-constants/storage-keys'
import { languages } from '../../global-constants/languages'
import { currencies } from '../../global-constants/currencies'
import { StorageService } from '../storage/storage.service'
import { CostService } from '../cost/cost.service'
import { DateService } from '../date/date.service'

@Injectable()
export class PresetService {
  currency: string
  language: string

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private storageService: StorageService,
    private costService: CostService,
    private dateService: DateService
  ) {
    this.checkLocalPresets()
  }

  get currencySymbol() {
    return this.currency.split(' ').pop()
  }

  get getLanguage() {
    return this.language
  }

  get getCurrency() {
    return this.currency
  }

  changeCurrency(currency: string) {
    console.log(currency)
    this.http
      .post(`${environment.serverUrl}/${apiUrls.currency}`, JSON.stringify({ currency: currency.split(' ').shift() }))
      .subscribe(() => this.setCurrency(currency))
  }

  changeLanguage(language: string) {
    this.http
      .post(`${environment.serverUrl}/${apiUrls.language}`, JSON.stringify({ language }))
      .subscribe(() => this.setLanguage(language))
  }

  setUserPresets(userPresets: UserPresets) {
    if (Object.keys(userPresets).length) {
      this.setLanguage(userPresets.language)
      this.setCurrencyByName(userPresets.currencyName)
    }
  }

  private setUserPresetsFromStorage(userPresets: UserPresets) {
    this.setLanguage(userPresets.language)
    this.setCurrency(userPresets.currency)
  }

  private setLanguage(language: string) {
    if (language) {
      this.language = language
      this.translate.use(language)
      this.storageService.updateLocalPresets('language', language)
    }
  }

  private setCurrency(currency: string) {
    if (currency) {
      this.currency = currency
      this.storageService.updateLocalPresets('currency', currency)
      this.costService.changeCostList(
        this.dateService.currentElement.startDate,
        this.dateService.currentElement.endDate
      )
    }
  }

  private setCurrencyByName(currencyName: string) {
    if (currencyName) {
      const currency = currencyList.find(currencyConfig => currencyConfig.name === currencyName)

      this.currency = `${currency.name} ${currency.symbol}`
      this.storageService.updateLocalPresets('currency', this.currency)
    }
  }

  private setDefaultPresets() {
    this.currency = currencies.rub
    this.language = languages.english
    this.translate.use(this.language)
  }

  private checkLocalPresets() {
    this.setDefaultPresets()
    if (localStorage.getItem(storageKeys.presets)) {
      this.setUserPresetsFromStorage(this.storageService.getStorageElement<UserPresets>(storageKeys.presets))
    }
  }
}
