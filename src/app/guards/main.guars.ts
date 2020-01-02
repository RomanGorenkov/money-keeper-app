import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { routing } from '../global-constants/routing';
import { storageConstants } from '../global-constants/storage-constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private jwtHelper: JwtHelperService,
  ) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate([routing.authorisation.login]);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(storageConstants.token);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
