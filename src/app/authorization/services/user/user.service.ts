import {EventEmitter, Injectable} from '@angular/core';
import {UserPresets} from '../../interfaces/user-presets.interface';

@Injectable()
export class UserService {
  userPreset: EventEmitter<UserPresets> = new EventEmitter<UserPresets>();
}
