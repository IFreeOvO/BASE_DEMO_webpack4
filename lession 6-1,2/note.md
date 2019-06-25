## 如何编写一个loader

#### 笔记
1.`loader`的options对象可以在loader模块里用`this.query`获得

2.有事options传过来的参数获取可能不准确,所以可以用`loader-utils`模块解决