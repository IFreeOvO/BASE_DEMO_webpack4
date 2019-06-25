### typescript打包

### 注意事项
1.ts配置文件解释：
```
    "outDir": "./dist",
    "module": "es6", // 允许es6的文件导入方式
    "target": "es5", // 转为es5语法
    "allowJs": true // 允许引入js模块
```

2.当希望引入第三库,如lodash,也能被ts检查接口参数类型错误,可以用`@types/lodash`插件