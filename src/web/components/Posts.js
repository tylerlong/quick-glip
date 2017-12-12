import React from 'react'
import { List } from 'antd'
import { observer } from 'mobx-react'

import postStore from '../models/postStore'

class Posts extends React.Component {
  componentDidMount () {
    postStore.load(14760828930)
  }

  render () {
    return (
      <List dataSource={postStore.list} renderItem={item => (
        <List.Item><div style={{ padding: '0 8px' }}>{item}</div></List.Item>
      )} />
    )
  }
}

export default observer(Posts)
