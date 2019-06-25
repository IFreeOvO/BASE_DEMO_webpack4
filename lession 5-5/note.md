## webpackDevServer解决单页面应用路由问题

#### 注意事项
1.使用了`import { BrowserRouter, Route } from 'react-router-dom'`相关内容后,输入网址`http://localhost:8080/list`依然不能访问对应的页面,此时需要配置webpackDevServer
的配置项`historyApiFallback:true`

2.如果放到线上，由于没了webpackDevServer，路线跳转跳不过去，此时一般需要后台同学设置服务器相关配置