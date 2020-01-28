import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ExpenseItemConfig } from '../../pages/application/pages/main/interfaces/expense-item-config.interface';
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

  costCategoryList = new BehaviorSubject<ExpenseItemConfig[]>(expenseItems);

  constructor(
    private costService: CostService,
    private storageService: StorageService,
    private http: HttpClient,
  ) {
  }

  addNewCostCategoryInCurrentCategoryList(categoryImageUrl: string, costCategoryData: ExpenseItemConfig) {
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
    const customCategoryListFromStorage = this.storageService.getLocalStorageElement<ExpenseItemConfig[]>(storageKeys.customCategoryList);

    this.costCategoryList.next(categoryNameList.map(categoryName => {
      const value = this.costCategoryList.getValue().find(costCategory => costCategory.name === categoryName);

      return value || customCategoryListFromStorage.find(costCategory => costCategory.name === categoryName);
    }));
  }

  setCostCategoryList(categoryList: ExpenseItemConfig[]) {
    if (categoryList.length) {
      this.costCategoryList.next([...this.costCategoryList.getValue(), ...categoryList]);
      localStorage.setItem(storageKeys.customCategoryList, JSON.stringify(this.costCategoryList.getValue()));
    }
  }

  setCostColorList() {
    this.costCategoryList.getValue().map(categoryConfig => {
      this.costService.currentCostColorList[categoryConfig.name] = categoryConfig.color;
    });
    localStorage.setItem(storageKeys.costColors, JSON.stringify(this.costService.currentCostColorList));
  }

  private addNewUserCostCategoryInCurrentCategoryList(userCostCategory: ExpenseItemConfig) {
    this.setCostCategoryList([userCostCategory]);
    this.setCostColorList();
  }

}
