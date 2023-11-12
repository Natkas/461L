

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};

resolve: {
  fallback: {
    crypto: require.resolve('crypto-browserify')
  }
}