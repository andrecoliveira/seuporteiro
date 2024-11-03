module.exports = {
  ci: {
    collect: {
      url: [`https://${process.env.PREVIEW_URL}/login`],
    },
    assert: {
      preset: 'lighthouse:no-pwa',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
