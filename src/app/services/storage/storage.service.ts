import { Injectable } from '@angular/core';

import { storageConstants } from '../../global-constants/storage-constants';
import { ExpenseItemConfig } from '../../pages/application/pages/main/interfaces/expense-item-config.interface';
import { UserPresets } from '../../pages/authorization/interfaces/user-presets.interface';
import { UserSettings } from '../../interfaces/user-settings.interface';

@Injectable()
export class StorageService {

  getCostCategoryNameFromStorage() {
    const categoryList = this.getLocalStorageElement(storageConstants.customCategoryList) as ExpenseItemConfig[];
    return categoryList ? categoryList.map(costCategory => costCategory.name) : [];
  }

  updateLocalPresets(presetName: string, presetValue: string) {
    const stringifyPresets = localStorage.getItem(storageConstants.presets);
    const presets: UserPresets = stringifyPresets ? JSON.parse(stringifyPresets) : {};
    presets[presetName] = presetValue;
    localStorage.setItem(storageConstants.presets, JSON.stringify(presets));
  }

  saveUserSettingInLocalStorage(userSettings: UserSettings) {
    localStorage.setItem(storageConstants.userSettings, JSON.stringify(userSettings));
  }

  getLocalStorageElement(elementName: string) {
    return JSON.parse(localStorage.getItem(elementName));
  }

}
