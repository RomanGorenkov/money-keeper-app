import { UserPresets } from './user-presets.interface';
import { UserCosts } from './user-costs.interface';
import { ExpenseItemConfig } from '../../application/pages/main/interfaces/expense-item-config.interface';
import { UserSettings } from '../../../interfaces/user-settings.interface';

export interface LoginAnswer {
  access_token: string;
  userPresets: UserPresets;
  userCosts: UserCosts[];
  userSettings: UserSettings;
  customCategoryList: ExpenseItemConfig[];
}
