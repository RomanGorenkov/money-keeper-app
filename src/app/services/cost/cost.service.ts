import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CostDto } from '../../pages/application/pages/main/interfaces/cost-dto.intarfece';
import { UserCosts } from '../../pages/authorization/interfaces/user-costs.interface';
import { CostCategoryColorList } from '../../pages/application/pages/main/interfaces/cost-color-list.interface';
import { timeIntervalConst } from '../../pages/application/pages/main/constants/time-interval-const';
import { expenseItems } from '../../pages/application/pages/main/constants/expense-items-config';
import { storageConstants } from '../../global-constants/storage-constants';
import { CostApiService } from '../cost-api/cost-api.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class CostService {

  currentCostColorList: CostCategoryColorList = {};
  currentCostList = new BehaviorSubject<UserCosts[]>([]);

  constructor(
    private http: HttpClient,
    private costApiService: CostApiService,
    private storageService: StorageService,
  ) {
  }

  static sortCostListByDate(costList: CostDto[]) {
    return costList.sort((a, b) => a.costDate < b.costDate ? 1 : -1);
  }

  addCost(costDto: CostDto) {
    return this.costApiService.addCost(costDto)
      .pipe(
        tap(() => this.addCostInCurrentCostList(costDto))
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

  checkCostCategoryInCurrentCostList(categoryName: string) {
    return this.currentCostList.getValue().some(costCategory => costCategory._id === categoryName);
  }

  updateCurrentCostList(startDate = this.getStartDate(), endDate = this.getEndDate()) {
    this.costApiService.getCurrentAllUserCosts(startDate, endDate)
      .subscribe(
        costList => this.setUserCurrentCostList(costList),
      );
  }

  filterCostListByDateInterval(costList: CostDto[], startDate: number, endDate: number) {
    return costList.filter(cost => cost.costDate > startDate && cost.costDate < endDate);
  }

  getTotalCost() {
    return this.getCurrentCostsSum().reduce((totalSum, sum) => totalSum + sum, 0);
  }

  getStartDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0);
  }

  getEndDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0) + timeIntervalConst.day;
  }

  getCurrentCostsSum() {
    return this.currentCostList.getValue().map(cost => cost.costSum);
  }

  getCurrentCostsNames() {
    return this.currentCostList.getValue().map(cost => cost._id);
  }

  getCurrentCostsColor() {
    const costColorListFromStorage = this.storageService.getLocalStorageElement(storageConstants.costColors);
    return this.getCurrentCostsNames().map(costCategory => {
      if (this.currentCostColorList[costCategory]) {
        return this.currentCostColorList[costCategory];
      } else {
        return costColorListFromStorage[costCategory];
      }
    });
  }

  getUserCategoryCostList(categoryName: string, startDate: number, endDate: number) {
    const category = this.currentCostList.getValue().find(costCategory => costCategory._id === categoryName);
    if (category) {
      const categoryCostList = category.costList;
      return this.filterCostListByDateInterval(categoryCostList, startDate, endDate);
    }
  }

  getAllCostsNames() {
    const defaultNames = this.getDefaultCostCategoryName();
    const nameFromStorage = this.storageService.getCostCategoryNameFromStorage();
    const currentCostName = this.currentCostList.getValue().map(cost => cost._id);
    return [...new Set([...defaultNames, ...nameFromStorage, ...currentCostName])];
  }

  getDefaultCostCategoryName() {
    return expenseItems.map(costCategory => costCategory.name);
  }

  setTodayAllUserCosts() {
    this.costApiService.getTodayAllUserCosts()
      .subscribe(
        costList => this.setUserCurrentCostList(costList),
      );
  }

  setUserCurrentCostList(costsList: UserCosts[]) {
    this.currentCostList.next(costsList);
  }

}
