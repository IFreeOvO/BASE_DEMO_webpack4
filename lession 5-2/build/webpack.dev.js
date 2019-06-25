const webpack = require('webpack')

const devConfig = {
  mode: 'development', // 开发模式默认开启sourceMap
  devtool: 'cheap-module-eval-source-map', // 设置为none可以关闭sourcemap,
  devServer: {
    contentBase: './dist', // 监听的文件
    open: true, // 启动webpack-dev-server 时自动打开浏览器
    proxy: {
      '/api': 'http://localhost:8080/'
    },
    hot: true,
    hotOnly: true // 不会自动刷新页面,去掉此项后，文件变动会导致刷新页面
  },
  // entry: {
  //   main: './src/index.js' // main 是指index.js打包时生成的对应名称
  //   // sub: './src/index.js'
  // },
  module: {
    rules: [
      // 解析es6
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader', // 光写这个是不会把es6转es5的
      //   // options: {
      //   //   presets: [['@babel/preset-env', {
      //   //     targets: {
      //   //       edge: "17",
      //   //       firefox: "60",
      //   //       chrome: "67",
      //   //       safari: "11.1"
      //   //     },
      //   //     useBuiltIns: 'entry'
      //   //   }]],
      //   //   "plugins" : [["@babel/plugin-transform-runtime", {
      //   //     "corsjs": 2,
      //   //     "helpers": true,
      //   //     "regenerator": true,
      //   //     "useESModules": false
      //   //   }]]
      //   // }
      // },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //   // use: {
      //   //   loader: 'file-loader', // 适合大的文件用
      //   //   options: {
      //   //     name: '[name]-1.[ext]', // 命名格式
      //   //     outputPath: 'images/' // 存储的文件目录
      //   //   }
      //   // },
      //   use: {
      //     loader: 'url-loader', // 适合小的文件用,可以减少http请求次数。 url-loader依赖file-loader
      //     options: {
      //       name: '[name]-1.[ext]',
      //       outputPath: 'images/',
      //       limit: 1024 // 大小超过1024B即1kb打包成图片,小于的话打包成base64
      //     }
      //   }
      // },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 识别不了字体文件
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 使@import导入的scss模块也能使用sass和postcss模块
              modules: true // 开启css模块化,这样子，在哪个模块里导入css，css则对某个模块起作用，不会影响全局
            }
          },
          'sass-loader',
          'postcss-loader' // postcss可以设置css浏览器厂商前缀
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 识别不了字体文件
          'css-loader',
          'postcss-loader' // postcss可以设置css浏览器厂商前缀
        ]
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)$/, // 打包字体文件
      //   use: {
      //     loader: 'file-loader'
      //   }
      // }
    ]
  },
  plugins: [
    // // 自动生成html,并把生成的js引入到html里
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html'
    // }),
    // // 每次打包前先清除dist文件内容
    // new CleanWebpackPlugin({})
    // 支持模块热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  // optimization: {
  //   usedExports: true // 开发模式下加这个可以开启Tree Shaking
  // },
  output: {
    filename: '[name]_[hash:8].js',// 入口文件都走该配置项
    chunkFilename: '[name].chunk.js',// 间接打包的文件走该配置
    // publicPath: 'https://lib.baomitu.com',  // 如何需要引入js 的cdn地址可以使用这个配置
    // filename: '[name]_[hash:8].js',
    // path: path.resolve(__dirname, 'dist')
  }
}

module.exports = devConfig