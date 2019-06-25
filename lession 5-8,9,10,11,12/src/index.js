import React, { Component } from 'react'
import ReactDom from 'react-dom'
// import Child from '@/child/'

class App extends Component {
  render() {
    return <div>
      <div>Hello world</div> 
    </div>
  }
}

ReactDom.render(<App />, document.getElementById('root'))

