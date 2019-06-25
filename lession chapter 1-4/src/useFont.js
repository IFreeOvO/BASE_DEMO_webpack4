import font from './font.scss'
console.log(font)
export function useFont() {
  var root = document.getElementById('root')
  var box = document.createElement('div')
  // box.classList.add('iconfont')
  // box.classList.add('icon-zhufang')
  box.classList.add(font.iconfont)  // 模块化时，类名作为对象属性
  box.classList.add(font['icon-zhufang'])

  root.append(box)
}

export function myMath() {
  console.log('哈哈')
}

