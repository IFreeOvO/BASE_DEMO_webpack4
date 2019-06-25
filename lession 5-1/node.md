### 该项目是模拟一个库的打包


### 注意项
1.
```
   libraryTarget: 'umd'
   ``` 
   使用它可以使库支持 import, require等引入方式, 但是不支持`<script src='library.js'></script>`这种形式的引入

2.通过设置
```
library: 'library'
```
可以支持
```
<script src='library.js'></script>

library.math // 全局变量
```
标签的形式引入，且将library标识为全局变量,此时在浏览器控制台直接打印`library`可以输出库里面的内容

3.如果这样设置
```
 library: 'library', 
 libraryTarget: 'this' // 把library变量挂载到this上。此处还可以设置成window,global等
```
那么标签引入后,可以通过`this.library`来使用库

4.有这个么一个情况,假设我们的库已经引入了lodash,但是用户不知道,所以用户既导入了我们的library且又导入了一遍的lodash。这种情况可以通过配置
```
externals: ["lodash"],
```
来解决。 这样做的话需要注意此时我们的库里是没有打包loadsh的，需要用户自己额外导入一下

5.别人如何使用代码？在`package.json`文件下设置`"main": "./dist/library.js"`意思是用户应该使用dist文件下的library.js文件