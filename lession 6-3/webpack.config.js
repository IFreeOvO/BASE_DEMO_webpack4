const path = require('path')
const CopyRightWebpackPlugin = require('./plugins/copy-right-webpack-plugin.js')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  plugins: [
    new CopyRightWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}