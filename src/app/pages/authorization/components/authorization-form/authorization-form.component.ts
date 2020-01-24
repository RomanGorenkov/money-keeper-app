import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { FormInput } from '../../interfaces/form-input.interface';
import { FormControls } from '../../interfaces/form-controls.interface';
import { formConfigs } from '../../constants/form-configs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { InputTypes } from '../../../../global-constants/input-types';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss']
})
export class AuthorizationFormComponent implements OnInit {

  InputTypes = InputTypes;
  formTitle: string;
  inputs: FormInput[];
  authorizationForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.initRouterSubscription();
  }

  getControl(controlName: string): FormControl {
    return this.authorizationForm.get(controlName) as FormControl;
  }

  private initRouterSubscription() {
    this.activateRoute.params
      .subscribe(
        ({type}) => {
          this.formTitle = type;
          this.inputs = formConfigs[type].formInputs;
          this.createForm(type);
        },
      );
  }

  private createForm(type: string) {
    const controls: FormControls = this.inputs.reduce((config, controlConfig) => {
      config[controlConfig.name] = new FormControl('', controlConfig.validators);
      return config;
    }, {});

    this.authorizationForm = new FormGroup(controls, {
      validators: formConfigs[type].externalValidators,
    });
  }

  submitHandler(FormData: FormGroup) {
    this.authenticationService[this.formTitle](FormData);
  }

}
