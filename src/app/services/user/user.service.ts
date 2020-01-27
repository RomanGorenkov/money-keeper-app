import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserSettings } from '../../interfaces/user-settings.interface';
import { environment } from '../../../environments/environment';
import { httpHeader } from '../../global-constants/http-headers';
import { apiUrls } from '../../global-constants/api-urls';
import { storageConstants } from '../../global-constants/storage-constants';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UserService {

  private username: string;
  private userAvatarUrl = '../../../assets/img/userAvatar.png';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
  }

  get userSettings(): UserSettings {
    return {
      username: this.username,
      userAvatarUrl: this.userAvatarUrl,
    };
  }

  uploadLocalUserSettings() {
    const userSettings: UserSettings = this.storageService.getLocalStorageElement(storageConstants.userSettings);

    this.updateUserSettings(userSettings);
  }

  updateUserSettings(userSettings: UserSettings) {
    if (userSettings) {
      Object.entries(userSettings).forEach(([key, value]) => this[key] = value);
    }
  }

  saveUserSettings(userSettings) {
    const headers = new HttpHeaders().append(httpHeader.httpHeadersName.xImg, httpHeader.httpHeadersValue.userAvatar);

    return this.http.post<UserSettings>(`${environment.serverUrl}/${apiUrls.userSettings}`, userSettings, {headers})
      .subscribe(
        (settings) => {
          this.setUserSettings(settings);
        },
      );
  }

  setUserSettings(userSettings: UserSettings) {
    this.updateUserSettings(userSettings);
    this.storageService.saveUserSettingInLocalStorage(this.userSettings);
  }

}
