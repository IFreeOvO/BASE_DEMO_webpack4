### webpackDevServer实现请求转发

### 注意事项
1.```
  proxy: {
      '/react/api': 'http://www.dell-lee.com'
  }
    ```
当你请求 `axios.get('/react/api/header.json')` 时,实际上
是请求`http://www.dell-lee.com/react/api/header.json`这个地址

2.```
 '/react/api': {
    target: 'http://www.dell-lee.com',
    pathRewrite: {
      'header.json': 'demo.json'
    }
  }
    ```
当你请求 `axios.get('/react/api/header.json')` 时,实际
上是请求`http://www.dell-lee.com/react/api/demo.json`这个地址,
因为`header.json`会被重写为`demo.json`