module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm start',
      url: ['http://localhost:3000'],
      startServerReadyPattern: 'Server is ready',
      startServerReadyTimeout: 120000,
    },
  },
}
