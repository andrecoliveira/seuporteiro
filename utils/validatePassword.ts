function validateStringLength(str: string) {
  return str.length >= 8
}

function validateStringCase(str: string) {
  const hasUpperCase = /[A-Z]/.test(str)
  const hasLowerCase = /[a-z]/.test(str)
  return hasUpperCase && hasLowerCase
}

function validateContainsNumber(str: string) {
  const hasNumber = /\d/.test(str)
  return hasNumber
}

function validateContainsSpecialCharacter(str: string) {
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(str)
  return hasSpecialCharacter
}

function validatePassword(password: string) {
  return (
    validateStringLength(password) &&
    validateStringCase(password) &&
    validateContainsNumber(password) &&
    validateContainsSpecialCharacter(password)
  )
}

export {
  validateStringLength,
  validateStringCase,
  validateContainsNumber,
  validateContainsSpecialCharacter,
  validatePassword,
}
