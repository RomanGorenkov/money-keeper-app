import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { routing } from '../global-constants/routing';
import { storageConstants } from '../global-constants/storage-constants';
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
      this.router.navigate([routing.authorisation.login]);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(storageConstants.token);

    this.checkCurrentCostList();
    return !this.jwtHelper.isTokenExpired(token);
  }

  checkCurrentCostList() {
    if (this.costService.currentCostList.getValue().length === 0) {
      this.costService.setTodayAllUserCosts();
    }
  }

}
