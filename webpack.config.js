export default {
  mode: 'production',
  entry: {
    'web-credential-handler': './index.js'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].min.js',
    library: 'WebCredentialHandler',
    libraryTarget: 'umd'
  }
};
