export type MessageKey = keyof typeof messages

export type Message = {
  title: string
  description: string
}

export const messages = {
  invalid_credentials: {
    title: 'Credenciais inválidas',
    description: 'Verifique seu e-mail ou senha e tente novamente',
  },
  email_exists: {
    title: 'Ops!',
    description: 'Este e-mail já está sendo utilizado',
  },
  unexpected_failure: {
    title: 'Ops!',
    description: 'Ocorreu um erro inesperado, tente novamente mais tarde',
  },
  validation_failed: {
    title: 'Ops!',
    description: 'Ocorreu um erro de validação, tente novamente mais tarde',
  },
  no_authorization: {
    title: 'Ops!',
    description: 'Você não tem autorização para realizar esta ação',
  },
  invite_not_found: {
    title: 'Ops!',
    description: 'O convite não foi encontrado',
  },
  email_not_confirmed: {
    title: 'Ops!',
    description: 'O e-mail utilizado ainda não foi confirmado',
  },
  user_already_exists: {
    title: 'Ops!',
    description: 'Este usuário já está sendo utilizado',
  },
  otp_expired: {
    title: 'Ops!',
    description: 'O código de verificação expirou',
  },
  weak_password: {
    title: 'Ops!',
    description: 'A senha é muito fraca',
  },
}
