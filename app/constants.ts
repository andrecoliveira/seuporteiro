export const APP_ROUTES = {
  private: {
    painel: '/painel',
    subscription: '/painel/assinatura',
    restaurant: '/painel/restaurante',
    reservas: '/reservas',
  },
  public: {
    home: '/',
    signIn: '/entrar',
    signUp: '/cadastro/informacoes',
    signUpAccount: '/cadastro/conta',
    signUpOtpCode: '/cadastro/otp',
    signPlan: '/cadastro/planos',
    reset: '/redefinir-senha',
    redefinirSenha: '/redefinir-senha',
    createAccount: '/cadastro',
    accessDenied: '/acesso-negado',
  },
}

export enum SessionStorage {
  information = 'information',
}

export enum ROLES {
  ADMIN = 'admin',
  MEMBER = 'member',
  OWNER = 'owner',
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  internalServerError = 500,
}

export enum HttpSupabaseError {
  NO_ROWS = 'PGRST116',
  AUTH_ERROR = 'PGRST123',
  INVALID_DATA = 'PGRST124',
}
