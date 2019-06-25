### PWA打包配置

### 注意事项
1. `package.json`里加入命令
   ```
   "start": "http-server dist", // 指对dist目录开启服务
   ```
2.`workbox-webpack-plugin`这个插件帮助我们实现pwa。这个插件只需要线上模式webpack配置就行,配置项
```
 new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
```

入口文件加入:
```
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('服务开启')
      }).catch(error => {
        console.log('服务启动失败')
      })
  })
}
```