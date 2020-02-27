import { FormInput } from '../../../../authorization/interfaces/form-input.interface'
import { Validators } from '@angular/forms'

export const addExpenseInputs: FormInput[] = [
  {
    type: 'number',
    name: 'costs',
    placeholder: 'addCost.costs',
    validators: [Validators.required, Validators.pattern('^(?!(?:0|0\\.0|0\\.00)$)[+]?\\d+(\\.\\d|\\.\\d[0-9])?$')],
  },
  {
    type: 'text',
    name: 'description',
    placeholder: 'addCost.description',
    validators: [Validators.required, Validators.minLength(6)],
  },
]
