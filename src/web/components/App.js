import React from 'react'
import { observer } from 'mobx-react'

import Login from './Login'
import tokenStore from '../models/tokenStore'
import MainPanel from './MainPanel'
import Toolbar from './Toolbar'
import GroupList from './GroupList'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='left' >{ tokenStore.hasToken ? <Toolbar /> : null }</div>
        <div className='middle'>{ tokenStore.hasToken ? <GroupList /> : null }</div>
        <div className='right'>{ tokenStore.hasToken ? <MainPanel /> : <Login /> }</div>
      </div>
    )
  }
}

export default observer(App)
