import React from 'react'
import { List } from 'antd'
import { observer } from 'mobx-react'

import groupStore from '../models/groupStore'

class GroupList extends React.Component {
  componentDidMount () {
    groupStore.load()
  }

  render () {
    return (
      <List dataSource={groupStore.list} renderItem={item => (<List.Item>{item}</List.Item>)} />
    )
  }
}

export default observer(GroupList)
