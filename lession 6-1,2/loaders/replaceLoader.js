const loaderUtils = require('loader-utils')

// 切记不要用箭头函数
// source指源文件
module.exports = function(source) {
  return source.replace('myname', 'two')
}

