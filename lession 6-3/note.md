## 编写一个plugin


#### 如何知道`compilation`对象里有哪些参数
1.在`package.json`里加入指令`"debug": "node node_modules/webpack/bin/webpack.js"`
(其实这个命令和`"dev": "webpack"`是一样的).继续往指令里加入`--inspect --inspect-brk`,
`--inspect`指打开调试, `--inspect-brk`指在第一行打断点
2.此时,打开谷歌浏览器控制台,会多出一个绿色的node图标，点击打开,可以看到webpack代码
3.在自己写的plugin里用一行`debugger`代码打个断点,然后在重新运行`npm run debug`这个命令,
回到第二步,运行到我们所打的webpack的断点处,鼠标悬停`compilation`上即可查看它里面的属性方法