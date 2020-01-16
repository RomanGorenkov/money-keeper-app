import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CostDto } from '../../pages/application/pages/main/interfaces/cost-dto.intarfece';
import { UserCosts } from '../../pages/authorization/interfaces/user-costs.interface';
import { apiUrls } from '../../global-constants/api-urls';
import { timeIntervalConst } from '../../pages/application/pages/main/constants/time-interval-const';
import { expenseItems } from '../../pages/application/pages/main/constants/expense-items-config';
import { BehaviorSubject } from 'rxjs';
import { CostCategoryColorList } from '../../pages/application/pages/main/interfaces/cost-color-list.interface';
import { storageConstants } from '../../global-constants/storage-constants';
import { tap } from 'rxjs/operators';
import { ExpenseItemConfig } from '../../pages/application/pages/main/interfaces/expense-item-config.interface';

@Injectable()
export class CostService {

  costCategoryList: BehaviorSubject<ExpenseItemConfig[]> = new BehaviorSubject<ExpenseItemConfig[]>(expenseItems);
  currentCostColorList: CostCategoryColorList = {};
  currentCostList: BehaviorSubject<UserCosts[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
  ) {
  }

  get getCostCategoryList() {
    return this.currentCostList.getValue();
  }

  get currentCostsNames() {
    return this.currentCostList.getValue().map(cost => {
      return cost._id;
    });
  }

  get currentCostsSum() {
    return this.currentCostList.getValue().map(cost => {
      return cost.costSum;
    });
  }

  get currentCostsColor() {
    const costColorListFromStorage = JSON.parse(localStorage.getItem(storageConstants.costColors));
    return this.currentCostsNames.map(costCategory => {
      if (this.currentCostColorList[costCategory]) {
        return this.currentCostColorList[costCategory];
      } else {
        return costColorListFromStorage[costCategory];
      }
    });
  }

  get totalCost() {
    return this.currentCostsSum.reduce((totalSum, sum) => {
      return totalSum += sum;
    }, 0);
  }

  static sortCostListByDate(costList: CostDto[]) {
    return costList.sort((a, b) => a.costDate < b.costDate ? 1 : -1);
  }

  addCost(costDto: CostDto) {
    return this.http.post(`${environment.serverUrl}/${apiUrls.addCost}`, JSON.stringify(costDto)).pipe(
      tap(() => {
        this.addCostInCurrentCostList(costDto);
      })
    );
  }

  addCostInCurrentCostList(costDto: CostDto) {
    if (this.checkCostCategoryInCurrentCostList(costDto.costType)) {
      this.addNewCostInExistingCategory(costDto);
    } else {
      this.addNewCostInCurrentCostList(costDto);
    }

  }

  addNewCostInExistingCategory(costDto: CostDto) {
    const currentCostList = this.currentCostList.getValue().map(costCategory => {
      if (costCategory._id === costDto.costType) {
        costCategory.costList.push(costDto);
        costCategory.costSum += costDto.costValue;
      }
      return costCategory;
    });
    this.currentCostList.next(currentCostList);
  }

  addNewCostInCurrentCostList(costDto: CostDto) {
    this.currentCostList.getValue().push(
      {
        _id: costDto.costType,
        costSum: costDto.costValue,
        costList: [costDto]
      }
    );
    this.currentCostList.next(this.currentCostList.getValue());
  }

  addNewUserCostCategory(costCategoryData) {
    const headers = new HttpHeaders({
      'x-img': 'categoryImage'
    });
    return this.http.post(`${environment.serverUrl}/${apiUrls.addNewUserCostCategory}`, costCategoryData, {headers});
  }

  addNewUserCostCategoryInCurrentCategoryList(userCostCategory: ExpenseItemConfig) {
    console.log(userCostCategory);
    this.setCostCategoryList([userCostCategory]);
    this.setCostColorList();
  }

  checkCostCategoryInCurrentCostList(categoryName: string) {
    return this.currentCostList.getValue().some(costCategory => {
      return costCategory._id === categoryName;
    });
  }

  updateCurrentCostList(
    startDate: number = new Date(Date.now()).setHours(0, 0, 0, 0),
    endDate: number = new Date(Date.now()).setHours(0, 0, 0, 0) + timeIntervalConst.day) {
    this.getCurrentAllUserCosts(startDate, endDate).subscribe(
      costList => {
        console.log(costList);
        this.setUserCurrentCostList(costList as UserCosts[]);
      }
    );
  }

  filterCostListByDateInterval(costList: CostDto[], startDate: number, endDate: number) {
    return costList.filter(cost => cost.costDate > startDate && cost.costDate < endDate);
  }


  getUserCategoryCostList(categoryName: string, startDate: number, endDate: number) {
    const category = this.currentCostList.getValue().find(costCategory => costCategory._id === categoryName);
    if (!category) {
      return;
    }
    const categoryCostList = category.costList;
    return this.filterCostListByDateInterval(categoryCostList, startDate, endDate);
  }

  getAllCostsNames() {
    const defaultNames = this.getDefaultCostCategoryName();
    const nameFromStorage = this.getCostCategoryNameFromStorage();
    const currentCostName = this.currentCostList.getValue().map(cost => {
      return cost._id;
    });
    return [...new Set([...defaultNames, ...nameFromStorage, ...currentCostName])];
  }

  setCostCategoryListByNameList(categoryNameList: string[]) {
    const customCategoryListFromStorage: ExpenseItemConfig[] = JSON.parse(localStorage.getItem(storageConstants.customCategoryList));
    this.costCategoryList.next(categoryNameList.map(categoryName => {
      if (this.costCategoryList.getValue().some(costCategory => costCategory.name === categoryName)) {
        return this.costCategoryList.getValue().find(costCategory => costCategory.name === categoryName);
      } else {
        return customCategoryListFromStorage.find(costCategory => costCategory.name === categoryName);
      }
    }));
  }

  getDefaultCostCategoryName() {
    return expenseItems.map(costCategory => {
      return costCategory.name;
    });
  }

  getCostCategoryNameFromStorage() {
    const categoryList = JSON.parse(localStorage.getItem(storageConstants.customCategoryList)) as ExpenseItemConfig[];
    if (categoryList === null) {
      return [];
    } else {
      return categoryList.map(costCategory => {
        return costCategory.name;
      });
    }
  }

  getCurrentAllUserCosts(startDate: number, endDate: number) {
    return this.http.get(`${environment.serverUrl}/${apiUrls.getAllUserCosts}/${startDate}/${endDate}`);
  }

  setTodayAllUserCosts() {
    this.http.get(`${environment.serverUrl}/${apiUrls.getAllUserCosts}`).subscribe(
      costList => {
        this.setUserCurrentCostList(costList as UserCosts[]);
      }
    );
  }

  setCostCategoryList(categoryList: ExpenseItemConfig[]) {
    if (categoryList.length !== 0) {
      this.costCategoryList.next([...this.costCategoryList.getValue(), ...categoryList]);
      localStorage.setItem(storageConstants.customCategoryList, JSON.stringify(this.costCategoryList.getValue()));
    }
  }

  setUserCurrentCostList(costsList: UserCosts[]) {
    if (costsList.length === 0) {
      this.currentCostList.next([]);
    } else {
      this.currentCostList.next(costsList);
    }
  }

  setCostColorList() {
    this.costCategoryList.getValue().map(categoryConfig => {
      this.currentCostColorList[categoryConfig.name] = categoryConfig.color;
    });
    localStorage.setItem(storageConstants.costColors, JSON.stringify(this.currentCostColorList));
  }
}
