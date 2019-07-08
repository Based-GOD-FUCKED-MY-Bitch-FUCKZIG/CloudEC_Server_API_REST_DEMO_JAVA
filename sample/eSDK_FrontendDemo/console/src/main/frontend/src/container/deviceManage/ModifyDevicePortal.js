/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { get } from '@/utils/request';
import { message,Form,Input,Card,Row,Col,Button,Select,Modal,Icon,Breadcrumb   } from 'antd';
import { put } from '@/utils/request'
import QueryTree from '@/container/corpManage/QueryTree'
import i18n from '@/locales'

const { Option } = Select;
const { TextArea } = Input;
/**
 * 修改设备管理页面
 */
class ModifyDevicePortal extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            deptCode: this.props.location.search.split("=")[1],
            required:false,
            sn: this.props.match.params.sn,
            visible:false,
        }
        this.queryDept(this.state.deptCode)
                  
    }
    
    componentWillMount=()=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        } 
        //查询设备
        get("/rest/usg/datacenter/v1/corp/device/"+this.state.sn, headers).then((res)=>
        {  
            if(!this.failTip(res)){
                return;
            } 
            this.setState({
                name: JSON.parse(res.data.entity).data.name,
                model: JSON.parse(res.data.entity).data.model,
                sn: JSON.parse(res.data.entity).data.sn,
                number:JSON.parse(res.data.entity).data.number,
                phone: JSON.parse(res.data.entity).data.phone===null?"":JSON.parse(res.data.entity).data.phone.substring(3),
                email: JSON.parse(res.data.entity).data.email,
                description: JSON.parse(res.data.entity).data.description
            })
        })
    }
    //查询部门
    queryDept=(deptCode)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        };
        get("/rest/usg/datacenter/v1/member/dept/"+deptCode, headers).then(
            (res) => {
                if(!this.failTip(res)){
                    return;
                } 
                const deptNamePath = JSON.parse(res.data.entity).data.deptNamePath
                const deptNameePathSplit = deptNamePath.split("#")
                var deptNames = deptNameePathSplit[deptNameePathSplit.length-1]
                for(var i = deptNameePathSplit.length-1; i>0; i--){
                    deptNames += "【"+deptNameePathSplit[i-1]+"】"
                }
                this.setState({
                    deptNamePath:deptNames
                })
                this.props.form.setFieldsValue({ "deptName": deptNames })
        })  
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {               
                if((values.email === undefined || values.email === "" )&& (values.phone === undefined ||
                     values.phone === "")){
                    Modal.info({
                        title: '请输入手机号和邮箱地址',
                        content: "需要用户手机或邮箱登录客户端/CloudLink 管理平台，或接收会议通知等信息"                       
                    });
                    return;
                }              
                let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token')
                };
                let modifyDeviceBody;

                if(values.phone!==undefined && values.phone!==""){
                    modifyDeviceBody={
                        deptCode:this.state.deptCode,
                        name:values.name,
                        phone:values.prefix+values.phone,
                        email:values.email,
                        description:values.description
                    }                    
                }
                else{
                    modifyDeviceBody={
                        deptCode:this.state.deptCode,
                        name:values.name,
                        phone:"",
                        email:values.email,
                        description:values.description,
                        country:""
                    } 
                }
                var data = JSON.stringify(modifyDeviceBody)
                //修改终端
                put('/rest/usg/datacenter/v1/corp/device/'+this.state.sn, {data}, headers).then(
                    (res) => {
                        if(!this.failTip(res)){
                            return;
                        }
                        message.success("操作成功")
                        const {match} = this.props;
                        const deviceUrl = match.path
                        this.props.history.push(deviceUrl.split('/modify')[0])
                })
            }
        });
    };

    handleCancle = () => {

        this.props.history.go(-1)

    }; 

    handleOk=()=>{
        if(!this.state.selected){
            this.setState({
                visible: false,
            }); 
        }else{
            this.queryDept(this.state.deptCode)
            this.setState({
                visible: false,
            });  
        }        
    }
    
    handleCancel = ()=> {
        this.setState({
            visible: false,
        });
    };   
    
    showDept=()=>{
        this.setState({
            visible: true,
        });
    }

    printContent=(messageInfo)=>{
        var { deptCode } = messageInfo
        this.setState({
            deptCode:deptCode,
        })
    }
    isSelected=(selected)=>{
        this.setState({
            selected:selected
        })
    }
    //结果返回错误提示
    failTip=(res)=>{
        if(!res.success) {
            message.info(res.msg);
            return false;
        }

        let resbody = JSON.parse(res.data.entity);
        if(resbody.returnCode !== "000000000"){
            message.error(resbody.returnCode+":"+ i18n.t(resbody.returnCode))
            return false;
        }
        return true;
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 8 },
              md: { span: 100 },
            },
          }; 
          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+86',
          })(
            <Select style={{ width: 135 }}>
              <Option value="+86">+86(中国大陆)</Option>              
            </Select>,
          );   
        return( 
            <div style={{ background: '#ECECEC', padding: '30px',width:'100%',height:'100%'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>企业</Breadcrumb.Item>
                    <Breadcrumb.Item>终端管理</Breadcrumb.Item>
                    <Breadcrumb.Item>修改硬件终端</Breadcrumb.Item>
                </Breadcrumb>
                <h3 style={{ marginBottom: 16 }}>修改硬件终端</h3>
                <Card>
                    <Modal  title="选择部门"                           
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            maskClosable={false} keyboard={false}>

                            <QueryTree onSubmit={this.printContent} onSelect={this.isSelected}/>
                    </Modal>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign='left'> 
                        <Form.Item label="名称" >
                            {getFieldDecorator('name', {
                                initialValue:this.state.name,
                                rules: [                          
                                {
                                    required: true,
                                    message: '硬件终端名称不能为空',
                                },
                                ],
                            })(<Input placeholder='请输入名称'/>)}
                        </Form.Item>
                        <Form.Item label="设备型号" style={{marginTop:-5}}>
                            {getFieldDecorator('model', {
                                initialValue:this.state.model,
                                rules: [                          
                                {
                                    required: true,
                                    message: '硬件终端设备型号不能为空',
                                },
                                ],                               
                            })(<Input style={{border:'none',boxShadow: 'none'}} readOnly/>)                                                           
                            }
                        </Form.Item>
                        <Form.Item label="SN码" style={{marginTop:-5}}>
                            {getFieldDecorator('sn', {
                                initialValue:this.state.sn,
                                rules: [                          
                                {
                                    required: true,
                                    message: 'SN码不能为空',
                                },
                                ],
                            })(<Input style={{border:'none',boxShadow: 'none'}} readOnly/>)}
                        </Form.Item>
                        <Form.Item label="号码" style={{marginTop:-5}}>
                            {getFieldDecorator('number', {
                                initialValue:this.state.number,
                            })(<Input style={{border:'none',boxShadow: 'none'}} readOnly/>)}
                        </Form.Item>
                        <Form.Item label="选择部门" style={{marginTop:-5}}>
                            {getFieldDecorator('deptName', {
                                initialValue:this.state.deptNamePath,
                                rules: [                          
                                {
                                    required: true,
                                    message: '部门不能为空',                                   
                                },
                                ],
                                
                            })(<Input addonAfter={<Icon type="cluster" onClick={this.showDept}/>} readOnly/>)}
                        </Form.Item>
                        <Form.Item label="手机" style={{marginTop:-5}}>
                            {getFieldDecorator('phone', {
                                initialValue:this.state.phone,
                                rules: [
                                {
                                    pattern: /^[0-9]*$/,
                                    message: '手机号码只允许纯数字',
                                }                                                             
                                ],
                            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='请输入手机号'/>)}
                        </Form.Item>
                        <Form.Item label="邮箱" style={{marginTop:-5}}>
                            {getFieldDecorator('email', {
                                initialValue:this.state.email,
                                rules: [
                                {
                                    type: 'email',
                                    message: '邮箱地址格式不正确',
                                },                              
                                ],
                            })(<Input placeholder='请输入邮箱'/>)}
                        </Form.Item>
                        <Form.Item label="备注" style={{marginTop:-5}}>
                            {getFieldDecorator('description', {
                                initialValue:this.state.description,
                            })(<TextArea placeholder='请输入备注'/>)}
                        </Form.Item>                         
                        <Row>
                            <Col span={12} style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit">
                                保存
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleCancle}>
                                取消
                                </Button>
                                
                            </Col>
                        </Row>
                    </Form> 
                    
                </Card>
            </div>                      
        )
    }
}
const ModifyDevicePortalForm = Form.create({ name: 'addDevice' })(ModifyDevicePortal)
export default ModifyDevicePortalForm;