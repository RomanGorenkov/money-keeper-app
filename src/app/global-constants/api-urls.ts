import { ApiUrls } from '../interfaces/api-urls.interface';

export const apiUrls: ApiUrls = {
  login: 'auth/login',
  registration: 'auth/registration',
  currency: 'users/currency',
  language: 'users/language',
  addCost: 'costs/add',
  userSettings: 'users/settings',
  getUserCategoryCostList: 'costs/category',
  getAllUserCosts: 'costs/all-categories',
  addNewUserCostCategory: 'costs/add-category',
  getCustomUserCategory: 'costs/get-custom-categories',
};
