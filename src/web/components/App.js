import React from 'react'
import { observer } from 'mobx-react'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='left' >left</div>
        <div className='middle'>middle</div>
        <div className='right'>right</div>
      </div>
    )
  }
}

export default observer(App)
