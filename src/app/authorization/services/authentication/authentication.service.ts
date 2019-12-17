import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLoginData} from '../../interfaces/user-login-data.interface';
import {FormGroup} from '@angular/forms';
import {UserRegistrationData} from '../../interfaces/user-registration-data.interface';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }

  sendLoginData(email: string, password: string) {
    const loginData = {
      username: email,
      password,
    };
    console.log(loginData);
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<any>('http://localhost:3000/auth/login', JSON.stringify(loginData), config);
  }

  sendRegistrationData(userData: UserRegistrationData) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<any>('http://localhost:3000/auth/registration', JSON.stringify(userData), config);
  }


  login( loginFormData: FormGroup) {
    const formData: UserLoginData = loginFormData.value;
    this.sendLoginData(formData.email, formData.password).subscribe(
      answer => {
        this.setAccessToken(answer.access_token);
        console.log(answer.access_token);
      },
      error => {
        console.log(error);
      },
    );
  }

  registration(registrationFormData: FormGroup) {
    const formData: UserRegistrationData = registrationFormData.value;
    this.sendRegistrationData(formData).subscribe(
      answer => {
        console.log(answer);
      },
      error => {
        console.log(error);
      },
    );
  }

  setAccessToken(token: string) {
    window.localStorage.setItem('token', token);

  }

}
