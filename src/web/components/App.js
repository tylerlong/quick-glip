import React from 'react'
import { observer } from 'mobx-react'

import Login from './Login'
import tokenStore from '../models/tokenStore'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='left' >{ tokenStore.hasToken ? 'left' : null }</div>
        <div className='middle'>{ tokenStore.hasToken ? 'middle' : null }</div>
        <div className='right'>{ tokenStore.hasToken ? null : <Login /> }</div>
      </div>
    )
  }
}

export default observer(App)
