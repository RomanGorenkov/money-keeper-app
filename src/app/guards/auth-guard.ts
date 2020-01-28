import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { roads } from '../global-constants/roads';
import { storageKeys } from '../global-constants/storage-keys';
import { CostService } from '../services/cost/cost.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private jwtHelper: JwtHelperService,
    private costService: CostService,
  ) {
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate([roads.authorisation.login]);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(storageKeys.token);

    if (this.jwtHelper.isTokenExpired(token)) {
      this.checkCurrentCostList();
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  checkCurrentCostList() {
    if (!this.costService.currentCostList.getValue().length) {
      this.costService.setTodayCosts();
    }
  }

}
