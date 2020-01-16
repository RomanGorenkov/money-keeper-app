import { ValidatorFn } from '@angular/forms';

export interface FormInput {
  type: string;
  name: string;
  placeholder: string;
  validators: ValidatorFn[];
  defaultImageUrl?: string | ArrayBuffer;
}
