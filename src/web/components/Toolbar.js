import React from 'react'
import { Icon, Popconfirm } from 'antd'

import rcClient from '../utils/rcClient'
import personStore from '../models/personStore'

class Toolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    personStore.loadPerson('~').then(person => {
      this.setState({ me: person })
    })
  }
  render () {
    return (
      <div>
        { this.state.me === undefined ? null : (
          <img width='40px' src={this.state.me.avatar} style={{ margin: '16px auto', display: 'block' }} />
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

export default Toolbar
