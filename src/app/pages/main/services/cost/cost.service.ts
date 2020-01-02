import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CostDto } from '../../interfaces/cost-dto.intarfece';
import { UserCosts } from '../../../authorization/interfaces/user-costs.interface';
import { apiUrls } from '../../../../global-constants/api-urls';

@Injectable()
export class CostService {

  currentCostList: UserCosts[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  get currentCostsName() {
    return this.currentCostList.map(cost => {
      return cost._id;
    });
  }

  get currentCostsSum() {
    return this.currentCostList.map(cost => {
      return cost.costSum;
    });
  }

  addCost(costDto: CostDto) {
    return this.http.post(`${environment.serverUrl}/${apiUrls.addCost}`, JSON.stringify(costDto));
  }

  getUserCategoryCostList(categoryName: string, startDate: number, endDate: number) {
    return this.http.get(`${environment.serverUrl}/${apiUrls.getUserCategoryCostList}` + `/${categoryName}/${startDate}/${endDate}`);
  }

  getAllUserCosts(startDate: number, endDate: number) {
    this.http.get(`${environment.serverUrl}/${apiUrls.getAllUserCosts}` + `/${startDate}/${endDate}`).subscribe(
      costsList => {
        this.setCurrentCostList(costsList as UserCosts[]);
      }
    );
  }

  setCurrentCostList(costList: UserCosts[]) {
    this.currentCostList = costList;
  }
}
