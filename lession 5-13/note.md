## 多页面打包

## 流程
1.`entry`配置多个页面的js入口
2.配置`HtmlWebpackPlugin`插件, 关键在`HtmlWebpackPlugin`的`filename`这个参数指定不同的
页面名称,还有`chunks`参数来指定页面引入哪些js文件