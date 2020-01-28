import { Injectable } from '@angular/core';

import { storageKeys } from '../../global-constants/storage-keys';
import { ExpenseItemConfig } from '../../pages/application/pages/main/interfaces/expense-item-config.interface';
import { UserPresets } from '../../pages/authorization/interfaces/user-presets.interface';
import { UserSettings } from '../../interfaces/user-settings.interface';

@Injectable()
export class StorageService {

  getCostCategoryNameFromStorage() {
    const categoryList = this.getLocalStorageElement<ExpenseItemConfig[]>(storageKeys.customCategoryList);
    return categoryList ? categoryList.map(costCategory => costCategory.name) : [];
  }

  updateLocalPresets(presetName: string, presetValue: string) {
    const stringifyPresets = localStorage.getItem(storageKeys.presets);
    const presets: UserPresets = stringifyPresets ? JSON.parse(stringifyPresets) : {};
    presets[presetName] = presetValue;
    localStorage.setItem(storageKeys.presets, JSON.stringify(presets));
  }

  saveUserSettingInLocalStorage(userSettings: UserSettings) {
    localStorage.setItem(storageKeys.userSettings, JSON.stringify(userSettings));
  }

  getLocalStorageElement<T>(elementName: string): T {
    return JSON.parse(localStorage.getItem(elementName));
  }

}
