function counter() {
  var div = document.createElement('h3')
  div.setAttribute('id', 'counter')
  div.innerHTML = 2
  div.onclick = function() {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1
  }
  document.body.appendChild(div)
}

export default counter