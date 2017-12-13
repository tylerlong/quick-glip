import React from 'react'
import { List, Spin, Input } from 'antd'
import { observer } from 'mobx-react'
import * as R from 'ramda'

import postStore from '../models/postStore'

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
        <List dataSource={postStore.list} renderItem={item => (
          <List.Item><div style={{ padding: '0 8px' }}>{item}</div></List.Item>
        )} />
      </div>
    )
  }
}

export default observer(Posts)
