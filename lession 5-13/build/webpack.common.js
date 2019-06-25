const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AddAssetHtmlWebpack = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const proConfig = require('./webpack.prod.js')

const makePlugins = configs => {
  const plugins = [new CleanWebpackPlugin({})]

  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item, 'react'] // 列出需要引入的js文件。这里的vendors(我改名成了mypack)指代码分离打包出的,而不是dll打包出的
      })
    )
  })

  const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
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
          manifest: path.resolve(__dirname, '../dll', file)
        })
      )
    }
  })

  return plugins
}

// const plugins = [
//   // 自动生成html,并把生成的js引入到html里
//   new HtmlWebpackPlugin({
//     template: 'src/index.html',
//     filename: 'index.html',
//     chunks: ['runtime', 'vendors', 'main', 'react'] // 列出需要引入的js文件(从dist目录里找)。这里的vendors(我改名成了mypack)指代码分离打包出的,而不是dll打包出的
//   }),
//   new HtmlWebpackPlugin({
//     template: 'src/index.html',
//     filename: 'list.html',
//     chunks: ['runtime', 'vendors', 'list', 'react']
//   })
// ]

const configs = {
  entry: {
    main: './src/index.js',
    list: './src/list.js'
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
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // 打包字体文件
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  // plugins,
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
    path: path.resolve(__dirname, '../dist')
  }
}

configs.plugins = makePlugins(configs)

// const commonConfig = {}

module.exports = env => {
  if (env && env.production) {
    // 线上环境
    return merge(configs, proConfig)
  } else {
    // 开发环境
    return merge(configs, devConfig)
  }
}
