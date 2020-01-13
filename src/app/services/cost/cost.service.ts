import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable()
export class CostService {

  currentCostColorList: CostCategoryColorList = {};
  currentCostList: BehaviorSubject<UserCosts[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
  ) {
  }

  get currentCostsName() {
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
    return this.currentCostsName.map(costCategory => {
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
      this.addNewCategoryInCurrentCostList(costDto);
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

  addNewCategoryInCurrentCostList(costDto: CostDto) {
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
    return this.currentCostList.getValue().some(costCategory => {
      return costCategory._id === categoryName;
    });
  }

  updateCurrentCostList(
    startDate: number = new Date(Date.now()).setHours(0, 0, 0, 0),
    endDate: number = new Date(Date.now()).setHours(0, 0, 0, 0) + timeIntervalConst.day) {
    this.getCurrentAllUserCosts(startDate, endDate).subscribe(
      costList => {
        this.setUserCurrentCostList(costList as UserCosts[]);
      }
    );
  }

  setUserCurrentCostList(costsList: UserCosts[]) {
    this.currentCostList.next(costsList);
  }

  setCostColorList() {
    expenseItems.map(categoryConfig => {
      this.currentCostColorList[categoryConfig.name] = categoryConfig.color;
    });
    localStorage.setItem(storageConstants.costColors, JSON.stringify(this.currentCostColorList));
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

  getUserCategoryCostList(categoryName: string, startDate: number, endDate: number) {
    const categoryCostList = this.currentCostList.getValue().find(costCategory => costCategory._id === categoryName).costList;
    return this.filterCostListByDateInterval(categoryCostList, startDate, endDate);
  }

  filterCostListByDateInterval(costList: CostDto[], startDate: number, endDate: number) {
    return costList.filter(cost => cost.costDate > startDate && cost.costDate < endDate);
  }
}
