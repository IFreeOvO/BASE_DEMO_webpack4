class CopyRightWebpackPlugin {
  constructor() {
    console.log('启用插件')
  }

  // compiler 是webpack的实例
  apply(compiler) {
    // 同步的钩子
    compiler.hooks.compile.tap('CopyRightWebpackPlugin', (compilation) => {
      console.log('同步钩子')
    })

    // hooks是指钩子, emit是指把资源打包到输出目录之前的时刻(异步钩子)
    // compilation存放着这一次打包的内容
    compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin',(compilation, cb) => {
      console.log(compilation.assets)
      debugger
      compilation.assets['copyright.txt'] = {
        // 文件内容
        source: function() {
          return '我是文件里的内容'
        },
        // 文件大概多大
        size: function() {
          return 16
        }
      }
      cb() // 必须要调用一下
    })
  }
}

module.exports = CopyRightWebpackPlugin