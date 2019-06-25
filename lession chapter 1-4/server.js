
/**
 * 用node 模拟一个webpack-dev-server 服务
 */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')


const app = express()

const complier = webpack(config) // webpack结合配置文件进行代码编译
// app.use(webpackDevMiddleware(complier, {
//   publicPath: config.output.publicPath // 这里使用webpack配置文件里的 output参数里的  publicPath: '/',
// }))
app.use(webpackDevMiddleware(complier, {}))

app.listen(3000, () => {
  console.log('server is running')
})