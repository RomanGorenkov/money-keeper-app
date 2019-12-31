import {UserPresets} from './user-presets.interface';
import {CostDto} from '../../main/interfaces/cost-dto.intarfece';
import {UserCosts} from './user-costs.interface';

export interface LoginAnswer {
  access_token: string;
  userPresets: UserPresets;
  userCosts: UserCosts[];
}
