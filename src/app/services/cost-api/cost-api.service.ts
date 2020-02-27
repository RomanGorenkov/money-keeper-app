import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { CostDto } from '../../pages/application/pages/main/interfaces/cost-dto.intarfece'
import { UserCosts } from '../../pages/authorization/interfaces/user-costs.interface'
import { environment } from '../../../environments/environment'
import { apiUrls } from '../../global-constants/api-urls'

@Injectable()
export class CostApiService {
  constructor(private http: HttpClient) {}

  addCost(costDto: CostDto) {
    return this.http.post(`${environment.serverUrl}/${apiUrls.addCost}`, JSON.stringify(costDto))
  }

  getCurrentAllUserCosts(startDate: number, endDate: number) {
    return this.http.get<UserCosts[]>(`${environment.serverUrl}/${apiUrls.getAllUserCosts}/${startDate}/${endDate}`)
  }

  getTodayAllUserCosts() {
    return this.http.get<UserCosts[]>(`${environment.serverUrl}/${apiUrls.getAllUserCosts}`)
  }
}
