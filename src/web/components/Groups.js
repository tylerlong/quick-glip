import React from 'react'
import { Spin, Divider } from 'antd'
import { observer } from 'mobx-react'

import groupStore from '../models/groupStore'
import postStore from '../models/postStore'

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
      <div>
        { groupStore.groups.map(group => {
          return <div key={group.id} style={{ cursor: 'pointer' }} onClick={e => {
            if (group.id !== postStore.groupId) {
              postStore.load(group.id)
            }
          }}>
            <Divider />
            <div style={{ paddingLeft: '8px' }}>{group.title}</div>
          </div>
        }) }
      </div>
    )
  }
}

export default observer(Groups)
