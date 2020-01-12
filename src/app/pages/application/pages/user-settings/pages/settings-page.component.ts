import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  fileData: File = null;
  settingForm: FormGroup;


  constructor(
    public userService: UserService,
  ) {
    this.createSettingForm();
  }

  ngOnInit() {
    this.updateUserSetting();
  }

  submit(event) {
    const data = new FormData(event.target);
    this.userService.saveUserSettings(data);
    this.settingForm.markAsPristine();
  }

  changeAvatar(fileInput: any) {
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
}
