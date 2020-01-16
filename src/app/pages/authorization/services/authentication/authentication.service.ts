import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginData } from '../../interfaces/user-login-data.interface';
import { FormGroup } from '@angular/forms';
import { UserRegistrationData } from '../../interfaces/user-registration-data.interface';
import { routing } from '../../../../global-constants/routing';
import { Router } from '@angular/router';
import { LoginAnswer } from '../../interfaces/login-answer.interface';
import { PresetService } from '../../../../services/preset/preset.service';
import { CostService } from '../../../../services/cost/cost.service';
import { storageConstants } from '../../../../global-constants/storage-constants';
import { environment } from '../../../../../environments/environment';
import { apiUrls } from '../../../../global-constants/api-urls';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private presetService: PresetService,
    private costService: CostService,
  ) {
  }

  static setAccessToken(token: string) {
    localStorage.setItem(storageConstants.token, token);
  }

  sendLoginData(email: string, password: string) {
    const loginData = {
      username: email,
      password,
    };
    const config = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post<any>(`${environment.serverUrl}/${apiUrls.login}`, JSON.stringify(loginData), config);
  }

  sendRegistrationData(userData: UserRegistrationData) {
    const config = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post<any>(`${environment.serverUrl}/${apiUrls.registration}`, JSON.stringify(userData), config);
  }


  login(loginFormData: FormGroup) {
    const formData: UserLoginData = loginFormData.value;
    this.sendLoginData(formData.email, formData.password).subscribe(
      loginAnswer => {
        this.setLoginAnswerData(loginAnswer as LoginAnswer);
        this.router.navigate([routing.app.root]);
      },
      error => {
        console.log(error);
      },
    );
  }

  registration(registrationFormData: FormGroup) {
    const formData: UserRegistrationData = registrationFormData.value;
    this.sendRegistrationData(formData).subscribe(
      () => {
        this.router.navigate([routing.authorisation.login]);
      },
      error => {
        console.log(error);
      },
    );
  }

  private setLoginAnswerData(loginAnswer: LoginAnswer) {
    console.log(loginAnswer);
    AuthenticationService.setAccessToken(loginAnswer.access_token);
    this.presetService.setUserPresets(loginAnswer.userPresets);
    this.costService.setCostCategoryList(loginAnswer.customCategoryList);
    this.costService.setUserCurrentCostList(loginAnswer.userCosts);
    this.costService.setCostColorList();
  }
}
