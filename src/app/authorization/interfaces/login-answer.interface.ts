import {UserPresets} from './user-presets.interface';

export interface LoginAnswer {
  access_token: string;
  userPresets: UserPresets;
}
