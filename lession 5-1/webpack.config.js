const path = require('path')

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  externals: {
    lodash: {
      root: '_',  // 作用是:如果lodash是以script标签导入的，那么必须把 _ 注入为全局变量
      commonjs: 'lodash'  
      // 表示如果在commonjs环境下使用时,必须以lodash的名字导入, 
      // 例如第一个lodash出现的位置 const lodash = require('lodash) 这是正确写法
      //  此时const _ = require('lodash) 则为错误写法
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'root', // 在全局变量里加入root这个变量
    libraryTarget: 'umd' // 作用是别人可以以任何形式引入我们的library库
  }
}