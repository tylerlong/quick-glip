import React from 'react'
import { Icon, Popconfirm } from 'antd'
import { observer } from 'mobx-react'

import rcClient from '../utils/rcClient'
import personStore from '../models/personStore'

class Toolbar extends React.Component {
  render () {
    const me = personStore.person('~')
    return (
      <div>
        { me.loaded === false ? null : (
          <img width='40px' src={me.avatar} style={{ margin: '16px auto', display: 'block' }} />
        )}
        <Popconfirm title='Are you sure to logout?' okText='Yes' cancelText='No'
          onConfirm={e => { rcClient.logout() }}>
          <Icon type='logout' style={{
            margin: '16px auto',
            display: 'block',
            color: 'white',
            fontSize: '32px',
            cursor: 'pointer'
          }} title='Logout' />
        </Popconfirm>
      </div>
    )
  }
}

export default observer(Toolbar)
