import React from 'react'
import { Input, Form, Card, Button, message } from 'antd'
import { observer } from 'mobx-react'

import rcClient from '../utils/rcClient'

const formItemLayout = {
  labelCol: {
    sm: { span: 23 },
    md: { span: 4 },
    lg: { span: 3 }
  },
  wrapperCol: {
    sm: { span: 23 },
    md: { span: 19 },
    lg: { span: 20 }
  }
}

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      extension: '',
      password: ''
    }
  }
  render () {
    return (
      <Card title='Login'>
        <Form.Item {...formItemLayout} label='Username'>
          <Input onChange={e => this.setState({username: e.target.value})} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Extension'>
          <Input onChange={e => this.setState({extension: e.target.value})} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Password'>
          <Input onChange={e => this.setState({password: e.target.value})} type='password' />
        </Form.Item>
        <Button type='primary' size='large' style={{ width: '100%', marginTop: 16 }} onClick={e => {
          console.log('clicked')
          rcClient.auth({
            username: this.state.username,
            extension: this.state.extension,
            password: this.state.password
          }).then(() => {
            message.success('You\'ve logged in.')
          }).catch(error => {
            message.error(error.message)
          })
        }}>Login</Button>
      </Card>
    )
  }
}

export default observer(Login)
