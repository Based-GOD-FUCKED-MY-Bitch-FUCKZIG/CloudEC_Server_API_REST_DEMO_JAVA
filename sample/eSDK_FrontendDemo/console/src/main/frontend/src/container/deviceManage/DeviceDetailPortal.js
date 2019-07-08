/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { get } from '@/utils/request';
import { message,List,Breadcrumb,Card,Typography,Button   } from 'antd';
import i18n from '@/locales'

/**
 * 设备详情管理界面
 */
class DeviceDetailPortal extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            sn: this.props.location.search.split("=")[1],
            name: "--",
            model: "--",
            number: "--",
            deptNamePath: "--",
            phone: "--",
            email: "--",
            description: "--",
        }
    
        this.queryDeviceDetail(this.state.sn)          
    }

    //查询终端详情
    queryDeviceDetail=(sn)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        }

        get("/rest/usg/datacenter/v1/corp/device/"+sn, headers).then((res)=>
        { 
            if(!this.failTip(res)){
                return;
            }
            const device = JSON.parse(res.data.entity).data
            const deptNamePath = device.deptNamePath
            const deptNameePathSplit = deptNamePath.split("#")
            var deptNames = deptNameePathSplit[deptNameePathSplit.length-1]
            for(var i = deptNameePathSplit.length-1; i>0; i--){
                deptNames += "【"+deptNameePathSplit[i-1]+"】"
            }
            this.setState({
                name: device.name,
                model: device.model,
                sn: device.sn,
                number: device.number,
                deptNamePath: deptNames,
                phone: device.phone===null?"--":device.phone,
                email: device.email===null?"--":device.email,
                description: device.description,
                deptCode:device.deptCode
            })

        })   
    }
    //点击编辑跳转修改页面
    modifyDevice=()=>{
        const {match,history} = this.props;
        const path = `${match.path}`.split("/detail")[0]
        history.push(path + '/modify/'+this.state.sn+`?deptCode=`+this.state.deptCode)
    }
    //返回上一级路由
    goback=()=>{
        this.props.history.go(-1)
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
        const data = [
            <div>
                <div style={{float:"left"}}>名称</div><div style={{marginLeft:120}}>{this.state.name}</div>                            
            </div>,
            <div>
               <div style={{float:"left"}}>设备型号</div><div style={{marginLeft:120}}>{this.state.model}</div>                     
            </div>,
            <div>
                <div style={{float:"left"}}>SN码</div><div style={{marginLeft:120}}>{this.state.sn}</div>                            
            </div>,
            <div>
                <div style={{float:"left"}}>号码</div><div style={{marginLeft:120}}>{this.state.number}</div>                            
            </div>,
            <div>
                <div style={{float:"left"}}>部门</div><div style={{marginLeft:120}}>{this.state.deptNamePath}</div>                            
            </div>,
            <div>
                <div style={{float:"left"}}> 手机</div><div style={{marginLeft:120}}>{this.state.phone}</div>                            
            </div>,
            <div>
                <div style={{float:"left"}}>邮箱</div><div style={{marginLeft:120}}>{this.state.email}</div>                            
            </div>,
            <div>
                <div style={{float:"left"}}>备注</div><div style={{marginLeft:120}}>{this.state.description}</div>                             
            </div>,
            <div>
                <Button type="primary" style={{ marginLeft: 100 }} onClick={this.modifyDevice}>编辑</Button>
                <Button style={{ marginLeft: 24 }} onClick={this.goback}>返回</Button>
            </div>
          ];
        return( 
            <div style={{ background: '#ECECEC', padding: '30px',width:'100%',height:'100%'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>企业</Breadcrumb.Item>
                    <Breadcrumb.Item>终端管理</Breadcrumb.Item>
                    <Breadcrumb.Item>硬件终端详情</Breadcrumb.Item>
                </Breadcrumb>
                <h3 style={{ marginBottom: 16 }}>硬件终端详情</h3>
                <Card>                   
                    <List
                        split={false}
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                        <Typography.Text mark></Typography.Text> {item}
                        </List.Item>
                    )}
                        />
                </Card>
            </div>                      
        )
    }
}

export default DeviceDetailPortal;