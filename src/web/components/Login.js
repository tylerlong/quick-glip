import React from 'react'
import { Input, Form, Card, Button } from 'antd'

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
  render () {
    return (
      <Card title='Login'>
        <Form.Item {...formItemLayout} label='Username'><Input /></Form.Item>
        <Form.Item {...formItemLayout} label='Extension'><Input /></Form.Item>
        <Form.Item {...formItemLayout} label='Password'><Input /></Form.Item>
        <Button type='primary' size='large' style={{ width: '100%', marginTop: 16 }}>Login</Button>
      </Card>
    )
  }
}

export default Login
