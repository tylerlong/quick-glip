import React from 'react'
import { List, Spin } from 'antd'
import { observer } from 'mobx-react'

import groupStore from '../models/groupStore'

class Groups extends React.Component {
  componentDidMount () {
    groupStore.load()
  }

  render () {
    if (groupStore.loading) {
      return <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <Spin />
      </div>
    }
    return (
      <List dataSource={groupStore.list} renderItem={item => (
        <List.Item><div style={{ padding: '0 8px' }}>{item}</div></List.Item>
      )} />
    )
  }
}

export default observer(Groups)
