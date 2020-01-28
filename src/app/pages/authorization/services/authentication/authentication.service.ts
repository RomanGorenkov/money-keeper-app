import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLoginData } from '../../interfaces/user-login-data.interface';
import { UserRegistrationData } from '../../interfaces/user-registration-data.interface';
import { LoginAnswer } from '../../interfaces/login-answer.interface';
import { roads } from '../../../../global-constants/roads';
import { storageKeys } from '../../../../global-constants/storage-keys';
import { environment } from '../../../../../environments/environment';
import { apiUrls } from '../../../../global-constants/api-urls';
import { CostService } from '../../../../services/cost/cost.service';
import { PresetService } from '../../../../services/preset/preset.service';
import { CostCategoryService } from '../../../../services/cost-category/cost-category.service';
import { UserService } from '../../../../services/user/user.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private presetService: PresetService,
    private costService: CostService,
    private userService: UserService,
    private costCategoryService: CostCategoryService,
  ) {
  }

  private static setAccessToken(token: string) {
    localStorage.setItem(storageKeys.token, token);
  }

  login(loginFormData: FormGroup) {
    const formData: UserLoginData = loginFormData.value;

    this.sendLoginData(formData.email, formData.password)
      .subscribe(
        loginAnswer => {
          this.setLoginAnswerData(loginAnswer);
          this.router.navigate([roads.app.root]);
        },
      );
  }

  registration(registrationFormData: FormGroup) {
    const formData: UserRegistrationData = registrationFormData.value;

    this.sendRegistrationData(formData)
      .subscribe(
        () => this.router.navigate([roads.authorisation.login])
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate([roads.authorisation.login]);
  }

  private setLoginAnswerData(loginAnswer: LoginAnswer) {
    AuthenticationService.setAccessToken(loginAnswer.access_token);
    this.presetService.setUserPresets(loginAnswer.userPresets);
    this.costCategoryService.setCostCategoryList(loginAnswer.customCategoryList);
    this.costService.setCostList(loginAnswer.userCosts);
    this.userService.setUserSettings(loginAnswer.userSettings);
    this.costCategoryService.setCostColorList();
  }

  private sendLoginData(email: string, password: string) {
    const loginData = {
      username: email,
      password,
    };

    return this.http.post<LoginAnswer>(`${environment.serverUrl}/${apiUrls.login}`, JSON.stringify(loginData));
  }

  private sendRegistrationData(userData: UserRegistrationData) {
    return this.http.post(`${environment.serverUrl}/${apiUrls.registration}`, JSON.stringify(userData));
  }

}
