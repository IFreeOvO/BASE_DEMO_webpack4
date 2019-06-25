## bundler源码编写


1.全局安装`cli-highlight`,它可以使控制台输出的内容带上颜色,以
node命令为例，可以这样使用`node .\bundler.js | highlight`
  
2.安装`@babel/parser`可以解析bundler文件

3.安装`@babel/traverse`可以拿到抽象语法树中含import语句的节点

4.安装`@babel/core`将import语法解析成浏览器可以解析的语法