import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CostDto} from '../../interfaces/cost-dto.intarfece';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  constructor(
    private http: HttpClient,
  ) { }

  addCost(costDto: CostDto) {
    return this.http.post(environment.serverUrl + '/costs/add', JSON.stringify(costDto));
  }

  getUserCategoryCostList(categoryName: string, startDate: number, endDate: number) {
    return this.http.get(environment.serverUrl + `/costs/category/${categoryName}/${startDate}/${endDate}`);
  }
}
