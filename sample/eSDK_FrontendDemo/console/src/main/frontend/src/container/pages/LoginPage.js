/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, message} from 'antd';
import styled from 'styled-components';
import { post } from '@/utils/request';
import {login,forget} from '@/utils/xhr'
import i18n from '@/locales';

class Login extends React.Component{
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ForgetPassword = this.ForgetPassword.bind(this);
    }

    //登录表单提交
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

                    if(!res.success) {
                        message.error(res.msg);
                        return;
                    }
                    let resbody = res.data;
                    if(resbody.returnCode !== "000000000"){
                        message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                        return;
                    }
                
                    let userType = resbody.data.user.userType;
                    let adminType = resbody.data.user.adminType;
                    
                    //普通成员
                    if(userType === 2 && adminType === 2 )
                    {
                        sessionStorage.setItem('adminType', 2);
                        login().then(
                            () => {history.push('/app');}
                        );
                    }//默认管理员
                    else if(userType === 2 && adminType === 0)
                    {
                        sessionStorage.setItem('adminType', 0);
                        login().then(
                            () => {history.push('/admin');}
                        );
                    }//普通管理员
                    else if(userType === 2 && adminType === 1)
                    {                        
                        sessionStorage.setItem('adminType', 1);
                        login().then(
                            () => {history.push('/generaladmin');}
                        );
                    }//sp管理员
                    else if(userType === 1)
                    {                        
                        sessionStorage.setItem('adminType', 3);
                        login().then(
                            () => {history.push('/spadmin');}
                        );
                    }
                }
            )}
        });
        
    }

    ForgetPassword()
    {
        const { history } = this.props;
        forget().then(
            () => {history.push('/auth/forget');}
          );
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const Link = styled.a`
        &&& {
        color: #0d94ff;
        font-size: 12px;
        }`;
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
                        
                       
                        <Link onClick={this.ForgetPassword} style={{float: 'right'}}>忘记密码</Link>
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