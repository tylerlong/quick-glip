import React from 'react'
import { Divider, Spin, Input, Avatar } from 'antd'
import { observer } from 'mobx-react'
import * as R from 'ramda'

import postStore from '../models/postStore'
import personStore from '../models/personStore'

class Posts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      draft: ''
    }
  }
  render () {
    if (postStore.loading) {
      return <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <Spin size='large' />
      </div>
    }
    return (
      <div>
        <div style={{ padding: '8px' }}>
          <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} value={this.state.draft}
            onChange={e => { this.setState({ draft: e.target.value }) }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (R.isNil(this.state.draft) || R.isEmpty(this.state.draft.trim())) {
                  return
                }
                postStore.createPost(this.state.draft)
                this.setState({ draft: '' })
              }
            }} />
        </div>
        {postStore.posts.map(item => (
          <div key={item.id} >
            <Avatar src={personStore.person(item.creatorId).avatar} style={{ margin: '0 16px' }} />
            {item.title}
            <Divider />
          </div>
        ))}
      </div>
    )
  }
}

export default observer(Posts)
