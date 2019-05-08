/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Button,Input,Tabs, message } from 'antd'
import { post } from '@/utils/request'
import isJson from '@/utils/jsonUtils'
import{ inviteParticipantsBody } from '@/component/custom/CommonConst'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
require ('../../component/ui/codemirror.css')
require ('../../component/ui/jsonColor.css')

const TabPane = Tabs.TabPane;

let URL='/conferences/{conferenceid}/participants';
let Token;
let reqBody = JSON.stringify(inviteParticipantsBody,null,4);
let displayValue = 'none'
let resBody;
let statusCodeAndresbody = '';

let date;
let connection;
let contentType;
let contentLength;
let server;
let proxyId;

export default class InviteParticipants extends React.Component {
     constructor () {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {   
            display: displayValue,
            paramsKey1:statusCodeAndresbody,
            requestBody:reqBody,
            url:URL,
            confToken:Token,
            responseBody:resBody,  
        }
     }
    
    handleOnClick = (e) => {

        var data = reqBody;
        const {url, confToken} = this.state;

        if(!isJson(data)){
            message.info("Json格式错误!");
            return;
        }

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('access_token'),
            'Conference-Authorization': confToken
        }; 

        if(url ==='' || url === undefined){
            message.info("url不能为空!");
            return;
        }
        
        post(url,{data},headers).then((response)=>
        { 
            console.log('response :' + JSON.stringify(response));
            if(response.success) 
            {
                displayValue = 'block';
                statusCodeAndresbody = 'Body [' + response.data.httpCode +']';
                this.setState({
                    display: displayValue,
                    paramsKey1:statusCodeAndresbody
                });    

                //发送消息后改变初始值
                date=response.data.headers['Date'];
                connection=response.data.headers['Connection'];
                contentType=response.data.headers['Content-Type'];
                contentLength=response.data.headers['Content-Length'];
                server=response.data.headers['Server'];
                proxyId=response.data.headers['http_proxy_id'];

                reqBody=data;
                resBody=JSON.stringify(JSON.parse(response.data.entity),null,4);
                
                this.setState(() => ({
                    responseBody:resBody 
                }));
            }
        })
   }

      handleOnChange=(instance)=>{
        reqBody=instance.getValue();
    }
    render() {
        const options={
            styleActiveLine: true,
            lineNumbers: true,                     //显示行号
            lineWrapping: true,                    // 自动换行  
            mode: 'application/json', 
            theme: 'jsonColor',
        }
        return (
            <div style={{marginTop: '50px',marginLeft: '10%',width:'100%'}}>
                <div style={{width:'95%'}}>
                    <div style={{float:'left',width:'10%'}}>
                        <Button type="primary" icon="caret-right" onClick={this.handleOnClick}>Send</Button>
                    </div>
                    <div style={{float:'left',marginLeft: '2%',width:'15%'}}>
                        <Input placeholder="POST" readOnly/>
                    </div>
                    <div style={{float:'left',marginLeft: '20px',width:'60%'}}>
                        <Input addonBefore="URL" defaultValue="" value={this.state.url} onChange={({target:{value}})=>{URL=value; this.setState({url:value})}}/>
                    </div>                                       
                </div> 
                <div style={{clear:'both'}}>
                    <Tabs defaultActiveKey="1">
                      
                        <TabPane tab="Params" key="3" disabled>
                        </TabPane>
                        <TabPane tab="Headers" key="1"> 
                            <div>
                                <ul>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}} readOnly value="application/json"/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Conference-Authorization"/> : <Input style={{width:'60%'}}  value={this.state.confToken} onChange={({target:{value}})=>{Token=value; this.setState({confToken:value})}}/></li></div>
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane tab="Body" key="2">
                                <div>
                                <CodeMirror value={this.state.requestBody} onChange={this.handleOnChange} options={options} />
                                </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{display: this.state.display}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={this.state.paramsKey1} key="1">
                            <div>
                                <CodeMirror  value={this.state.responseBody} options={options}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Headers" key="2"> 
                            <div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Connection"/> : <Input style={{width:'60%'}} readOnly value={connection} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}}  readOnly value={contentType} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Date"/> : <Input style={{width:'60%'}} readOnly value={date}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Server"/> : <Input style={{width:'60%'}}  readOnly value={server} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Length"/> : <Input style={{width:'60%'}} readOnly value={contentLength}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="http_proxy_id"/> : <Input style={{width:'60%'}}  readOnly value={proxyId} /></li></div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
             </div>
        )
    }
}