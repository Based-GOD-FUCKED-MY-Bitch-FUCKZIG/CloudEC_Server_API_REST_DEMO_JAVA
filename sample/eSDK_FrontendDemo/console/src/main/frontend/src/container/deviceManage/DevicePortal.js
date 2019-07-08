/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { put } from '@/utils/request';
import { message,Table,Button,Tooltip,Icon,Modal,Layout,Menu,Dropdown,Form,Input,Select,Breadcrumb   } from 'antd';
import { post } from '@/utils/request'
import CrudTree from '@/container/deptTree/CrudTree'
import i18n from '@/locales'
import {Link} from 'react-router-dom'

var devices = []
const {  Sider, Content } = Layout
const { Option } = Select;
var sns = []

var deptCodeTemp = "1";
/**
 * 设备管理页面
 */
class DevicePortal extends React.Component {
    
    constructor(){
        super();
        this.state={
            devices:[],
            disabled:true,
            deptCode:"1",
            visible:false
        }
        this.queryDevices("1",1)
        
    }
    
    onShowSizeChange=(current, pageSize)=>{
        var queryBody={"pageIndex":current,"pageSize":pageSize}
        var data = JSON.stringify(queryBody)
        this.pageQueryCorpManager(data)
    }
    onChange=(current,pageSize)=>{
        var queryBody={"pageIndex":current,"pageSize":pageSize}
        var data = JSON.stringify(queryBody)
        this.pageQueryCorpManager(data)      
    }
    onDeviceChange=(current)=>{
        if(this.state.deptCode === undefined){
            this.queryDevices('1',current)
        }else{
            this.queryDevices(this.state.deptCode,current)
        }
        
    }
    
    //查询设备列表
    queryDevices=(deptCode,pageIndex)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        };

        var queryBody = {
            "pageIndex":pageIndex,"pageSize":10,"deptCode":deptCode
        }
        var data = JSON.stringify(queryBody)

        post("/rest/usg/datacenter/v1/corp/device/search", {data}, headers).then(
            (res) => {
                if(!this.failTip(res)){
                    return;
                }
                
                devices = JSON.parse(res.data.entity).data.data

                this.setState({
                    devices: devices,
                    totalDevices:JSON.parse(res.data.entity).data.totalCount,
                    selectedRowKeys:[]              
                });
            })   
    }

    //删除设备
    delDevice=(data)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
      };
      post("/rest/usg/datacenter/v1/corp/device/delete", {data}, headers).then(
        (res) => {
            if(!this.failTip(res)){
                return;
            }
            this.queryDevices(deptCodeTemp,1)
            message.success('操作成功')
           
        })
    }
    delDevices=(data)=>{
        const delDevices =(data) =>  this.delDevice(data)      
        
            Modal.confirm({
                title: '确定要删除此硬件终端吗?',
                onOk() {
                    delDevices(data)
                },
                onCancel() {
                    //console.log('Cancel');
                },
            });            
    }

    //点击修改按钮跳转修改页面
    modifyDevices=()=>{
        const {match} = this.props;
        this.props.history.push(`${match.path}/modify/`+this.state.sn+`?deptCode=`+this.state.deptCode)

    }
    //点击增加按钮跳转增加页面
    linkToAddDevicePortal=()=>{
        const {match} = this.props;
        this.props.history.push(`${match.path}/create?deptCode=`+deptCodeTemp)
        deptCodeTemp = "1"
    }
    
    //启用or停止使用终端
    start=(status)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        };
        var data=JSON.stringify([this.state.sn])
        put('/rest/usg/datacenter/v1/corp/device/status/'+status, {data}, headers).then(
            (res) => {
                if(!this.failTip(res)){
                    return;
                }
                this.queryDevices(deptCodeTemp,1)
                message.success('操作成功')
            })
    }

    showResetModal=()=>{
        this.setState({
            visible: true,
          });
    }
    //点击ok，调用重置激活码接口
    handleOk =()=> {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token')
                };
                var requestBody;
                if(values.phone===''||values.phone===undefined){
                    requestBody = {country:'',emailAddr:values.email,smsNumber:''}
                }else{
                    requestBody = {country:'chinaPR',emailAddr:values.email,smsNumber:values.prefix+values.phone}
                }
                const data = JSON.stringify(requestBody)
                put('/rest/usg/datacenter/v1/corp/device/'+this.state.sn+'/activecode', {data}, headers).then(
                    (res) => {
                        if(!this.failTip(res)){
                            return;
                        }
                    message.success('操作成功') 
                    this.setState({
                        visible: false,
                    });
                })                
            }
        });
        
    };
    
    handleCancel=()=> {
        this.setState({
            visible: false,
        });
    };

    printContent = (messageInfo) =>{
        var { deptCode } = messageInfo
        deptCodeTemp = deptCode
        this.queryDevices(deptCode,1)
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
        const {match} = this.props;
        const menu = (
            <Menu>             
                <Menu.Item>
                    <div onClick={this.showResetModal}>                  
                        重置激活码                   
                    </div>                    
                </Menu.Item>
                <Menu.Item style={{display:this.state.status===0?'none':'block'}}>
                    <div onClick={this.start.bind(this,0)} >                   
                        启用                  
                    </div>                
                </Menu.Item> 
                <Menu.Item style={{display:this.state.status===1?'none':'block'}}>
                    <div onClick={this.start.bind(this,1)}>                   
                        停用                  
                    </div>                
                </Menu.Item>            
            </Menu>
        );
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                fixed: 'left',
                render:(text)=>{
                    return <Link to={`${match.path}/detail?sn=`+this.state.sn}>{text}</Link>
                }
            },
            {
                title: '部门',
                dataIndex: 'deptNamePath',
                key: 'deptNamePath',
                render:(text)=>{
                    const deptNameePathSplit = text.split("#")
                    var deptNames = deptNameePathSplit[deptNameePathSplit.length-1]
                    for(var i = deptNameePathSplit.length-1; i>0; i--){
                        deptNames +="【"+deptNameePathSplit[i-1]+"】"
                    }
                    return deptNames
                }
            },
            {
                title: '号码',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: '设备型号',
                dataIndex: 'model',
                key: 'model',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render:(text)=>{
                    if(text === 0){
                        return "启用"
                    }else{
                        return "停用"
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'operator',
                key: 'operator',
                fixed: 'right',
                width: 100,
                render:(text,record)=>(
                    
                <span>
                    <Tooltip placement="bottom" title='修改'>
                        <Icon type="edit" style={{color:'#4876FF',fontSize:15}} onClick={this.modifyDevices}/>
                    </Tooltip>
                    <Tooltip placement="bottom" title='删除'>
                        <Icon type="delete" style={{color:'#4876FF',fontSize:15,marginLeft:5}} onClick={this.delDevices.bind(this,JSON.stringify([this.state.sn]))}/>
                    </Tooltip>
                    <Dropdown overlay={menu} style={{disabled:'true'}}>
                        <Icon type="more" style={{color:'#4876FF',fontSize:15,marginLeft:5}} />
                    </Dropdown>
                </span>)
            }          
          ];
          const { selectedRowKeys } = this.state;
          // rowSelection object indicates the need for row selection
          const rowSelection = {
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => { 
          sns=[]   
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

          if(selectedRowKeys.length===0){
              this.setState({
                  disabled:true
              })
          }else{
              this.setState({
                  disabled:false
              })
          }
          for(var i=0;i<selectedRows.length;i++){
            sns.push(selectedRows[i].sn)
          }
          this.setState({
              sns:sns,
              selectedRowKeys
          })
          }        
        };  

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 10 },
            },
          }; 
          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="+86">+86</Option>
            </Select>,
          );      
        return(                                                     
            <Layout> 
                <Content style={{ background: '#ECECEC', padding: '30px',width:'100%',height:'100%'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>企业</Breadcrumb.Item>
                    <Breadcrumb.Item>终端管理</Breadcrumb.Item>
                </Breadcrumb>  
                    <Layout>
                    
                        <Sider width={220} style={{background: 'white',padding: 24,margin: 0,minHeight: 280,overflowX:'auto'}}>
                            <CrudTree onSubmit={this.printContent}/>                                                           
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280,background:'white' }}>
                                <div style={{ position: 'relative',zIndex: 1}}>
                                    <div style={{float:'left'}} >
                                        <Button type="primary" onClick={this.linkToAddDevicePortal}>添加
                                        </Button></div>
                                    <div style={{float:'left',marginLeft:'10px'}}><Button disabled={this.state.disabled} 
                                        onClick={this.delDevices.bind(this,JSON.stringify(this.state.sns))}>删除</Button></div>    
                                    </div>                                                                                                                     
                                <Table rowKey={record => record.id} columns={columns} rowSelection={rowSelection} dataSource={this.state.devices} scroll={{ x: 800 }} size={'small'}
                                    pagination={{ pageSize: 10,total:this.state.totalDevices,onChange:this.onDeviceChange}}
                                    onRow={record =>{
                                    return {
                                        onMouseOver: event => {
                                            this.setState({
                                                sn:record.sn, 
                                                status:record.status,
                                                deptCode:record.deptCode,
                                                email:record.email,
                                                phone:record.phone===null?"":record.phone.split("+86")[1]                                               
                                            })                      
                                        },
                                    }
                                }}/> 
                                <Modal  title="重置激活码"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    maskClosable={false} keyboard={false}>
                                    <div style={{fontSize:10,marginBottom:20}}>请确认或重填接收激活码的手机或邮箱</div>
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign='left'>
                                        <Form.Item label="手机">
                                            {getFieldDecorator('phone', {
                                                initialValue:this.state.phone,
                                                rules: [
                                                {
                                                    pattern: /^[0-9]*$/,
                                                    message: '手机号码只允许纯数字',
                                                }                                                             
                                                ],
                                            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                                        </Form.Item>
                                        <Form.Item label="邮箱">
                                            {getFieldDecorator('email', {
                                                initialValue:this.state.email,
                                                rules: [
                                                {
                                                    type: 'email',
                                                    message: '邮箱地址格式不正确',
                                                },                              
                                                ],
                                            })(<Input />)}
                                    </Form.Item>
                                    </Form>                                                
                                </Modal>   
                        </Content>
                    </Layout>
                </Content>                            
            </Layout>                        
                                             
            
        )
    }
}
const ResetDevicePortalForm = Form.create({ name: 'addDevice' })(DevicePortal)
export default ResetDevicePortalForm;
