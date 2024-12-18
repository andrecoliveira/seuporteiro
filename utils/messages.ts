export const messages = {
  form_identifier_not_found:
    'E-mail não encontrado. Verifique se digitou corretamente',
  form_param_format_invalid:
    'O formato informado não é válido. Verifique e tente novamente',
  form_code_incorrect: 'Código incorreto',
  form_password_length_too_short: 'A senha deve ter no mínimo 8 caracteres',
  form_password_pwned:
    'A senha é muito comum ou foi exposta em uma violação de dados. Escolha uma senha mais segura.',
  form_password_incorrect: 'Revise sua senha e tente novamente',
  captcha_invalid: 'Captcha inválido. Tente novamente',
}

export type Messages = keyof typeof messages
