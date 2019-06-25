const path = require('path')

module.exports = {
  outputDir: 'dell',  // 打包出的内容放哪个文件里
  // 这里可以写原生的webpack配置
  configureWebpack: {
    devServer: {
      contentBase: [path.resolve(__dirname, 'static')]
    }
  }
}