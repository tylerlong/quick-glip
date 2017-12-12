import React from 'react'
import { observer } from 'mobx-react'
import * as R from 'ramda'

import Login from './Login'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='left' >{ R.isNil(global.token) ? null : 'left' }</div>
        <div className='middle'>{ R.isNil(global.token) ? null : 'Right' }</div>
        <div className='right'>{ R.isNil(global.token) ? <Login /> : null }</div>
      </div>
    )
  }
}

export default observer(App)
