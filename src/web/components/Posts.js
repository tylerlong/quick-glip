import React from 'react'
import { List, Spin } from 'antd'
import { observer } from 'mobx-react'

import postStore from '../models/postStore'

class Posts extends React.Component {
  render () {
    if (postStore.loading) {
      return <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <Spin size='large' />
      </div>
    }
    return (
      <List dataSource={postStore.list} renderItem={item => (
        <List.Item><div style={{ padding: '0 8px' }}>{item}</div></List.Item>
      )} />
    )
  }
}

export default observer(Posts)
