import {CostDto} from '../../main/interfaces/cost-dto.intarfece';

export interface UserCosts {
  _id: string;
  costSum: number;
  costList: CostDto[];
}
