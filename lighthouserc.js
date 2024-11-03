module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn build && yarn start',
      url: ['http://localhost:3000'],
      startServerReadyPattern: 'Server is ready',
      startServerReadyTimeout: 120000,
    },
  },
}
