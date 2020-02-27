import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { UserSettings } from '../../interfaces/user-settings.interface'
import { environment } from '../../../environments/environment'
import { httpHeader } from '../../global-constants/http-headers'
import { apiUrls } from '../../global-constants/api-urls'
import { storageKeys } from '../../global-constants/storage-keys'
import { StorageService } from '../storage/storage.service'

@Injectable()
export class UserService {
  private username: string
  private userAvatarUrl = '../../../assets/img/userAvatar.png'

  constructor(private http: HttpClient, private storageService: StorageService) {}

  get userSettings(): UserSettings {
    return {
      username: this.username,
      userAvatarUrl: this.userAvatarUrl,
    }
  }

  uploadLocalUserSettings() {
    const userSettings = this.storageService.getStorageElement<UserSettings>(storageKeys.userSettings)

    this.updateUserSettings(userSettings)
  }

  saveUserSettings(userSettings) {
    const headers = new HttpHeaders().append(httpHeader.name.xImg, httpHeader.value.userAvatar)

    return this.http
      .post<UserSettings>(`${environment.serverUrl}/${apiUrls.userSettings}`, userSettings, { headers })
      .subscribe(settings => {
        this.setUserSettings(settings)
      })
  }

  setUserSettings(userSettings: UserSettings) {
    this.updateUserSettings(userSettings)
    this.storageService.saveUserSettingInStorage(this.userSettings)
  }

  private updateUserSettings(userSettings: UserSettings) {
    if (userSettings) {
      Object.entries(userSettings).forEach(([key, value]) => (this[key] = value))
    }
  }
}
