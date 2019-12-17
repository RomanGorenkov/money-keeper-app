import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationFormService {

  formType: string;

  constructor() {
  }

  get getFormType(): string {
    return this.formType;
  }

  set setFormType(value: string) {
    this.formType = value;
  }

}
