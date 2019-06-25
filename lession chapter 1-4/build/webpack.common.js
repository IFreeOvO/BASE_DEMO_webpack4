const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const proConfig = require('./webpack.prod.js')

const commonConfig = {
  entry: {
    // lodash: './src/lodash.js', // 打包顺序很重要
    main: './src/index.js'
  },
  module: {
    rules: [
      // 解析es6
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          // {
          //   loader: 'imports-loader?this=>window'  // imports-loader 这个可以把js文件里的this指向window
          // }
        ]
        // loader: 'babel-loader' // 光写这个是不会把es6转es5的,需要配合env
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader', // 适合小的文件用,可以减少http请求次数。 url-loader依赖file-loader
          options: {
            name: '[name]-1.[ext]',
            outputPath: 'images/',
            limit: 1024 // 大小超过1024B即1kb打包成图片,小于的话打包成base64
          }
        }
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader', // 识别不了字体文件
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 2, // 使@import导入的scss模块也能使用sass和postcss模块
      //         modules: true // 开启css模块化,这样子，在哪个模块里导入css，css则对某个模块起作用，不会影响全局
      //       }
      //     },
      //     'sass-loader',
      //     'postcss-loader' // postcss可以设置css浏览器厂商前缀
      //   ]
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // 打包字体文件
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    // 自动生成html,并把生成的js引入到html里
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // 每次打包前先清除dist文件内容
    new CleanWebpackPlugin({}),
    new webpack.ProvidePlugin({
      $: 'jquery', // 当webpack发现文件里有$这个变量时，会自动导入jquery这个模块
      _join: ['lodash', 'join'] // 使用变量_join 会引入lodash里的join方法
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime' // 旧版本webpack打包时，如果输出文件名有[contenthash]也无法实现 文件没修改就不改变hash , 此时配置这个可以解决问题
    },
    // 开启tree shaking
    usedExports: true,
    // 代码自动分离
    splitChunks: {
      chunks: 'all', // 对异步还是同步代码进行分离打包,如果需要对同步代码进行分割则需要与cacheGroups:vendors一起搭配使用才有效果,'initial'是对同步代码进行分割
      // minSize: 30000, // 大于30kb才进行代码分割
      // // maxSize: 0, // 打包后的文件大小如果大于这个值,则进行二次打包
      // minChunks: 1, // 项目打包后的文件如果有多个文件导入的文件相同，且至少被引用几次，才会进行分割
      // maxAsyncRequests: 5, // 分离打包后若产生了5个文件，则之后的导入不再进行代码分割了
      // maxInitialRequests: 3, // 入口文件最多分割出三个包
      // automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: {
        // 一条规则对应一个打包组,vendors和default分别是一个组,符合匹配规则的代码块会打包到同一个组里
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 检测静态引入的依赖是否是这个目录下引入的,是则按这套规则打包
          priority: -10, // 打包时如果引入的代码块满足多个组的匹配条件,则根据优先级，打包到优先级更高的组里
          // filename: 'vendors.js' // 给打包文件取名,好像不起作用
          name: 'myPack' // 自定义打包文件名
        }
        // default: {
        //   // minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true // 复用已经被打包过的模块
        // }
      }
    }
  },
  performance: false, // 引入第三方库文件过大时编辑器控制台会报出黄色警告，这个配置可以关闭性能提示
  output: {
    // publicPath: 'https://lib.baomitu.com',  // 如何需要引入js 的cdn地址可以使用这个配置
    // filename: '[name]_[hash:8].js',// 入口文件都走该配置项
    // chunkFilename: '[name].chunk.js',// 间接打包的文件走该配置
    path: path.resolve(__dirname, '../dist')
  }
}

module.exports = (env) => {
  if(env && env.production) {
    // 线上环境
    return merge(commonConfig, proConfig)
  } else {
    // 开发环境
    return merge(commonConfig, devConfig)
  }
}
