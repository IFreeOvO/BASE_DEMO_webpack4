## eslint在webpack中的配置

#### 注意事项
1.使用`npx eslint --init`可以创建eslint配置文件

2.在webpack里加入`eslint-loader`可以在编译打包时进行代码检查

3.在devServer里加入`overlay:true`编辑后浏览器会自动弹出错误提示，无需打开控制台