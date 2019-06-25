#### 笔记
`npm info webpack` 可以查看webpack历史版本


webpack4.0默认已线上模式打包


file-loader 貌似可以打包一切格式的静态文件。

1、url-loader依赖file-loader
2、当使用url-loader加载图片，图片大小小于上限值，则将图片转base64字符串，；否则使用file-loader加载图片，都是为了提高浏览器加载图片速度。
3、使用url-loader加载图片比file-loader更优秀


css-loader ，不识别字体文件


### devtool配置
1.当代码写错时,sourceMap可以帮助我们找到代码在原始文件的哪个位置错，没有sourceMap的话，只会告诉你是打包后的文件哪里写错了


2.devtool配置里含module字段表示第三方模块错误也会映射, 含inline字段表示映射存储到打包文件里而不另外存储在.map文件里,含cheap字段表示只提示代码行错误而不精确到列,eval
表示已eval()函数形式执行js

3.开发环境sourceMap建议用cheap-module-eval-source-map
生产环境sourceMap建议关闭sourceMap或者用cheap-module-source-map


### webpack-dev-server
1.webpack-dev-server是打包到内存里，因此不会生成dist目录

###模块热更新
1.貌似不需要加new webpack.HotModuleReplacementPlugin()插件,webpack-dev-server默认应该就有--hot了,加插件反而引起冲突导致热更新失效
2.热模块更新可以不刷新页面,js渲染部分保持不变(比如动态创建出来的元素依然还在),css改变才会自动改变页面渲染
3.方便调试css用的,如果需要对指定的js文件也热更新，需要加入一些判断。例如:
```
if(module.hot) {
  module.hot.accept('./counter', () => {
    counter()
  })
}
```
4.热更新的意思就是在不刷新页面的情况下，如果文件改变，页面页面及时作出渲染

###babel
1.babel的插件只会转换语法，并不会转换API。
对于ES6的内建功能（如 Promise / Set / Map），原型链的扩展（Array / Object 等）需要用垫片库（polyfill）来支持。  

###Tree Shaking
1.Tree Shaking只支持ES Module的引入
2.它能帮助我们按需打包实际用的的引入模块，而模块里未使用的地方则不会打包进去
3.development默认没Tree Shaking这个模式，在webpack配置项里加入以下代码则可以开启
```
optimization: {
    usedExports: true
},
```
production模式默认开启Tree Shaking(optimization配置参数可以不写了)
此外,package.json也要加一行代码 "sideEffects":false(指没有要特殊处理的东西) (因为类似于import '@babel/polly-fill'那些并不导出模块的语句，如果不加这一行代码，打包这些import会被直接忽略，而导致找不到依赖包的错误)。有时也需要这么写"sideEffects":["@babel/polyfill", "*.css"] (此时Tree Shaking对她不会产生影响)
4.开发模式下Tree Shaking虽然生效，但是依然会引入没用到的代码，便于检查调试
5.有没有起作用可以看打包文件的注释部分，类似如下
/*! exports provided: useFont, myMath */
/*! exp
### code splitting
1.为什么要做代码分离?当一个js文件很大时，用户下载要很久,且如果js包含业务逻辑时，由于业务代码变更需要重新发布就会导致可能需要经常更新下载新的js,这样及其浪费资源
2.动态导入库时需要安装babel-plugin-dynamic-import-webpack插件   
3.同步代码需要配置
```
optimization: {
    // 代码自动分离
    splitChunks: {
      chunks: 'all'
    }
  }, 
```
  异步代码则不需要配置,webpack会自动分割
4.babel-plugin-dynamic-import-webpack并不是官方插件,所以不支持(注意空格)
```
/* webpackChunkName:'lodash' */
```
5.这样的写法
`@babel/plugin-syntax-dynamic-import`才是官方提供的动态引入插件，可以支持
```
/* webpackChunkName:'lodash' */
```

### 打包分析
1.在npm的打包命令里加入`--profile --json > stats.json`,它会把打包的分析文件放入stats.json里,例如
```
"dev-build": "webpack --profile --json > stats.json --config ./build/webpack.dev.js"
```
2.上http://webpack.github.io/analyse 这个网址把stats.json文件上传可以帮助你分析出打包信息


### prefetch和preload
1.preload和preloading实现利用宽带空闲时间去加载异步包
2.浏览器打开控制台,`ctrl+shift+p` ,然后输入coverage,点击录制按钮,再刷新页面可以看到各个文件的利用率,源码红色部分表示未使用的代码
3在代码里插入`/* webpackPrefetch: true */`可以实现prefetch, 例如
```
import(/* webpackPrefetch: true */ './click').then(({default: _})=> {
    _()
}) 
```
4.preload是和核心代码一起加载,prefetch是等核心代码加载完再继续加载

### css代码分割
1.需要引入`mini-css-extract-plugin`插件,不使用这个插件的话,通过import语法导入的css会打包到js文件里
2.`mini-css-extract-plugin`插件有个缺点，即自动开启热更新，导致css文件修改后不会刷新页面,所以一般线上打包才用这个插件
3.如果开发模式下没起作用,则需要修改`Tree Shaking`相关配置,
（如果开发模式开启`Tree Shaking`的话）
```
// package.json里
 "sideEffects": false,
 // 修改为
  "sideEffects": ["*.css","*.scss"], // 排除掉css和scss文件,
```

### css文件压缩
1.使用`optimize-css-assets-webpack-plugin`这个插件

### 浏览器缓存
1. ```
   // contenthash加这个防止页面缓存, 用处是如果文件没变动那么打包后的文件名hash也不会变，反之则会变
    output: {
    filename: '[name].[contenthash].js',// 入口文件都走该配置项
    chunkFilename: '[name].[contenthash].chunk.js',// 间接打包的文件走该配置
  }
   ```
2.低版本如果加了[contenthash]不起作用，则需要额外加入以下配置解决这个问题
```
 runtimeChunk: {
      name: 'runtime' // 旧版本webpack打包时，如果[contenthash]
,
```