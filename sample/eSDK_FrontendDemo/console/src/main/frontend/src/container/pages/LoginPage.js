/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { post } from '@/utils/request';
import {login} from '@/utils/xhr'

class Login extends React.Component{
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
      e.preventDefault();

      const { history } = this.props;

      this.props.form.validateFields((err, values) => {
          if (!err) {
            let temp = new Buffer(values.userName + ':' + values.password);
            let auth = temp.toString('base64');

            let headers = {'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Basic ' + auth
              };

            let userName = values.userName;
              post('/user/login', {userName}, headers).then(
                  (res) => {
                      console.log('resultInfo is :' + res);
                      if(res.success) {
                        console.log('push /app url');
                        login().then(
                            () => {history.push('/app');}
                          );
                      }else{
                          message.info('登录失败，'+res.msg);
                      }
                  }
              )
          }
      });
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login"  id="divcss5">
                <div className="login-form">
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px',display:'table',margin:'0 auto',marginTop:'150px'}} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            登录
                        </Button>
                        
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const LoginPage = Form.create()(Login);

export default LoginPage