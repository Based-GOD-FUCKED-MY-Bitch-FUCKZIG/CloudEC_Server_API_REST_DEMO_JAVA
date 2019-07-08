/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import {Input, Modal,Form,Select,Radio} from 'antd'
import styled from 'styled-components';

const { Option } = Select;

const FormWrapper = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
    font-size: 13px;
  }

  .ant-form-item-label {
    text-align: left;
    line-height: 32px;
  }
 
  & .ant-form-item-control-wrapper > .ant-form-item-control {
    line-height: 32px;
  }
`;

const InfoItem = styled(Form.Item).attrs({
    colon: false,
    labelCol: { span: 4 },
    wrapperCol: {
      span: 14
    }
  })`
    .ant-form-item-children {
      position: static;
    }
    .ant-form-item-label {
      height: 32px;
      label {
        font-size: 13px;
        color: #999999;
      }
    }
  `;

export const CreateUserForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        constructor(){
            super();
            this.state = {
                passwordType: "autoMode",
                display: 'none',
                confirmDirty: false,
                needPwd: false,
            } 
        }

        //密码设置方式
        handlePwdTypeChange = (e) => {

            if(e.target.value === "manualMode"){
                this.setState({
                    display: 'block',
                    needPwd: true
                })
            }
            else{
                this.setState({
                    display: 'none',
                    needPwd: false
                })  
            }
        }

        //再次输入密码value值不为空，confirmDirty为true
        handleConfirmBlur = e => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        };
    
        //和第一次输入的密码比对
        compareToFirstPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('pwd')) {
                callback('两次密码输入不一致!');
            } else {
                callback();
            }
        };
    
        //第一次输入密码，对密码长度判读
        validateToNextPassword = (rule, value, callback) => {
            const form = this.props.form;
            if(value !== undefined){
                var pwdLength = value.length;
                if(pwdLength < 6 || pwdLength > 32){
                    callback("密码长度为6~32!" + 
                    "   且至少包含两种字符类型：小写字母、大写字母、数字、特殊字符（` ~ ! @ # $ % ^ & * ( ) - _ = + \\ | [ { } ] ; : \" , ' < . > / ?) "
                    + "   且密码不能与账号或账号的倒序一致");
                }
            }

            if (value && this.state.confirmDirty) {
                form.validateFields(['confirmPwd'], { force: true });
            }
            callback();
        };

      render() {
        const { visible, onCancel, onCreate, form, deptName} = this.props;
        const { getFieldDecorator } = form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: "86",
          })(
            <Select style={{ width: 'auto' }}>
              <Option value="86">+86(中国大陆)</Option>
              <Option value="886">+886(中国台湾)</Option>
            </Select>,
          );
        
        return (
          <Modal style={{ top: 20 }} visible={visible} title="添加用户" okText="确认" cancelText="取消" onCancel={onCancel} onOk={onCreate} maskClosable={false} keyboard={false}>
            <FormWrapper style={{ marginLeft: '15px'}} autoComplete="off">
              <InfoItem label="姓名" >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '用户名不能为空!' }],
                })(<Input size="small" placeholder="请输入姓名"/>)}
              </InfoItem>

              <InfoItem label="账号" >
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '账号不能为空!' }],
                })(<Input size="small" placeholder="请输入账号"/>)}
              </InfoItem>

              <InfoItem label="手机" >
                {getFieldDecorator('phone',{
                        rules: [
                            {
                                pattern:/^[0-9]*$/,
                                message:"手机号只能是纯数字！",
                            },
                        ],
                    })(<Input addonBefore={prefixSelector} size="small" placeholder="请输入手机号"/>)}
              </InfoItem>

              <InfoItem label="邮箱" >
                {getFieldDecorator('email',{
                        rules: [
                            {
                                type:"email",
                                message:"邮箱格式不正确!",
                            },
                        ],
                    })(<Input size="small" placeholder="请输入邮箱"/>)}
              </InfoItem>

              <InfoItem label="密码生成" >
                {getFieldDecorator('mode',{
                            initialValue: this.state.passwordType,
                        })(
                    <Radio.Group onChange={this.handlePwdTypeChange}>
                        <Radio value="autoMode">自动生成密码</Radio>
                        <Radio value="manualMode">手动生成密码</Radio>
                    </Radio.Group>,
                )}
              </InfoItem>
              <div style={{display:this.state.display}}>
                <InfoItem label="密码" >
                    {getFieldDecorator('pwd',{
                        rules: [
                            {
                                required: this.state.needPwd,
                                message: '请输入密码!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password size="small" placeholder="请输入密码"/>)}
                </InfoItem>

                <InfoItem label="确认密码"  >
                    {getFieldDecorator('confirmPwd', {
                        rules: [
                        {
                            required: this.state.needPwd,
                            message: '请确认密码!',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                        ]})(<Input.Password onBlur={this.handleConfirmBlur} size="small" placeholder="请再次输入密码"/>)}
                </InfoItem> 
              </div>  

              <InfoItem label="部门" >
                {getFieldDecorator('deptName',{
                    initialValue: deptName,
                })(<Input size="small" readOnly/>)}
              </InfoItem>
            </FormWrapper>
          </Modal>
        );
      }
    },
);