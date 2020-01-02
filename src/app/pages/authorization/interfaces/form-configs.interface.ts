import { FormInput } from './form-input.interface';
import { ValidatorFn } from '@angular/forms';

export interface FormConfigs {
  [configName: string]: {
    formInputs: FormInput[];
    externalValidators: ValidatorFn[];
  };
}

