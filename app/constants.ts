export const APP_ROUTES = {
  private: {
    painel: '/painel',
    onboarding: {
      initial: '/onboarding',
      plans: '/onboarding/planos',
      accomplished: '/onboarding/concluido',
    },
    polls: '/painel/enquetes',
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
