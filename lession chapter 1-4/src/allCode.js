// import pic from './bg.jpg'
// import './index.scss'
// import style from './style.scss'
// import createImg from './createImg'
// import { useFont } from './useFont'
// import _ from 'lodash'
// import counter from './counter'
// import  './demo.scss'

// import React, { Component } from 'react'
// import ReactDom from 'react-dom'

// class App extends Component {
//   render() {
//     return <div>Hellow World</div>
//   }
// }

// ReactDom.render(<App/>, document.getElementById('root'))
// createImg()
// useFont()
// counter()

// var img = new Image()
// img.src = `./dist/${pic}`
// img.src = pic
// img.classList.add(style.avatar)

// var root = document.getElementById('root')
// root.append(img)


// console.log('打包')

// var btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)
// btn.onclick = function() {
//   var div = document.createElement('p')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
//   console.log('点了')
// }

// const arr = [
//   new Promise(() => {}),
//   new Promise(() => {})
// ]

// arr.map(item => {
//   console.log(item)
// })









// // 对指定模块热更新
// if(module.hot) {
//   module.hot.accept('./counter', () => {
//     counter()
//   })
// }







// 动态加载库(异步代码分割案例,异步加载的库webpack会单独用一个文件打包,如0.js)
// webpackChunkName = "lodash" 把打包出的文件命名为lodash
// async function getComponent() {
//   // return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _})=>{
//   //   var element = document.createElement('div')
//   //   element.innerHTML = _.join(['Dell', 'Lee'], '-')
//   //   return element
//   // })
//   console.log('哈哈')
//   const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash')
//   var element = document.createElement('div')
//   element.innerHTML = _.join(['Dell', 'Lee'], '-')
//   return element
// }

// getComponent().then(ele => {
//   document.body.appendChild(ele)
// })



document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click.js').then(({default: _})=> {
    _()
  }) 
  // const ele = document.createElement('div')
  // ele.innerHTML = '你好'
  // document.body.appendChild(ele)
})