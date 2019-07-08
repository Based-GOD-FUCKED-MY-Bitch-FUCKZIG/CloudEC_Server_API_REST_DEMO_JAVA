/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import styled from 'styled-components';
import { Form,Input,Card,message,Modal,Radio,Button} from 'antd';
import { get,put,post } from '@/utils/request';
import {logout} from '@/utils/xhr';
import i18n from '@/locales';

let userName;//获取用户的名称
let flag = 1;//判断修改手机/邮箱标志位，flag=1为修改手机，flag=0为修改邮箱
let verifyWays;//获取用户选择邮箱还是手机
let countdownShow;//原手机/邮箱倒计时显示
let countdownTimeShow;//新手机/邮箱倒计时显示

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
    labelCol: { span: 6 },
    wrapperCol: {
      span: 10
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

  const AntdInput = styled(Input).attrs({ autoComplete: 'off' })`
  .ant-input {
    border-radius: ${({ radius }) => (radius ? radius : '2px')};
  }
`;
  const InputName = styled(AntdInput)`
  &&& {
    height: 32px;
    font-size: 13px;
    color: #333333;
  }
`;

const DoubleOperateWrapper = styled.span`
  position: absolute;
  right: -98px;
  top: 0;
`;
const CancelSpan = styled.span`
  margin-left: 20px;
`;
const Link = styled.a`
  &&& {
    color: #0d94ff;
    font-size: 12px;
  }
`;

const SingleOperateWrapper = styled.span`
  position: absolute;
  right: -45px;
  top: 0;
`;

const ResultText = styled.a`
  &&& {
    color: #000000;
    font-size: 12px;
  }
`;

const Search = Input.Search;

class setUserInfo extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            status : null,
            visibleModify:false,
            visibleModPwd:false,
            verifyWay:"phone",
            disbledGetVerifyCode:null,
            disbledNewGetVerifyCode:null
        }
        //用户查询自己信息
        get("/datacenter/v1/member", 
        {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        }, 
        null).then(
        (res) => {
         
            if(!res.success) {
                message.error(res.msg);
                return;
            }

            let resbody = JSON.parse(res.data.entity);

            console.info("用户查询自己信息返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }
            this.setState({
                //个人信息显示参数值
                name:resbody.data.name,
                userAccount:resbody.data.userAccount,
                phone:resbody.data.phone,
                email:resbody.data.email,
                sipNum:resbody.data.sipNum,
                vmrId:resbody.data.vmrList[0].vmrId,
                corpName:resbody.data.corp.name,
                deptName:resbody.data.deptName,
                adminName:resbody.data.corp.adminName,
                adminPhone:resbody.data.corp.phone,
                adminEmail:resbody.data.corp.email
            })
        })  
    }
    //点击用户名称修改，显示修改用户名称界面
    modUserName = () =>{
        this.setState({
            status:"success"
        });
    }
    //取消修改用户名称
    cancelUserName = () =>{
        this.setState({
            status:null
        });
    }
    //修改用户信息
    saveUserName = () =>{
        if(userName === undefined)
        {
          userName = this.state.name;
        }
        const data = JSON.stringify({ "name":userName });
        console.info("修改用户信息Body:",data);
        
        //修改用户信息
        put("/datacenter/v1/member", {data},
        {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        }).then(
        (res) => {
            
            if(!res.success) {
                message.error(res.msg);
                return;
            }

            let resbody = JSON.parse(res.data.entity);
            console.info("修改用户信息返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }
            this.setState({
                //保存用户修改名称
                name:userName,
                status:null
            })
        })  
    }
    //点击手机/邮箱修改，显示修改手机/邮箱界面
    showModifyModal = (value) =>
    {  
        flag = value;
        this.setState({
          visibleModify:true,
          disableOldPhone:false,
          disableOldEmail:false
        });
       
        if(this.state.phone === null)
        {
          this.setState({
            disableOldPhone:true,
            verifyWay:"email"
          });
        }
        else if(this.state.email === null)
        {
          this.setState({
            disableOldEmail:true,
            verifyWay:"phone"
          });
        }
        else if (value === 1)
        {
          this.setState({
            verifyWay:"phone"
          });
        }
        else
        {
          this.setState({
            verifyWay:"email"
          });
        }
    }
    //获取原手机/邮箱的验证码
    getVerifyCode = () =>
    {
      if(verifyWays === undefined)
      {
        verifyWays=this.state.verifyWay;
      } 
      
      let getVerifycode ;
       
      if(verifyWays === "phone")
       {
          getVerifycode = {
            "contact":this.state.phone,
            "country":"chinaPR"
          }
       }
       else if(verifyWays === "email")
       {
          getVerifycode = {
            "contact":this.state.email
         }
       }
       const data = JSON.stringify(getVerifycode);
       let headers = {'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': sessionStorage.getItem('access_token')
                    };
      //获取验证码
      post("/member/verification-code", {data}, headers).then(
        (res) => {

            if(!res.success) {
              message.error(res.msg);
              return;
            }
            let resbody = JSON.parse(res.data.entity);
            console.info("获取验证码返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
              message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
              return;
            }
            message.success("发送验证码成功！");
             //发送验证码成功后，需要60s后才能重新获取
             this.Countdown(60);
      })
    }
    //60秒倒计时
    Countdown  = (value) =>{
      let countdown = value;
      countdownShow = setInterval(() => {
          this.setState({
            countdown,
            disbledGetVerifyCode:"success"
          });
          if(countdown === 0)
          {
            clearInterval(countdownShow);
            this.setState({
                countdown:60,
                disbledGetVerifyCode:null,
            });
          }
          countdown--; 
      },1000);
    }

    //取消原手机/邮箱的界面
    handleCancelModify = () =>
    {
      this.props.form.resetFields();
      clearInterval(countdownShow);
      this.setState({
        visibleModify:false,
        disbledGetVerifyCode:null,
      });
    }
    //校验原手机/邮箱的验证码
    handleNextModify = () =>
    {
      this.props.form.validateFields((err, values) => {
        //console.log("values:",values);
        clearInterval(countdownShow);
        this.setState({
          disbledGetVerifyCode:null,
        });
        let checkVerifycodeBody ;

        if(verifyWays === "phone")
        {
          checkVerifycodeBody = {
             "contact":this.state.phone,
             "country":"chinaPR",
             "verificationCode":values.verifyCode
           }
        }
        else if(verifyWays === "email")
        {
          checkVerifycodeBody = {
             "contact":this.state.email,
             "verificationCode":values.verifyCode
          }
        }
        const data = JSON.stringify(checkVerifycodeBody);
        let headers = {'Content-Type': 'application/json',
                       'Accept': 'application/json',
                       'Authorization': sessionStorage.getItem('access_token')
                     };
       //校验验证码
       put("/member/verification-code", {data}, headers).then(
         (res) => {
 
             if(!res.success) {
               message.error(res.msg);
               return;
             }
             let resbody = JSON.parse(res.data.entity);
             console.info("校验验证码返回结果:",JSON.stringify(resbody));

             if(resbody.returnCode !== "000000000"){
               message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
               return;
             }
             message.success("校验验证码成功！");
             
            this.setState({
              visibleNewModify:true,
              visibleModify:false
            });
         })
      })
    }
    
    // componentWillUnmount(){
    // //   this.setState = (state, callback) => {
    // //     return
    // // }
    // };

    //进入新的手机/邮箱界面，返回到上一步
    PreviousModify = () =>{
      this.setState({
        visibleNewModify:false,
        visibleModify:true
      });
    }
    //取消新的手机/邮箱界面
    CancelModify = () =>{
      clearInterval(countdownTimeShow);
      this.setState({
        visibleNewModify:false,
        disbledNewGetVerifyCode:null,
      });
      this.props.form.resetFields();
    }
    //新的手机/邮箱获取验证码
    newGetVerifyCode = () =>
    {
      this.props.form.validateFields((err, values) => {
        //console.log("values:",values);
        let newGetVerifycodeBody ;
        
        if(flag === 1)
        {
          newGetVerifycodeBody = {
              "contact":"+86"+values.newCommunications,
              "country":"chinaPR"
            }
        }
        else if(flag === 0)
        {
          newGetVerifycodeBody = {
              "contact":values.newCommunications
          }
        }
        const data = JSON.stringify(newGetVerifycodeBody);
        
        let headers = {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': sessionStorage.getItem('access_token')
                      };
        //新的手机/邮箱获取验证码
        post("/member/verification-code", {data}, headers).then(
          (res) => {

            if(!res.success) {
              message.error(res.msg);
              return;
            }
            let resbody = JSON.parse(res.data.entity);
            console.info("新的手机/邮箱获取验证码返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
              message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
              return;
            }
            message.success("发送验证码成功！");
             //发送验证码成功后，需要60s后才能重新获取
             this.CountdownTime(60);
        })
     })
    }

    //第二次发送验证码，60秒倒计时
    CountdownTime  = (value) =>{
      let countdownTime = value;
      countdownTimeShow = setInterval(() => {
          this.setState({
            countdownTime,
            disbledNewGetVerifyCode:"success"
          });
          if(countdownTime === 0)
          {
            clearInterval(countdownTimeShow);
            this.setState({
              countdownTime:60,
              disbledNewGetVerifyCode:null,
            });
          }
          countdownTime--; 
      },1000);
    }

    //修改手机或邮箱
    NextModify= () =>
    {
      this.props.form.validateFields((err, values) => {
        //console.log("values:",values);
        clearInterval(countdownTimeShow);
        this.setState({
          disbledNewGetVerifyCode:null,
        });
        let modCommunicationBody ;
        
        if(flag === 1)
        {
          modCommunicationBody = {
             "contact":"+86"+ values.newCommunications,
             "country":"chinaPR",
             "verificationCode":values.newVerifyCode
           }
        }
        else if(flag === 0)
        {
          modCommunicationBody = {
            "contact":values.newCommunications,
            "verificationCode":values.newVerifyCode
          }
        }
        const data = JSON.stringify(modCommunicationBody);
        
        let headers = {'Content-Type': 'application/json',
                       'Accept': 'application/json',
                       'Authorization': sessionStorage.getItem('access_token')
                     };
       //修改手机或邮箱
       put("/member/contact", {data}, headers).then(
         (res) => {
 
             if(!res.success) {
               message.error(res.msg);
               return;
             }
             let resbody = JSON.parse(res.data.entity);
             console.info("修改手机或邮箱返回结果:",JSON.stringify(resbody));

             if(resbody.returnCode !== "000000000"){
               message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
               return;
             }
             message.success("修改手机或邮箱成功！");

             if(flag === 1)
             {
                this.setState({
                  phone:"+86"+ values.newCommunications
                });
             } 
             else if(flag === 0)
             {
                this.setState({
                  email:values.newCommunications
                });
             }
    
             this.setState({
              visibleNewModify:false
            });
         })
      })
    
    }
    
    //点击密码的修改
    ModifyPWDModal = () =>
    {
        this.setState({
            visibleModPwd:true
        });
    }
    //取消修改密码的界面
    handleCancelModifyPwd = () =>
    {
      this.setState({
          visibleModPwd:false
      });
      this.props.form.resetFields();
    }
    //修改密码
    handleModifyPwd = () =>
    {
      
      this.props.form.validateFields((err, values) => {
        //console.log("values:",values);
          //判断输出的密码是否相同  
          if(values.newPwd !== values.confirmPwd)
          {
              message.info("输入的密码不相同");
              return;
          }
          if(values.newPwd === undefined || values.confirmPwd === undefined || values.oldPwd === undefined)
          {
             message.info("请输入密码");
             return;
          }
          let modifyPwdBody = {
            "account":this.state.userAccount,
            "oldPwd":values.oldPwd,
            "newPwd":values.newPwd
          }
          const data = JSON.stringify(modifyPwdBody);

          let headers = {'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': sessionStorage.getItem('access_token')
                    };
          //修改密码
          put("/password/mod", {data}, headers).then(
            (res) => {
               
                if(!res.success) {
                  message.error(res.msg);
                  return;
                }
                let resbody = JSON.parse(res.data.entity);
                console.info("修改密码返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== "000000000"){
                  message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                  return;
                }
                message.success("修改密码成功！");
                const { history } = this.props;
                logout().then(() => {
                  history.push('/')
               })
          })
      })
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{ background: '#ECECEC', padding: '30px',width:'80%'}}> 
            <h4 style={{ marginBottom: 16 }}>个人信息</h4>
            <Card bordered={false}  style={{ width: '100%' }}>
            <FormWrapper style={{ marginTop: '27px', marginLeft: '80px' }} autoComplete="off">
            {
               this.state.status ? (
                <InfoItem label={"姓名"}>
                {getFieldDecorator('name', {
                   initialValue:this.state.name,
                   rules: [
                    {
                        required: true,
                        message: '用户姓名不能为空'
                    },
                    {
                        max: 64,
                        message: '用户姓名最多允许输入64个字符'
                    }
                ]
            })(<InputName />)}
            <DoubleOperateWrapper>
                <Link onClick={this.saveUserName}>保存</Link>
                <CancelSpan>
                    <Link onClick={this.cancelUserName}>取消</Link>
                </CancelSpan>
            </DoubleOperateWrapper>
            </InfoItem>
               ):(
                <InfoItem label={"姓名"}>
                    <ResultText>{this.state.name}</ResultText>
                <SingleOperateWrapper>
                  <Link onClick={this.modUserName}>修改</Link>
                </SingleOperateWrapper>
              </InfoItem> 
               ) 
            }
              <InfoItem label={"账号"}>
                  <ResultText>{this.state.userAccount}</ResultText> 
              </InfoItem> 
              <InfoItem label={"手机"}>
                  <ResultText>{this.state.phone}</ResultText>
                  <SingleOperateWrapper>
                    <Link onClick={this.showModifyModal.bind(this,1)}>修改</Link>
                  </SingleOperateWrapper>
              </InfoItem>
              <InfoItem label={"邮箱"}>
                  <ResultText>{this.state.email}</ResultText>
                  <SingleOperateWrapper>
                    <Link onClick={this.showModifyModal.bind(this,0)}>修改</Link>
                  </SingleOperateWrapper>
              </InfoItem>
              <Modal title={flag === 1?"修改手机":"修改邮箱"}  visible={this.state.visibleModify} onCancel={this.handleCancelModify} footer={null} style={{width:600}} maskClosable={false} keyboard={false}>
                  <InfoItem label={"验证方式"} >
                  {getFieldDecorator('verifyWays', {
                    initialValue:this.state.verifyWay,
                    rules: [{ required: true}],
                  })(
                      <Radio.Group style={{width:400}}>
                          <Radio value="phone" disabled={this.state.disableOldPhone}>原注册手机</Radio>
                          <Radio value="email" disabled={this.state.disableOldEmail}>原注册邮箱</Radio>
                      </Radio.Group>
                  )}
                  </InfoItem>
                  <InfoItem label="验证码" >
                      {getFieldDecorator('verifyCode', {
                          rules: [{ required: true, message:"请输入验证码"}],
                      })(
                        <div>
                          {!this.state.disbledGetVerifyCode ? (<Search  style={{ width:300, fontSize: 13 }}  enterButton="获取" onSearch={this.getVerifyCode}/>):(
                              <Search  style={{ width:300, fontSize: 13 }}  enterButton={this.state.countdown+"秒后重新获取"} /> 
                          )}
                        </div>
                      )}
                  </InfoItem>
                  <InfoItem  wrapperCol={{ span: 16 , offset:8}}>
                      <Button type="primary" htmlType="submit" onClick={this.handleNextModify}>下一步</Button>
                      <Button style={{ marginLeft: 24 }} onClick={this.handleCancelModify}>取消</Button>
                  </InfoItem>
              </Modal>
              <Modal title={flag === 1?"修改手机":"修改邮箱"} visible={this.state.visibleNewModify} onCancel={this.CancelModify} footer={null} maskClosable={false} keyboard={false} >
                  <InfoItem label={flag === 1?"新手机号":"新邮箱"} >
                  {getFieldDecorator('newCommunications', {
                    rules: [{ required: this.state.visibleNewModify,message : flag === 1?"请输入新手机号":"请输入新邮箱"}],
                  })(
                    flag === 1?(<Input addonBefore={"+86(中国大陆)"} style={{ width:300, fontSize: 13 }}/>):(
                      <Input style={{ width:300, fontSize: 13 }}/>
                    )
                  )}
                  </InfoItem>
                  <InfoItem label="验证码" >
                      {getFieldDecorator('newVerifyCode', {
                          rules: [{ message:"请输入验证码"}],
                          // rules: [{ required: this.state.visibleNewModify, message:"请输入验证码"}],
                      })(
                        <div>
                          {!this.state.disbledNewGetVerifyCode ? (<Search  style={{ width:300, fontSize: 13 }}  enterButton="获取" onSearch={this.newGetVerifyCode}/>):(
                              <Search  style={{ width:300, fontSize: 13 }}  enterButton={this.state.countdownTime +"秒后重新获取"} /> 
                          )}
                        </div>
                      )}
                  </InfoItem>
                  <InfoItem  wrapperCol={{ span: 16 , offset:8}}>
                      <Button type="primary" htmlType="submit" onClick={this.PreviousModify}>上一步</Button>
                      <Button type="primary" htmlType="submit" style={{ marginLeft: 16 }} onClick={this.NextModify}>完成</Button>
                      <Button style={{ marginLeft: 24 }} onClick={this.CancelModify}>取消</Button>
                  </InfoItem>
              </Modal>
              <InfoItem label={"号码"}>
                  <ResultText>{this.state.sipNum}</ResultText> 
              </InfoItem>
              <InfoItem label={"登录密码"}>
                  <ResultText>*******</ResultText>
                  <SingleOperateWrapper>
                    <Link onClick={this.ModifyPWDModal}>修改</Link>
                  </SingleOperateWrapper> 
              </InfoItem>
              <Modal title="修改密码" visible={this.state.visibleModPwd}  onCancel={this.handleCancelModifyPwd} footer={null} maskClosable={false} keyboard={false}>
                  <InfoItem label={"旧密码"}>
                  {getFieldDecorator('oldPwd', {
                    rules: [{ required: this.state.visibleModPwd, message:"请输入旧密码"}],
                  })(
                      <InputName type="password" placeholder="请输入旧密码"/>
                  )}
                  </InfoItem>
                  <InfoItem label="新密码" >
                      {getFieldDecorator('newPwd', {
                          rules: [{ required: this.state.visibleModPwd, message:"请输入新密码"}],
                      })(
                          <InputName type="password" placeholder="请输入新密码"/>
                      )}
                  </InfoItem>
                  <InfoItem label="确定密码" >
                      {getFieldDecorator('confirmPwd', {
                          rules: [{ required: this.state.visibleModPwd, message:"请输入确定密码"}],
                      })(
                          <InputName type="password" placeholder="请输入确定密码"/>
                      )}
                  </InfoItem>
                  <InfoItem  wrapperCol={{ span: 8 , offset:8}}>
                      <Button type="primary" htmlType="submit" onClick={this.handleModifyPwd}>确定</Button>
                      <Button style={{ marginLeft: 24 }} onClick={this.handleCancelModifyPwd}>取消</Button>
                  </InfoItem>
              </Modal>
              <InfoItem label={"个人会议ID"}>
                  <ResultText>{this.state.vmrId}</ResultText> 
              </InfoItem>  
              <InfoItem label={"所在企业"}>
                  <ResultText>{this.state.corpName}</ResultText> 
              </InfoItem>
              <InfoItem label={"部门"}>
                  <ResultText>{this.state.deptName}</ResultText> 
              </InfoItem>
              <InfoItem label={"企业管理员"}>
                  <ResultText>{ "姓名("+ this.state.adminName+ ") ,手机(" +(this.state.adminPhone === null?"无":this.state.adminPhone)+"),邮箱(" + (this.state.adminEmail=== null?"无":this.state.adminEmail)+")"}</ResultText>
              </InfoItem>
            </FormWrapper>
            </Card>
            </div>
        )
    }
}
const setUserInfoPage = Form.create({
    onValuesChange(props,changedValues,values) {
        userName = values.name;
        verifyWays = values.verifyWays;
    }
})(setUserInfo);
export default setUserInfoPage