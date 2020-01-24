import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormInput } from '../../../../authorization/interfaces/form-input.interface';
import { FormControls } from '../../../../authorization/interfaces/form-controls.interface';
import { settingInputs } from '../constants/setting-form-config';
import { UserService } from '../../../../../services/user/user.service';
import { InputTypes } from '../../../../../global-constants/input-types';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  inputs: FormInput[] = [];
  settingForm: FormGroup;
  newUserAvatar: string | ArrayBuffer;
  InputTypes = InputTypes;


  constructor(
    public userService: UserService,
  ) {
  }

  ngOnInit() {
    this.inputs = settingInputs;
    this.updateUserSetting();
    this.createForm();
  }

  private createForm() {
    const controls: FormControls = this.inputs.reduce((config, controlConfig) => {
      config[controlConfig.name] = new FormControl('', controlConfig.validators);
      return config;
    }, {});

    this.settingForm = new FormGroup(controls);
  }

  getControl(controlName: string): FormControl {
    return this.settingForm.get(controlName) as FormControl;
  }

  submit(event) {
    const data = new FormData(event.target);
    this.userService.saveUserSettings(data);
    this.settingForm.markAsPristine();
  }

  updateUserSetting() {
    this.userService.uploadLocalUserSettings();
  }

  getNewUserAvatar(avatar: string | ArrayBuffer) {
    this.newUserAvatar = avatar;
  }

}
