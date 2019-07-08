/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { message,Icon,Form,Input,Button, Select,Layout,Breadcrumb,Modal,Card} from 'antd'
import { get,put } from '@/utils/request'
import QueryDeptTree from '@/container/deptTree/Tree'
import { countryCode,country } from '@/component/custom/CountryCode'
import i18n from '@/locales'
import styled from 'styled-components';

const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

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

class EditCorpUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userAccount: this.props.match.params.userAccount,
            editUserVisable: false,
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
                    message.error(res.msg);
                    return;
                }
    
                let resbody = JSON.parse(res.data.entity);
                console.info("查询用户详情返回结果:",JSON.stringify(resbody));
                
                if(resbody.returnCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                let phone = resbody.data.phone;
                let countryCode;
                let realPhone;
                if(phone !== null){
                    countryCode = country[resbody.data.country];
                    realPhone = phone.substring(countryCode.length+1);
                }else{
                    countryCode = "86"
                }

                let deptPath = this.handleDeptNamePath(resbody.data.deptNamePath);
                this.setState({
                    name:resbody.data.name,
                    phone:realPhone,
                    email:resbody.data.email,
                    sipNum:resbody.data.sipNum,
                    vmrId:resbody.data.vmrList[0].vmrId,
                    deptName:deptPath,
                    deptCode:resbody.data.deptCode,
                    signature:resbody.data.signature,
                    countryCode,
                })
            })
    }

    //修改用户信息，并保存
    savaModUserInfo = () =>{
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

            //console.log("values:",values);
            if( (values.phone === undefined||values.phone ===""||values.phone === null) && 
            (values.email === undefined||values.email ===""||values.email ===null) ) {
                message.info("请输入手机号或邮箱！");
                return;
            }

            let phone = "";
            let country = "";
            if(values.phone !== undefined && values.phone !=="" && values.phone !== null){
                phone = "+" + values.prefix + values.phone;
                country = countryCode[values.prefix];
            }

            let ModUserInfoBody={
                name:values.name,
                phone:phone,
                email:values.email,
                deptCode:this.state.deptCode,
                signature:values.signature,
                country:country
            }
            const data = JSON.stringify(ModUserInfoBody);
            console.info("修改用户信息body:",data);
            
            put("/corp/member/"+this.state.userAccount, {data}, this.state.headers).then(
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
                    message.success("修改用户信息成功！");

                    const { history,match } = this.props;
                    let pathUrl = `${match.path}`;
                    let path = pathUrl.split("/")[1];
                    history.push('/' + path + '/corpDept/');
               }) 
        })
    }

    //修改用户时，选择部门
    selectDeptName = () =>{
        this.setState({
            editUserVisable: true,
        })
    }

    //取消修改用户信息
    CancelModUserInfo = () =>{
        this.props.history.go(-1);
    }

    //保存修改用户信息
    handleEditUserOk = () => {
        if(this.state.selectedDeptCode !== undefined){
            this.setState({
                deptName: this.state.selectedDeptName,
                deptCode: this.state.selectedDeptCode,
            });
        }

        this.setState({
            editUserVisable: false,
        });
    };
    
    handleEditUserCancel = () => {
        this.setState({
            editUserVisable: false,
        });
    };

    //接收从子组件传递过来的信息
    printContent = (messageInfo) =>{
        var { deptCode,deptNamePath } = messageInfo;
        //console.log("deptcode:"+deptCode);

        let deptPath = this.handleDeptNamePath(deptNamePath);
        this.setState({
            selectedDeptCode:deptCode,
            selectedDeptName:deptPath
        })
    }

    handleDeptNamePath = (path) =>{
        return (
            path && path.split('#').reverse().map((item,index)=>{
                if(index !== 0 )
                {
                return "【"+item+"】";
                }
                return item;
            })
            .join('')
        );
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: this.state.countryCode,
          })(
            <Select style={{ width: 'auto' }}>
              <Option value="86">+86(中国大陆)</Option>
              <Option value="886">+886(中国台湾)</Option>
            </Select>,
          );

        return(
            <Layout>
                <Content style={{ background: '#ECECEC', padding: '30px',width:'100%',height:'100%'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>企业</Breadcrumb.Item>
                        <Breadcrumb.Item>编辑用户</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout>
                        {/* <Content style={{ padding: '0 24px', minHeight: 280 }}> */}
                        <Card >
                            <FormWrapper style={{ marginLeft: '15px'}} autoComplete="off">   
                                <InfoItem label="姓名" >
                                    {getFieldDecorator('name', {
                                        initialValue:this.state.name,
                                        rules: [{ required: true, message: '用户名不能为空!' }],
                                    })(<Input size="small" />)}
                                </InfoItem>

                                <InfoItem label="账号" >
                                    {this.state.userAccount}
                                </InfoItem>

                                <InfoItem label="手机" >
                                    {getFieldDecorator('phone',{
                                        initialValue:this.state.phone,
                                        rules: [
                                            {
                                                pattern:/^[0-9]*$/,
                                                message:"手机号只能是纯数字！",
                                            },
                                        ],
                                    })(<Input addonBefore={prefixSelector} size="small"/>)}
                                </InfoItem>
                                
                                <InfoItem label="邮箱" >
                                    {getFieldDecorator('email',{
                                        initialValue:this.state.email,
                                        rules: [
                                            {
                                                type:"email",
                                                message:"邮箱格式不正确!",
                                            },
                                        ],
                                    })(<Input size="small"/>)}
                                </InfoItem>

                                <InfoItem label="号码" >
                                    {this.state.sipNum}
                                </InfoItem>

                                <InfoItem label="个人会议ID" >
                                    {this.state.vmrId} 
                                </InfoItem>

                                <InfoItem label="选择部门" >
                                    {getFieldDecorator('deptName', {
                                        initialValue:this.state.deptName,
                                    })( 
                                        <Input readOnly addonAfter={<span><Icon type="apartment" onClick={this.selectDeptName} style={{color:'blue'}}/></span>}/>)}
                                </InfoItem>

                                <InfoItem label="备注" >
                                    {getFieldDecorator('signature', {
                                        initialValue:this.state.signature,
                                    })(
                                        <TextArea rows={4} style={{ fontSize: 13 }}/>)}
                                </InfoItem>

                                <InfoItem wrapperCol={{ span: 5, offset:6}}>
                                    <Button type="primary" htmlType="submit" onClick={this.savaModUserInfo}>保存</Button>
                                    <Button style={{ marginLeft: 24 }} onClick={this.CancelModUserInfo}>取消</Button>
                                </InfoItem>
                            </FormWrapper>

                            <Modal title="选择部门" visible={this.state.editUserVisable} okText="确认" cancelText="取消" onOk={this.handleEditUserOk} onCancel={this.handleEditUserCancel}
                            maskClosable={false} keyboard={false}>
                                <QueryDeptTree deptCode={this.state.deptCode} onSubmit={this.printContent}/>
                            </Modal>
                        {/* </Content> */}
                        </Card>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

export default Form.create()(EditCorpUser);