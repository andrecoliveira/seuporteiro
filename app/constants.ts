export const APP_ROUTES = {
  private: {
    painel: '/painel',
    restaurant: '/painel/restaurante',
    reservas: '/reservas',
  },
  public: {
    home: '/',
    signIn: '/entrar',
    signUp: '/cadastro',
    reset: '/redefinir-senha',
    redefinirSenha: '/redefinir-senha',
    createAccount: '/cadastro',
    accessDenied: '/acesso-negado',
  },
}

export enum ROLES {
  ADMIN = 'admin',
  MEMBER = 'member',
  OWNER = 'owner',
}

export enum HTTP_STATUSCODE {
  NO_ROWS = 'PGRST116',
  AUTH_ERROR = 'PGRST123',
  INVALID_DATA = 'PGRST124',
}
