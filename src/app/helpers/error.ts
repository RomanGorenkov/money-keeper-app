const username = () => {
  return `errors.username`
}

const minlength = () => {
  return `errors.length`
}

const pattern = () => {
  return `errors.pattern`
}

const required = () => {
  return `errors.required`
}

export const errorListHandlers = {
  username,
  minlength,
  pattern,
  required,
}
