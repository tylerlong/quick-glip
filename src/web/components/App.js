import React from 'react'
import { observer } from 'mobx-react'

import Login from './Login'
import tokenStore from '../models/tokenStore'
import Posts from './Posts'
import Toolbar from './Toolbar'
import Groups from './Groups'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='left' >{ tokenStore.hasToken ? <Toolbar /> : null }</div>
        <div className='middle'>{ tokenStore.hasToken ? <Groups /> : null }</div>
        <div className='right'>{ tokenStore.hasToken ? <Posts /> : <Login /> }</div>
      </div>
    )
  }
}

export default observer(App)
