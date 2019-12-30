import {Injectable} from '@angular/core';
import {dropDownMenuConfig} from '../../constants/dropdown-menu-config';
import {UserPresets} from '../../../authorization/interfaces/user-presets.interface';
import {currencyList} from '../../constants/currency-list';
import {UserService} from '../../../authorization/services/user/user.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class PresetService {

  currency: string;
  language: string;

  constructor(
    private usersService: UserService,
    private http: HttpClient,
  ) {
    this.setDefaultPresets();
    this.subscribeOnUserPreset();
  }


  changeCurrency(currency: string) {
    this.http.post(environment.serverUrl + '/users/currency', JSON.stringify({currency: currency.slice(0, -2)})).subscribe(
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
    this.http.post(environment.serverUrl + '/users/language', JSON.stringify({language: language.slice(0, -1)})).subscribe(
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
    console.log(userPresets);
    this.changeLanguage(userPresets.language);
    const currency = currencyList.filter(currencyConfig => currencyConfig.name === userPresets.currencyName)[0];
    this.changeCurrency(currency.name + ' ' + currency.symbol);
    console.log(this.language, this.currency);
  }

  setDefaultPresets() {
    console.log('set');
    this.currency = dropDownMenuConfig.currency.menuItems[0].name + ' ' + dropDownMenuConfig.currency.menuItems[0].symbol;
    this.language = dropDownMenuConfig.language.menuItems[0].name;
  }

  subscribeOnUserPreset() {
    console.log('sub');
    this.usersService.userPreset.subscribe(
      userPresets => {
        this.setUserPresets(userPresets);
        console.log('event');
      }
    );
  }

}
