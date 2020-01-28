import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CostDto } from '../../pages/application/pages/main/interfaces/cost-dto.intarfece';
import { UserCosts } from '../../pages/authorization/interfaces/user-costs.interface';
import { CostCategoryColorList } from '../../pages/application/pages/main/interfaces/cost-color-list.interface';
import { timeIntervalConst } from '../../pages/application/pages/main/constants/time-interval-const';
import { expenseItems } from '../../pages/application/pages/main/constants/expense-items-config';
import { storageKeys } from '../../global-constants/storage-keys';
import { CostApiService } from '../cost-api/cost-api.service';
import { StorageService } from '../storage/storage.service';
import { Direction } from '../../global-constants/direction';

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
    return costList.sort((a, b) => a.costDate < b.costDate ? Direction.Forward : Direction.Back);
  }

  private static getDefaultCostCategoryName() {
    return expenseItems.map(costCategory => costCategory.name);
  }

  addCost(costDto: CostDto) {
    return this.costApiService.addCost(costDto)
      .pipe(
        tap(() => this.addCostInCurrentCostList(costDto))
      );
  }

  changeCostList(startDate = this.getStartDate(), endDate = this.getEndDate()) {
    this.costApiService.getCurrentAllUserCosts(startDate, endDate)
      .subscribe(
        costList => this.setCostList(costList),
      );
  }

  getTotalCost() {
    return this.getCostsSums().reduce((totalSum, sum) => totalSum + sum, 0);
  }

  getStartDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0);
  }

  getEndDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0) + timeIntervalConst.day;
  }

  getCostsSums() {
    return this.currentCostList.getValue().map(cost => cost.costSum);
  }

  getCostsNames() {
    return this.currentCostList.getValue().map(cost => cost._id);
  }

  getCostsColors() {
    const costColorListFromStorage = this.storageService.getLocalStorageElement<CostCategoryColorList>(storageKeys.costColors);
    return this.getCostsNames().map(costCategory => {
      if (this.currentCostColorList[costCategory]) {
        return this.currentCostColorList[costCategory];
      } else {
        return costColorListFromStorage[costCategory];
      }
    });
  }

  getCostListByCategory(categoryName: string, startDate: number, endDate: number) {
    const category = this.currentCostList.getValue().find(costCategory => costCategory._id === categoryName);
    if (category) {
      const categoryCostList = category.costList;
      return this.filterCostListByDateInterval(categoryCostList, startDate, endDate);
    }
  }

  getAllCostsNames() {
    const defaultNames = CostService.getDefaultCostCategoryName();
    const nameFromStorage = this.storageService.getCostCategoryNameFromStorage();
    return [...new Set([...defaultNames, ...nameFromStorage])];
  }

  setTodayCosts() {
    this.costApiService.getTodayAllUserCosts()
      .subscribe(
        costList => this.setCostList(costList),
      );
  }

  setCostList(costsList: UserCosts[]) {
    this.currentCostList.next(costsList);
  }

  private addCostInCurrentCostList(costDto: CostDto) {
    if (this.isCategoryInCostList(costDto.costType)) {
      this.addCostInExistingCategory(costDto);
    } else {
      this.addCostWithCategoryInCostList(costDto);
    }

  }

  private addCostInExistingCategory(costDto: CostDto) {
    const currentCostList = this.currentCostList.getValue().map(costCategory => {
      if (costCategory._id === costDto.costType) {
        costCategory.costList.push(costDto);
        costCategory.costSum += costDto.costValue;
      }
      return costCategory;
    });
    this.currentCostList.next(currentCostList);
  }

  private addCostWithCategoryInCostList(costDto: CostDto) {
    this.currentCostList.getValue().push(
      {
        _id: costDto.costType,
        costSum: costDto.costValue,
        costList: [costDto]
      }
    );
    this.currentCostList.next(this.currentCostList.getValue());
  }

  private isCategoryInCostList(categoryName: string) {
    return this.currentCostList.getValue().some(costCategory => costCategory._id === categoryName);
  }

  private filterCostListByDateInterval(costList: CostDto[], startDate: number, endDate: number) {
    return costList.filter(cost => cost.costDate > startDate && cost.costDate < endDate);
  }

}
