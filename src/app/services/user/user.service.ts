import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserSettings } from '../../interfaces/user-settings.interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  private username: string;
  private userAvatarUrl = '../../../assets/img/Paul-18-512.png';

  constructor(
    private http: HttpClient,
  ) {
  }

  get userSettings() {
    const settings: UserSettings = {
      username: this.username,
      userAvatarUrl: this.userAvatarUrl,
    };
    return settings;
  }

  setUserAvatarUrl(url: any) {
    this.userAvatarUrl = url;
  }

  updateUserName() {
    return this.http.get(`${environment.serverUrl}/users/settings`).pipe(
      tap(userSettings => {
        const settings = userSettings as UserSettings;
        for (const settingsKey in settings) {
          if (settings[settingsKey]) {
            this[settingsKey] = settings[settingsKey];
          }
        }
      })
    );
  }

  saveUserSettings(userSettings) {
    const headers = new HttpHeaders({
      'x-img': 'userAvatar'
    });
    return this.http.post(`${environment.serverUrl}/users/settings`, userSettings, {headers}).subscribe();
  }

}
