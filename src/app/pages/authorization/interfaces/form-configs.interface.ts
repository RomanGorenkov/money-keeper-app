import { ValidatorFn } from '@angular/forms'

import { FormInput } from './form-input.interface'

export interface FormConfigs {
  [configName: string]: {
    formInputs: FormInput[]
    externalValidators: ValidatorFn[]
  }
}
