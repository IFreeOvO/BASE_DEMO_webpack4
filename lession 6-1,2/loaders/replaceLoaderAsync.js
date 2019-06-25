const loaderUtils = require('loader-utils')

// 切记不要用箭头函数
// source指源文件
module.exports = function(source) {
  console.log(source)
  // console.log(this.query)
  // return source.replace('dell', this.query.name)

  const options = loaderUtils.getOptions(this)
  const callback = this.async() // 声明一下有异步操作

  setTimeout(() => {
    const result = source.replace('dell', options.name)
    callback(null, result)
  // this.callback(null, result) //如何需要传递源代码和额外信息可以用它
  }, 1000);

}

// this.callback(
//   err: Error | null,
//   content: string | Buffer,
//   sourceMap?: SourceMap, 源代码
//   meta?: any 其他信息
// )