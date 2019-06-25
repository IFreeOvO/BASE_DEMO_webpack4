const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AddAssetHtmlWebpack = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const proConfig = require('./webpack.prod.js')

const plugins = [
  // 自动生成html,并把生成的js引入到html里
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  // 每次打包前先清除dist文件内容
  new CleanWebpackPlugin({})
]

const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
// console.log(files)
files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlWebpack({
        filepath: path.resolve(__dirname, '../dll', file)
      })
    )
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll',  file)
      })
    )
  }
})
// console.log(plugins)

const commonConfig = {
  entry: {
    // lodash: './src/lodash.js', // 打包顺序很重要
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 会先查询.js的存在与否,再查找.jsx
    mainFiles: ['index', 'child'], // 不写的话也是默认index
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      // 解析es6
      {
        test: /\.jsx?$/, // 问号表示x可有可无
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
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
  plugins,
  // plugins: [
  //   // 自动生成html,并把生成的js引入到html里
  //   new HtmlWebpackPlugin({
  //     template: 'src/index.html'
  //   }),
  //   // 每次打包前先清除dist文件内容
  //   new CleanWebpackPlugin({}),
  //   // 把编译好的第三方模板包dll.js导入html
  //   new AddAssetHtmlWebpack({
  //     filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
  //   }),
  //   new AddAssetHtmlWebpack({
  //     filepath: path.resolve(__dirname, '../dll/react.dll.js')
  //   }),
  //   new webpack.DllReferencePlugin({
  //     manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
  //   }),
  //   new webpack.DllReferencePlugin({
  //     manifest: path.resolve(__dirname, '../dll/react.manifest.json')
  //   })
  // ],
  optimization: {
    runtimeChunk: {
      name: 'runtime' // 旧版本webpack打包时，如果输出文件名有[contenthash]也无法实现 文件没修改就不改变hash , 此时配置这个可以解决问题
    },
    // 开启tree shaking
    usedExports: true,
    // 代码自动分离
    splitChunks: {
      chunks: 'all', // 对异步还是同步代码进行分离打包,如果需要对同步代码进行分割则需要与cacheGroups:vendors一起搭配使用才有效果,'initial'是对同步代码进行分割
      cacheGroups: {
        // 一条规则对应一个打包组,vendors和default分别是一个组,符合匹配规则的代码块会打包到同一个组里
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 检测静态引入的依赖是否是这个目录下引入的,是则按这套规则打包
          priority: -10, // 打包时如果引入的代码块满足多个组的匹配条件,则根据优先级，打包到优先级更高的组里
          // filename: 'vendors.js' // 给打包文件取名,好像不起作用
          name: 'myPack' // 自定义打包文件名
        }
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

module.exports = env => {
  if (env && env.production) {
    // 线上环境
    return merge(commonConfig, proConfig)
  } else {
    // 开发环境
    return merge(commonConfig, devConfig)
  }
}
