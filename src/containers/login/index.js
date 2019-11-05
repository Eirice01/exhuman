import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import "./login.less";
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values,cb) => {
      if (!err) {
        setTimeout(() => {
            if(values.username !== 'admin'){
                this.props.form.setFields({
                    username:{
                        value:values.username,
                        errors:[new Error('账号不正确')]
                    }
                })
            }
            else if(values.password !== '123456'){
                this.props.form.setFields({
                    password:{
                        value:values.password,
                        errors:[new Error('密码不正确')]
                    }
                })
            }
            else {
               this.props.history.push("/index")
            }
        },500)
      } else {
          console.log('error',err,values)
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true , message:'账号不正确' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25" }} />}
              placeholder="账号"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true , message:'密码不正确' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25" }} />}
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedLoginForm = Form.create({ name: "login-form" })(Login);

export default WrappedLoginForm;
