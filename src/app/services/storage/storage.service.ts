import { Injectable } from '@angular/core';

import { storageKeys } from '../../global-constants/storage-keys';
import { CostItemConfig } from '../../pages/application/pages/main/interfaces/expense-item-config.interface';
import { UserPresets } from '../../pages/authorization/interfaces/user-presets.interface';
import { UserSettings } from '../../interfaces/user-settings.interface';
import { CostCategoryColorList } from '../../pages/application/pages/main/interfaces/cost-color-list.interface';

@Injectable()
export class StorageService {

  getCostCategoryNameFromStorage() {
    const categoryList = this.getStorageElement<CostItemConfig[]>(storageKeys.customCategoryList);
    return categoryList ? categoryList.map(costCategory => costCategory.name) : [];
  }

  updateLocalPresets(presetName: string, presetValue: string) {
    const stringifyPresets = localStorage.getItem(storageKeys.presets);
    const presets: UserPresets = stringifyPresets ? JSON.parse(stringifyPresets) : {};
    presets[presetName] = presetValue;
    localStorage.setItem(storageKeys.presets, JSON.stringify(presets));
  }

  saveUserSettingInStorage(userSettings: UserSettings) {
    localStorage.setItem(storageKeys.userSettings, JSON.stringify(userSettings));
  }

  saveCostColorsInStorage(costColors: CostCategoryColorList) {
    localStorage.setItem(storageKeys.costColors, JSON.stringify(costColors));
  }

  saveCostCategoryListInStorage(costCategoryList: CostItemConfig[]) {
    localStorage.setItem(storageKeys.customCategoryList, JSON.stringify(costCategoryList));
  }


  getStorageElement<T>(elementName: string): T {
    return JSON.parse(localStorage.getItem(elementName));
  }

}
