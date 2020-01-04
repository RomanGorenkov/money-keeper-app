import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CostDto } from '../../pages/main/interfaces/cost-dto.intarfece';
import { UserCosts } from '../../pages/authorization/interfaces/user-costs.interface';
import { apiUrls } from '../../global-constants/api-urls';
import { timeIntervalConst } from '../../pages/main/constants/time-interval-const';
import { expenseItems } from '../../pages/main/constants/expense-items-config';
import { BehaviorSubject } from 'rxjs';
import { CostCategoryColorList } from '../../pages/main/interfaces/cost-color-list.interface';

@Injectable()
export class CostService {

  allCostList: UserCosts[] = [];
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
    return  this.currentCostsName.map(costCategory => {
      return this.currentCostColorList[costCategory];
    });
    // return this.currentCostList.getValue().map(cost => {
    //   return cost._id;
    // });
  }

  static sortCostListByDate(costList: CostDto[]) {
    return costList.sort((a, b) => a.costDate < b.costDate ? 1 : -1);
  }

  addCost(costDto: CostDto) {
    return this.http.post(`${environment.serverUrl}/${apiUrls.addCost}`, JSON.stringify(costDto));
  }

  setCurrentCostList(
    startDate: number = new Date(Date.now()).setHours(0, 0, 0, 0),
    endDate: number = new Date(Date.now()).setHours(0, 0, 0, 0) + timeIntervalConst.day) {
    this.currentCostList.next(this.getCurrentAllUserCosts(startDate, endDate));
  }

  setUserCostList(costsList: UserCosts[]) {
    this.allCostList = costsList;
  }

  setCostColorList() {
    expenseItems.map( categoryConfig => {
      this.currentCostColorList[categoryConfig.title] = categoryConfig.color;
    });
  }

  getCurrentAllUserCosts(startDate: number, endDate: number) {
    const currentCostList: UserCosts[] = JSON.parse(JSON.stringify(this.allCostList));
    currentCostList.map((costType) => {
      costType.costList = this.filterCostListByDateInterval(costType.costList, startDate, endDate);
      costType.costSum = costType.costList.reduce((costSum, cost) => {
        return costSum + cost.costValue;
      }, 0);
    });
    return currentCostList.filter(costList => costList.costSum !== 0);
  }

  getUserCategoryCostList(categoryName: string, startDate: number, endDate: number) {
    const categoryCostList = this.currentCostList.getValue().find(costCategory => costCategory._id === categoryName).costList;
    return this.filterCostListByDateInterval(categoryCostList, startDate, endDate);
  }

  filterCostListByDateInterval(costList: CostDto[], startDate: number, endDate: number) {
    return costList.filter(cost => cost.costDate > startDate && cost.costDate < endDate);
  }
}
