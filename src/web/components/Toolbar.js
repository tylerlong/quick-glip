import React from 'react'
import { Icon, Popconfirm } from 'antd'

import rcClient from '../utils/rcClient'

class Toolbar extends React.Component {
  render () {
    return (
      <div>
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

export default Toolbar
