import React from 'react'
//import ReactDOM from 'react-dom'
import { Button,Input,Tabs,message } from 'antd'
import { put } from '@/utils/request'
import isJson from '@/utils/jsonUtils'
import{ muteBody } from '@/component/custom/CommonConst'
import {UnControlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/mode/javascript/javascript'
require ('../../component/ui/codemirror.css')
require ('../../component/ui/jsonColor.css')

const TabPane = Tabs.TabPane;


function callback(key) {
    //alert(key)
    console.log(key);
}

let URL='/conferences/{conferenceid}/participants/{participantID}/mute';
let Token;
let reqBody = JSON.stringify(muteBody,null,4);
let displayValue = 'none'
let status;
//let resHeards;
let resBody;
let date;
let connection;
let contentType;
let contentLength;
let server;
let proxyId;
export default class Mute extends React.Component {
     constructor () {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {   
            display: displayValue,
            requestBody:reqBody,
            url:URL,
            confToken:Token,
            httpCode:status,
            //responseHeards:resHeards,
            responseBody:resBody,  
        }
     }
    
    handleOnClick = (e) => {

        var data = this.state.requestBody;
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
        
        put(url,{data},headers).then((response)=>
        { 
            //console.log('response :' + JSON.stringify(response));
            if(response.success) 
            {
                displayValue = 'block';
                this.setState({
                    display: displayValue
                });

                //发送消息后改变初始值
                date=response.data.headers['Date'];
                connection=response.data.headers['Connection'];
                contentType=response.data.headers['Content-Type'];
                contentLength=response.data.headers['Content-Length'];
                server=response.data.headers['Server'];
                proxyId=response.data.headers['http_proxy_id'];

                reqBody=data;
                URL=url;
                Token=confToken;

                resBody=JSON.stringify(JSON.parse(response.data.entity),null,4);
                
                this.setState(() => ({
                    // httpCode:status,
                    //responseHeards: resHeards,
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
                        <Button block='true' type="primary" icon="caret-right" onClick={this.handleOnClick}>Send</Button>
                    </div>
                    <div style={{float:'left',marginLeft: '2%',width:'15%'}}>
                        <Input placeholder="PUT" readOnly/>
                    </div>
                    <div style={{float:'left',marginLeft: '20px',width:'60%'}}>
                        <Input addonBefore="URL" defaultValue="" value={this.state.url} onChange={({target:{value}})=>{this.setState({url:value})}}/>
                    </div>
                </div> 
                <div style={{clear:'both'}}>
                    <Tabs defaultActiveKey='2' onChange={callback}>
                      
                        <TabPane tab="Params" key="1" disabled>
                        </TabPane>
                        <TabPane tab="Headers" key="2"> 
                            <div>
                                <ul>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}} readOnly value="application/json"/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Conference-Authorization"/> : <Input style={{width:'60%'}}  value={this.state.confToken} onChange={({target:{value}})=>{this.setState({confToken:value})}}/></li></div>
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane tab="Body" key="3">
                                <div>
                                <CodeMirror value={this.state.requestBody} onChange={this.handleOnChange} options={options} />
                                </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{display: this.state.display}}>
                    <Tabs>
                        <TabPane tab="Body" key="5">
                            <div>
                                <CodeMirror  value={this.state.responseBody} options={options}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Headers" key="4"> 
                            <div>
                            <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Connection"/> : <Input style={{width:'60%'}} readOnly value={connection} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}}  readOnly value={contentType} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Date"/> : <Input style={{width:'60%'}} readOnly value={date}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Server"/> : <Input style={{width:'60%'}}  readOnly value={server} /></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="Content-Length"/> : <Input style={{width:'60%'}} readOnly value={contentLength}/></li></div>
                                <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="http_proxy_id"/> : <Input style={{width:'60%'}}  readOnly value={proxyId} /></li></div>
                            </div>
                        </TabPane>
                        <TabPane tab={status} key="6" disabled> 
                        </TabPane>
                    </Tabs>
                </div>
             </div>
        )
    }
}