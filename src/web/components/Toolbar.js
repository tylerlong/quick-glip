import React from 'react'
import { Icon, Popconfirm } from 'antd'

class Toolbar extends React.Component {
  render () {
    return (
      <div>
        <Popconfirm title='Are you sure to logout?' onConfirm={e => { console.log('logout') }} okText='Yes' cancelText='No'>
          <Icon type='logout' style={{
            margin: '8px auto',
            display: 'block',
            color: 'white',
            fontSize: '36px',
            cursor: 'pointer'
          }} title='Logout' />
        </Popconfirm>
      </div>
    )
  }
}

export default Toolbar
