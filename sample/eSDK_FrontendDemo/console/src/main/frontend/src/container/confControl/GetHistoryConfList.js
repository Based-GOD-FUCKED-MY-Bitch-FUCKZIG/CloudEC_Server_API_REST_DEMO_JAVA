/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Button,Input,Tabs,message } from 'antd'
import { get } from '@/utils/request'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import DateFormat from '@/utils/dateFormatUtils'
require ('@/component/ui/codemirror.css')
require ('@/component/ui/jsonColor.css')

const TabPane = Tabs.TabPane;

var resAreaShow = 'none'
var resBody;
let statusCodeAndresbody = '';
let temp = new Date().getTime()
let endDateVal = temp + '';
let startDateVal = (temp - 100000) + '';
let accountIDVal ='';
let pageIndexVal = '';
let pageSizeVal ='';
let queryAllVal ='';
let conditionVal ='';
let sortTypeVal ='';

let date;
let connection;
let contentType;
let contentLength;
let server;
let proxyId;
//查询历史会议列表API接口调用
export default class GetHistoryConfList extends React.Component {
     constructor () {
         super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.state = {   
            display: resAreaShow,
            paramsKey1:statusCodeAndresbody,
            endDate:endDateVal,
            startDate:startDateVal,
            responseBody:resBody,  
            userUUID:accountIDVal,
            pageIndex: pageIndexVal,
            pageSize: pageSizeVal,
            queryAll: queryAllVal,
            condition: conditionVal,
            sortType: sortTypeVal
        }
     }
    
    handleOnClick = (e) => {
        const {userUUID,pageIndex,pageSize,queryAll,condition,startDate,endDate,sortType} = this.state;
        
        let params = {
            userUUID,pageIndex,pageSize,queryAll,condition,startDate,endDate,sortType
        }
      
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')}
        //查询历史会议列表
        get("/historyConferences", headers,params).then((response)=>
        {    

            if(response.success) {

                resAreaShow = 'block';
                statusCodeAndresbody = 'Body [' + response.data.httpCode +']';
                this.setState({
                    display:resAreaShow,
                    paramsKey1:statusCodeAndresbody
                });

                //获取响应后的结果
                date=response.data.headers['Date'];
                connection=response.data.headers['Connection'];
                contentType=response.data.headers['Content-Type'];
                contentLength=response.data.headers['Content-Length'];
                server=response.data.headers['Server'];
                proxyId=response.data.headers['http_proxy_id'];

                resBody=JSON.stringify(JSON.parse(response.data.entity),null,4);
                
                this.setState(() => ({
                    responseBody:resBody,
                }));
            }else{
                message.error(response.msg);
            }
        })
        
      }
    render() {
        const options={
             styleActiveLine: true,
             lineNumbers: true,                     //显示行号
             lineWrapping: true,                    // 自动换行   
             mode: 'application/json', 
             theme: 'jsonColor',   
        }
        
        let tempToken = sessionStorage.getItem('access_token');
        if(tempToken){
            tempToken = tempToken.split('|')[0];
        }
        return (
            <div style={{marginTop: '50px',marginLeft: '10%',width:'100%'}}>
                <div style={{width:'95%'}}>
                    <div style={{float:'left',width:'10%'}}>
                        <Button type="primary" icon="caret-right" onClick={this.handleOnClick}>Send</Button>
                    </div>
                    <div style={{float:'left',marginLeft: '2%',width:'15%'}}>
                        <Input placeholder="GET" readOnly/>
                    </div>
                    <div style={{float:'left',marginLeft: '20px',width:'60%'}}>
                        <Input addonBefore="URL" defaultValue="/historyConferences" readOnly/>
                    </div>
                </div> 
                <div style={{clear:'both'}}>
                    <Tabs defaultActiveKey="1">
                      
                        <TabPane tab="Params" key="1">
                            <div>
                                <ul>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="userUUID"/> : <Input style={{width:'60%'}} value={this.state.userUUID} onChange={({target:{value}})=>{accountIDVal=value; this.setState({userUUID:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="pageIndex"/> : <Input style={{width:'60%'}} value={this.state.pageIndex} onChange={({target:{value}})=>{pageIndexVal=value; this.setState({pageIndex:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="pageSize"/> : <Input style={{width:'60%'}} value={this.state.pageSize} onChange={({target:{value}})=>{pageSizeVal=value; this.setState({pageSize:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="queryAll"/> : <Input style={{width:'60%'}} value={this.state.queryAll} onChange={({target:{value}})=>{queryAllVal=value; this.setState({queryAll:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="condition"/> : <Input style={{width:'60%'}} value={this.state.condition} onChange={({target:{value}})=>{conditionVal=value; this.setState({condition:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%',color: 'rgba(255,0,0,1)'}} readOnly value="startDate"/> : <Input style={{width:'60%'}} value={this.state.startDate} onChange={({target:{value}})=>{startDateVal=value; this.setState({startDate:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%',color: 'rgba(255,0,0,1)'}} readOnly value="endDate"/> : <Input style={{width:'60%'}} value={this.state.endDate} onChange={({target:{value}})=>{endDateVal=value; this.setState({endDate:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="sortType"/> : <Input style={{width:'60%'}} value={this.state.sortType} onChange={({target:{value}})=>{sortTypeVal=value; this.setState({sortType:value})}}/></li></div>
                                </ul>
                            </div>
                        </TabPane>
                        
                        <TabPane tab="Headers" key="2"> 
                            <div>
                                <ul>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}} readOnly value="application/json"/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Authorization"/> : <Input style={{width:'60%'}} readOnly value={tempToken}/></li></div>
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane tab="Body" key="3" disabled>
                            
                        </TabPane>
                        <TabPane tab="UTC时间戳转换" key="4">                            
                            <DateFormat/>
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{display: this.state.display}}>
                    <Tabs defaultActiveKey="1">
                    <TabPane tab={this.state.paramsKey1} key="1">
                            <div>
                                <CodeMirror value={this.state.responseBody} options={options} />
                            </div>
                        </TabPane>
                        <TabPane tab="Headers" key="2"> 
                            <div>
                                <ul>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Connection"/> : <Input style={{width:'60%'}} readOnly value={connection} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}}  readOnly value={contentType} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Date"/> : <Input style={{width:'60%'}} readOnly value={date}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Server"/> : <Input style={{width:'60%'}}  readOnly value={server} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Length"/> : <Input style={{width:'60%'}} readOnly value={contentLength}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="http_proxy_id"/> : <Input style={{width:'60%'}}  readOnly value={proxyId} /></li></div>
                                </ul>
                            </div>
                        </TabPane>
                        
                    </Tabs>
                </div>
             </div>
        )
    }
}