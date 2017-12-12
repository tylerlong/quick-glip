import React from 'react'
import { observer } from 'mobx-react'

class App extends React.Component {
  render () {
    return (
      <div>Hello world</div>
    )
  }
}

export default observer(App)
