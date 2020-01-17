import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../services/user/user.service';
import { FormInput } from '../../../../authorization/interfaces/form-input.interface';
import { settingInputs } from '../constants/setting-form-config';
import { FormControls } from '../../../../authorization/interfaces/form-controls.interface';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  fileData: File = null;
  inputs: FormInput[];
  settingForm: FormGroup;
  newUserAvatar: string | ArrayBuffer;


  constructor(
    public userService: UserService,
  ) {
    // this.createSettingForm();
  }

  ngOnInit() {
    this.inputs = settingInputs;
    this.createForm();
    this.updateUserSetting();
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

    // data.append()
    this.userService.saveUserSettings(data);
    this.settingForm.markAsPristine();
  }

  changeAvatar(fileInput: any) {
    if (fileInput.target.files.length === 0) {
      this.settingForm.markAsPristine();
      return;
    }
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.userService.setUserAvatarUrl(reader.result);
    };
  }

  createSettingForm() {
    this.settingForm = new FormGroup({
      username: new FormControl(''),
      avatarFile: new FormControl('')
    });
  }

  updateUserSetting() {
    this.userService.updateUserName().subscribe();
  }

  getNewUserAvatar(avatar: string | ArrayBuffer) {
    this.newUserAvatar = avatar;
  }
}
