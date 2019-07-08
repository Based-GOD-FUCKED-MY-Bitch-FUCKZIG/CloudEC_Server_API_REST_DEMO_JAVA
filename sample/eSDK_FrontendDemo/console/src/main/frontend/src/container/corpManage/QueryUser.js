/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { message,Form,Button,Layout,Breadcrumb,Card} from 'antd'
import { get } from '@/utils/request'
import i18n from '@/locales'
import styled from 'styled-components';

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

const { Content } = Layout;

class QueryUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userAccount: this.props.match.params.userAccount,
            headers: {'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('access_token')}
        }
    }

    componentDidMount() {
        //查询用户详情
        get("/corp/member/"+this.state.userAccount, this.state.headers, null).then(
            (res) => {
                if(!res.success) {
                    message.info(res.msg);
                    return;
                }
    
                let resbody = JSON.parse(res.data.entity);
                console.info("查询用户详情返回结果:",JSON.stringify(resbody));
                
                if(resbody.returnCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                this.setState({
                    name:resbody.data.name,
                    phone:resbody.data.phone,
                    email:resbody.data.email,
                    sipNum:resbody.data.sipNum,
                    vmrId:resbody.data.vmrList[0].vmrId,
                    deptName:resbody.data.deptName,
                })
            })
    }

    //修改用户信息，并保存
    editUserInfo = () =>{
        const { history,match } = this.props;
        let pathUrl = `${match.path}`;
        let path = pathUrl.split("/")[1];
        history.push('/' + path + '/editCorpUser/'+this.state.userAccount);
    }

    CancelQUserInfo = () =>{
        this.props.history.go(-1);
    }

    render(){
        return(
            <Layout>
                <Content style={{ background: '#ECECEC', padding: '30px',width:'100%',height:'100%'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>企业</Breadcrumb.Item>
                        <Breadcrumb.Item>查询用户</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout>
                        {/* <Content style={{ padding: '0 24px', minHeight: 280 }}> */}
                        <Card >
                            <FormWrapper>
                                <InfoItem label="姓名" >
                                    {this.state.name}
                                </InfoItem>

                                <InfoItem label="账号" >
                                    {this.state.userAccount}
                                </InfoItem>

                                <InfoItem label="手机" >
                                    {this.state.phone}
                                </InfoItem>

                                <InfoItem label="邮箱" >
                                    {this.state.email}
                                </InfoItem>

                                <InfoItem label="号码" >
                                    {this.state.sipNum}
                                </InfoItem>

                                <InfoItem label="个人会议ID" >
                                    {this.state.vmrId} 
                                </InfoItem>

                                <InfoItem label="部门" >
                                    {this.state.deptName}
                                </InfoItem>

                                <InfoItem wrapperCol={{ span: 5, offset:2}}>
                                    <Button type="primary" htmlType="submit" onClick={this.editUserInfo}>编辑</Button>
                                    <Button style={{ marginLeft: 24}} onClick={this.CancelQUserInfo}>取消</Button>
                                </InfoItem>
                            </FormWrapper>
                        </Card>
                        {/* </Content> */}
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

export default Form.create()(QueryUser);