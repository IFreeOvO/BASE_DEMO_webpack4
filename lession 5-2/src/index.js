console.log('hello')

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