module.exports = {
  entry: {
    'web-credential-handler': './index.js'
  },
  output: {
    filename: '[name].min.js',
    library: 'WebCredentialHandler',
    libraryTarget: 'umd'
  }
};
