import pic from './bg.jpg'
// import style from './style.scss'

function createAvatar() {
  var img = new Image()
  // img.src = `./dist/${pic}`
  img.src = pic
  img.classList.add('avatar')

  var root = document.getElementById('root')
  root.append(img)
}

export default createAvatar