import React from 'react'
import { Input, Form, Card, Button, message } from 'antd'

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
    this.form = {}
  }
  render () {
    return (
      <Card title='Login'>
        <Form.Item {...formItemLayout} label='Username'>
          <Input onChange={e => { this.form.username = e.target.value }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Extension'>
          <Input onChange={e => { this.form.extension = e.target.value }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Password'>
          <Input onChange={e => { this.form.password = e.target.value }} type='password' />
        </Form.Item>
        <Button type='primary' size='large' style={{ width: '100%', marginTop: 16 }} onClick={e => {
          rcClient.auth({
            username: this.form.username,
            extension: this.form.extension,
            password: this.form.password
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

export default Login
