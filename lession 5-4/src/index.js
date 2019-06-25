import React, { Component } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

class App extends Component {
  componentDidMount() {
    // axios.get('http://www.dell-lee.com/react/api/header.json')
    axios.get('/react/api/header.json')
      .then((res) => {
        console.log(res)
      })
  }

  render() {
    return <div>Hello world</div>
  }
}

ReactDom.render(<App />, document.getElementById('root'))

