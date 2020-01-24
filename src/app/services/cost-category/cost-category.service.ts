import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ExpenseItemConfig } from '../../pages/application/pages/main/interfaces/expense-item-config.interface';
import { expenseItems } from '../../pages/application/pages/main/constants/expense-items-config';
import { storageConstants } from '../../global-constants/storage-constants';
import { CostService } from '../cost/cost.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpHeader } from '../../global-constants/http-headers';
import { environment } from '../../../environments/environment';
import { apiUrls } from '../../global-constants/api-urls';

@Injectable()
export class CostCategoryService {

  costCategoryList = new BehaviorSubject<ExpenseItemConfig[]>(expenseItems);

  constructor(
    private costService: CostService,
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
    const headers = new HttpHeaders().append(httpHeader.httpHeadersName.xImg, httpHeader.httpHeadersValue.categoryImage);
    return this.http.post<string>(`${environment.serverUrl}/${apiUrls.addNewUserCostCategory}`, costCategoryData, {headers});
  }

  setCostCategoryListByNameList(categoryNameList: string[]) {
    const customCategoryListFromStorage: ExpenseItemConfig[] = JSON.parse(localStorage.getItem(storageConstants.customCategoryList));
    this.costCategoryList.next(categoryNameList.map(categoryName => {
      const value = this.costCategoryList.getValue().find(costCategory => costCategory.name === categoryName);
      return value || customCategoryListFromStorage.find(costCategory => costCategory.name === categoryName);
    }));
  }

  setCostCategoryList(categoryList: ExpenseItemConfig[]) {
    if (categoryList.length) {
      this.costCategoryList.next([...this.costCategoryList.getValue(), ...categoryList]);
      localStorage.setItem(storageConstants.customCategoryList, JSON.stringify(this.costCategoryList.getValue()));
    }
  }

  setCostColorList() {
    this.costCategoryList.getValue().map(categoryConfig => {
      this.costService.currentCostColorList[categoryConfig.name] = categoryConfig.color;
    });
    localStorage.setItem(storageConstants.costColors, JSON.stringify(this.costService.currentCostColorList));
  }

  addNewUserCostCategoryInCurrentCategoryList(userCostCategory: ExpenseItemConfig) {
    this.setCostCategoryList([userCostCategory]);
    this.setCostColorList();
  }

}
