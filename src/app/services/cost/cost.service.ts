import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CostDto } from '../../interfaces/cost-dto.intarfece';
import { UserCosts } from '../../../authorization/interfaces/user-costs.interface';
import { apiUrls } from '../../../../global-constants/api-urls';
import { UserService } from '../../../../services/user/user.service';

@Injectable()
export class CostService {

  allCostList: UserCosts[] = [];
  currentCostList: UserCosts[] = [];

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    console.log('chet');
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

  // getAllUserCosts(startDate: number, endDate: number) {
  //   this.http.get(`${environment.serverUrl}/${apiUrls.getAllUserCosts}` + `/${startDate}/${endDate}`).subscribe(
  //     costsList => {
  //       this.setCurrentCostList(costsList as UserCosts[]);
  //     }
  //   );
  // }

  getAllUserCosts(startDate: number, endDate: number) {
    const allUserCosts = this.getCurrentAllUserCosts(startDate, endDate);
    this.setCurrentCostList( allUserCosts);
  }

  setCurrentCostList(costList: UserCosts[]) {
    this.currentCostList = costList;
  }

  setUserCostList(costsList: UserCosts[]) {
    this.allCostList = costsList;
    console.log(this.allCostList);
  }

  getCurrentAllUserCosts(startDate: number, endDate: number) {
    console.log(this.allCostList);
    // console.log('wefewfwef');
    // const currentCostList: UserCosts[] = JSON.parse(JSON.stringify(this.allCostList));
    // console.log(JSON.stringify(currentCostList, null, 2));
    // currentCostList.map( (costType) => {
    //   costType.costList = costType.costList.filter(cost => cost.costDate > startDate && cost.costDate < endDate);
    //   costType.costSum = costType.costList.reduce((costSum, cost) => {
    //     return costSum + cost.costValue;
    //   }, 0);
    // });
    // console.log(currentCostList);
    // return currentCostList;
    return this.allCostList;
  }
}
