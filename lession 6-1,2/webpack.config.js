const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  // 作用是先从node_modules里查找模块,如果没有再从loaders里查找
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: 'replaceLoader'
          },
          {
            loader: 'replaceLoaderAsync',
            options: {
              name: 'myname'
            }
          },
          // {
          //   loader: path.resolve(__dirname,'loaders/replaceLoader.js')
          // },
          // {
          //   loader: path.resolve(__dirname,'loaders/replaceLoaderAsync.js'),
          //   options: {
          //     name: 'myname'
          //   }
          // },
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}