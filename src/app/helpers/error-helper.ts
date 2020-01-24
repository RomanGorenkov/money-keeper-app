import { ValidationErrors } from '@angular/forms';

const username = (error: ValidationErrors) => {
  return `errors.username`;
};

const minlength = (error: ValidationErrors) => {
  return `errors.length`;
};

const pattern = (error: ValidationErrors) => {
  return `errors.pattern`;
};

const required = (error: ValidationErrors) => {
  return `errors.required`;
};

export const errorListHandlers = {
  username,
  minlength,
  pattern,
  required,
};
