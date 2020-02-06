import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CostItemConfig } from '../../pages/application/pages/main/interfaces/expense-item-config.interface';
import { expenseItems } from '../../pages/application/pages/main/constants/expense-items-config';
import { storageKeys } from '../../global-constants/storage-keys';
import { httpHeader } from '../../global-constants/http-headers';
import { environment } from '../../../environments/environment';
import { apiUrls } from '../../global-constants/api-urls';
import { CostService } from '../cost/cost.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class CostCategoryService {

  costCategoryList = new BehaviorSubject<CostItemConfig[]>(expenseItems);

  constructor(
    private costService: CostService,
    private storageService: StorageService,
    private http: HttpClient,
  ) {
  }

  addNewCostCategoryInCurrentCategoryList(categoryImageUrl: string, costCategoryData: CostItemConfig) {
    const newCategory = costCategoryData;

    newCategory.imageUrl = categoryImageUrl;
    newCategory.name = newCategory.name.toLowerCase();
    this.addNewUserCostCategoryInCurrentCategoryList(newCategory);
  }

  addNewUserCostCategory(costCategoryData) {
    const headers = new HttpHeaders().append(httpHeader.name.xImg, httpHeader.value.categoryImage);

    return this.http.post<string>(`${environment.serverUrl}/${apiUrls.addNewUserCostCategory}`, costCategoryData, {headers});
  }

  setCostCategoryListByNameList(categoryNameList: string[]) {
    const customCategoryListFromStorage = this.storageService.getStorageElement<CostItemConfig[]>(storageKeys.customCategoryList);

    this.costCategoryList.next(categoryNameList.map(categoryName => {
      const value = this.costCategoryList.getValue().find(costCategory => costCategory.name === categoryName);

      return value || customCategoryListFromStorage.find(costCategory => costCategory.name === categoryName);
    }));
  }

  setCostCategoryList(categoryList: CostItemConfig[]) {
    if (categoryList.length) {
      this.costCategoryList.next([...this.costCategoryList.getValue(), ...categoryList]);
      this.storageService.saveCostCategoryListInStorage(this.costCategoryList.getValue());
    }
  }

  setCostColorList() {
    this.costCategoryList.getValue().map(categoryConfig => {
      this.costService.currentCostColorList[categoryConfig.name] = categoryConfig.color;
    });
    this.storageService.saveCostColorsInStorage(this.costService.currentCostColorList);
  }

  private addNewUserCostCategoryInCurrentCategoryList(userCostCategory: CostItemConfig) {
    this.setCostCategoryList([userCostCategory]);
    this.setCostColorList();
  }

}
