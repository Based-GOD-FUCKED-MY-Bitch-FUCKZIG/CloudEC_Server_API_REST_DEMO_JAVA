/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { get } from '@/utils/request';
import { message,Form,Input,Card,Row,Col,Button,Select,Modal,Breadcrumb,Icon   } from 'antd';
import { post } from '@/utils/request'
import QueryTree from '@/container/corpManage/QueryTree'
import i18n from '@/locales'

const { Option } = Select;
const { TextArea } = Input;
/**
 * 增加设备的管理页面
 */
class AddDevicePortal extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            deptCode: this.props.location.search.split("=")[1],
            showSN:"none",
            required:false,
        }
        this.queryDept(this.state.deptCode)
                  
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
                let addDeviceBody;
                if(values.phone!==undefined){
                    addDeviceBody={deptCode:this.state.deptCode,model:values.model,name:values.name,
                        phone:values.prefix+values.phone,sn:values.sn,email:values.email,description:values.description
                    }                    
                }
                else{
                    addDeviceBody={deptCode:this.state.deptCode,model:values.model,name:values.name,
                        phone:"",sn:values.sn,email:values.email,description:values.description
                    } 
                }
                var data = JSON.stringify(addDeviceBody)
                //增加终端
                post("/rest/usg/datacenter/v1/corp/device", {data}, headers).then(
                    (res) => {
                        if(!this.failTip(res)){
                            return;
                        }
                        message.success("操作成功")
                        const {match} = this.props;
                        const deviceUrl = match.path
                        this.props.history.push(deviceUrl.split('/create')[0])
                })
            }
        });
    };

    handleCancle = () => {
    const {match} = this.props;
    const deviceUrl = match.path
    this.props.history.push(deviceUrl.split('/create')[0])

    };

    onChange=(value)=>{
        if(value==="Polycom RealPresence Group 310"||
            value==="Polycom 550"||
            value==="RealPresence Group 500"||
            value==="SX20"){
            this.setState({
                showSN:"none",
                required:false
            })
        }else{
            this.setState({
                showSN:"block",
                required:true
            })
        }
        
    }

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
    isSelected=(selected)=>{
        this.setState({
            selected:selected
        })
    }
    printContent=(messageInfo)=>{
        var { deptCode } = messageInfo
        this.setState({
            deptCode:deptCode,
        })
    }
    //结果返回错误提示
    failTip=(res)=>{
        if(!res.success) {
            message.error(res.msg);
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
                    <Breadcrumb.Item>添加硬件终端</Breadcrumb.Item>
                </Breadcrumb>
                <h3 style={{ marginBottom: 16 }}>添加硬件终端</h3>
                <Card>
                <Modal  title="选择部门"                           
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            maskClosable={false} keyboard={false}>

                            <QueryTree onSubmit={this.printContent} onSelect={this.isSelected}/>
                    </Modal>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign='left'> 
                        <Form.Item label="名称">
                            {getFieldDecorator('name', {
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
                                rules: [                          
                                {
                                    required: true,
                                    message: '硬件终端设备型号不能为空',
                                },
                                ],                               
                            })(                              
                                <Select 
                                showSearch
                                style={{ width: 300 }}
                                placeholder="Select a device"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            > 
                                <Option value="DP300">DP300</Option>
                                <Option value="HUAWEI Bar 500">HUAWEI Bar 500</Option>
                                <Option value="HUAWEI Board">HUAWEI Board</Option>
                                <Option value="HUAWEI Box 500">HUAWEI Box 500</Option>
                                <Option value="HUAWEI Box 700">HUAWEI Box 700</Option>
                                <Option value="HUAWEI Box 900">HUAWEI Box 900</Option>
                                <Option value="TE10">TE10</Option>
                                <Option value="TE20">TE20</Option>
                                <Option value="TE30">TE30</Option>
                                <Option value="TE40">TE40</Option>
                                <Option value="TE50">TE50</Option>
                                <Option value="TE60">TE60</Option>
                                <Option value="Polycom RealPresence Group 310">Polycom RealPresence Group 310</Option> 
                                <Option value="Polycom 550">Polycom 550</Option> 
                                <Option value="RealPresence Group 500">RealPresence Group 500</Option> 
                                <Option value="SX20">SX20</Option>                                 
                            </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="SN码" style={{display:this.state.showSN,marginTop:-5}}>
                            {getFieldDecorator('sn', {
                                rules: [                          
                                {
                                    required: this.state.required,
                                    message: 'SN码不能为空',
                                },
                                ],
                            })(<Input />)}
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
const AddDevicePortalForm = Form.create({ name: 'addDevice' })(AddDevicePortal)
export default AddDevicePortalForm;