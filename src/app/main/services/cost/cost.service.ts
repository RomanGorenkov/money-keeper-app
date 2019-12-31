import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CostDto} from '../../interfaces/cost-dto.intarfece';
import {DateService} from '../date/date.service';
import {UserCosts} from '../../../authorization/interfaces/user-costs.interface';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  currentCostList: UserCosts[] = [];

  constructor(
    private http: HttpClient,
    private dateService: DateService,
  ) {
  }

  addCost(costDto: CostDto) {
    return this.http.post(environment.serverUrl + '/costs/add', JSON.stringify(costDto));
  }

  getUserCategoryCostList(categoryName: string, startDate: number, endDate: number) {
    return this.http.get(environment.serverUrl + `/costs/category/${categoryName}/${startDate}/${endDate}`);
  }

  getAllUserCosts(startDate: number = this.dateService.getTodayDate(), endDate: number = this.dateService.getTomorrowDate()) {
    return this.http.get(environment.serverUrl + `/costs/categories/${startDate}/${endDate}`);
  }

  setCurrentCostList(costList: UserCosts[]) {
    this.currentCostList = costList;
  }
}
