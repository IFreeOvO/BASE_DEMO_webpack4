const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')

const prodConfig = {
  mode: 'production', // 开发模式默认开启sourceMap
  devtool: 'cheap-module-source-map', // 设置为none可以关闭sourcemap,
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 打包后的html里直接引用的css走这个配置
      chunkFilename: '[name].chunk.css',// 打包后的html里间接引用的css走这个配置
    }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '../',
            //   hmr: process.env.NODE_ENV === 'development',
            // },
          },
          'css-loader',
          'postcss-loader' 
        ],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',// 入口文件都走该配置项
    chunkFilename: '[name].[contenthash].chunk.js',// 间接打包的文件走该配置
  }
}

module.exports =prodConfig
