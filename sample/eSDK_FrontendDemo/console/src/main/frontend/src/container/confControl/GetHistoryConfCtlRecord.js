/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Button,Input,Tabs,message } from 'antd'
import { get } from '@/utils/request'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
require ('@/component/ui/codemirror.css')
require ('@/component/ui/jsonColor.css')

const TabPane = Tabs.TabPane;

var URL ="/historyConferences/{confuuid}/hisConfCtlRecord";
var resAreaShow = 'none';
var resBody;
var pageIndexCopy;
var pageSizeCopy;
var languageCopy = 'zh-CN';
let statusCodeAndresbody = '';

let date;
let connection;
let contentType;
let contentLength;
let server;
let proxyId;
//查询历史会议的会控记录信息API接口调用
export default class GetHistoryConfCtlRecord extends React.Component {
     constructor () {
         super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.state = {   
            display: resAreaShow,
            paramsKey1:statusCodeAndresbody,
            responseBody:resBody, 
            url:URL,
            pageIndex:pageIndexCopy,
            pageSize:pageSizeCopy,
            language:languageCopy
        }
     }
    
    handleOnClick = (e) => {
        const {pageIndex,pageSize,language} = this.state;
        
        let params = {
            pageIndex,pageSize,language
        }
        const {url} = this.state;
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'language':language}

        if(url ==='' || url === undefined){
            message.info("url不能为空!");
            return;
        }
        //查询历史会议的会控记录信息
        get(url, headers,params).then((response)=>
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
                    responseBody:JSON.stringify(JSON.parse(response.data.entity),null,4),
                }));
            }else{
                message.error(response.msg);
            }
        })
        
       
        resAreaShow = 'block';
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
                        <Input addonBefore="URL" value={this.state.url} onChange={({target:{value}})=>{URL=value; this.setState({url:value})}} />
                    </div>
                </div> 
                <div style={{clear:'both'}}>
                    <Tabs defaultActiveKey='1'>
                      
                        <TabPane tab="Params" key="1">
                            <div>
                                <ul>                             
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="pageIndex"/> : <Input style={{width:'60%'}} value={this.state.pageIndex} onChange={({target:{value}})=>{pageIndexCopy=value; this.setState({pageIndex:value})}}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="pageSize"/> : <Input style={{width:'60%'}} value={this.state.pageSize} onChange={({target:{value}})=>{pageSizeCopy=value; this.setState({pageSize:value})}}/></li></div>
                                </ul>
                            </div>
                        </TabPane>
                        
                        <TabPane tab="Headers" key="2"> 
                            <div>
                                <ul>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}} readOnly value="application/json"/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Authorization"/> : <Input style={{width:'60%'}} readOnly value={tempToken}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="language"/> : <Input style={{width:'60%'}} value={this.state.language} onChange={({target:{value}})=>{languageCopy=value; this.setState({language:value})}}/></li></div>
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane tab="Body" key="3" disabled>
                            
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{display: this.state.display}}>
                    <Tabs defaultActiveKey="1">
                    <TabPane tab={this.state.paramsKey1} key="1">
                            <div>
                                <CodeMirror value={this.state.responseBody} onChange={()=>{}} options={options} />
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
