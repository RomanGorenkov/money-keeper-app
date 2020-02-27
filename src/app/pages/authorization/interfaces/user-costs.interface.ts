import { CostDto } from '../../application/pages/main/interfaces/cost-dto.intarfece'

export interface UserCosts {
  _id: string
  costSum: number
  costList: CostDto[]
}
