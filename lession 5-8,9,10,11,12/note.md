###webpack 

#### 优化方式
1.跟上技术迭代(node,npm,yarn,webpack等新版本)

2.在尽可能少的模块上使用loader

3.plugin尽可能的精简可靠(推荐用官方的,官方的插件都是经过检验的,性能靠谱)

4.resolve参数合理配置
```
  resolve: {
    mainFiles: ['index'] 
  },
```
作用是,如果一条导入语句例如`import child from './child/index.jsx` 时,
等价于`import child from './child/`,也就是说具体文件名可以省略

5.使用DllPlugin提高打包速度(实现第三方模块打包一次,省略了对第三方模块的分析过程)
 >步骤:1.创建一个`webpack.dll.js`(名字随意),进行文件配置,`package.json`里加入指令
 `build:dll": "webpack --config ./build/webpack.dll.js`单独编译第三方模块,
 引入`add-asset-html-webpack-plugin`插件,作用是把刚才编译好的第三方模块导入html里
 2.第一步只是实现了只打包一次,但是程序依然之前使用dist里打包的第三方模块,而不是dll文件里的,
 还需要在`webpack.dll.js`里配置`DllPlugin`插件创建映射文件,然后在`webpack.common.js`里配置`webpack.DllReferencePlugin`
 插件来使用映射文件

6.控制包文件大小(例如用`tree shaking`)

7.`thread-loader`,`parallel-wwebpack`, `happypack`多进程打包

8.合理使用sourceMap

9.结合stats分析打包结果

10.开发环境内存编译(webpackDevServer)

11.开发环境无用插件剔除