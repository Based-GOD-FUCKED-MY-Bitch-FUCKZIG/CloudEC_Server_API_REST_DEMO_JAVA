/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Input, Button, Tabs, message } from 'antd'
import { modCommunicationBody } from '@/component/custom/CommonConst'
import isJson from '@/utils/jsonUtils'
import 'antd/dist/antd.css'
import { put } from '@/utils/request'

import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
require ('@/component/ui/codemirror.css')
require ('@/component/ui/jsonColor.css')

const TabPane = Tabs.TabPane;
let requestBody = JSON.stringify(modCommunicationBody,null,4);

let resultShow = 'none';
let statusCodeDefault = "";
let resultBodyDefault = "";

let date;
let connection;
let contentType;
let contentLength;
let server;
// let proxyId;
//修改手机或邮箱API接口调用
export default class modCommunication extends React.Component {

    constructor(){
        super();
        this.state = {   
            display: resultShow,
            statusCode: statusCodeDefault,
            resultBody: resultBodyDefault
        }
    }

    handleOnChange = (instance) => {
        requestBody = instance.getValue();
    }

    handleOnClick = () => {
        const data = requestBody;
  
        let headers = {'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': sessionStorage.getItem('access_token')
                    };
        
        if(!isJson(requestBody)){
          message.info("Json格式错误!");
          return;
        }
        //修改手机或邮箱
        put("/member/contact", {data}, headers).then(
          (res) => {
  
              if(res.success) {

                  resultShow = 'block';
                  statusCodeDefault = 'Body [' + res.data.httpCode +']';
          
                  this.setState({
                    display: resultShow,
                    statusCode: statusCodeDefault
                  });
  
                  //获取响应后的结果
                  date=res.data.headers['Date'];
                  connection=res.data.headers['Connection'];
                  contentType=res.data.headers['Content-Type'];
                  contentLength=res.data.headers['Content-Length'];
                  server=res.data.headers['Server'];
                //   proxyId=res.data.headers['http_proxy_id'];
  
                  resultBodyDefault = JSON.stringify(JSON.parse(res.data.entity), null, 4);
                  this.setState(
                    {
                      resultBody: resultBodyDefault
                    });  
              }else{
                  message.error(res.msg);
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
                        <Input placeholder="PUT" readOnly/>
                    </div>
                    <div style={{float:'left',marginLeft: '20px',width:'60%'}}>
                        <Input addonBefore="URL" defaultValue="/member/contact" style={{width:'500px'}} readOnly/>
                    </div>
                </div>
                
                <div style={{clear:'both'}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Params" key="3" disabled>
                        </TabPane>
                        <TabPane tab="Headers" key="2"> 
                            <div style={{width:'100%'}}>
                                <ul>
                                    <li>
                                        <Input style={{width:'20%'}} readOnly value="Content-Type"/> : <Input style={{width:'60%'}} readOnly value="application/json"/> 
                                    </li>    
                                    <li><Input style={{width:'20%'}} readOnly value="Authorization"/> : <Input style={{width:'60%'}} readOnly value={tempToken}/></li>
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane tab="Body" key="1">
                            <div style={{height:'auto'}}>
                                <CodeMirror rows={6} value={requestBody} onChange={this.handleOnChange} options={options} >
                                </CodeMirror>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{display: this.state.display}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={this.state.statusCode} key="1">
                            <div>
                                <CodeMirror rows={6} value={this.state.resultBody} options={options}></CodeMirror>
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
                                {/* <div style={{float:'left',height:'40px',width:'100%'}}><li><Input style={{width:'30%'}} readOnly value="http_proxy_id"/> : <Input style={{width:'60%'}}  readOnly value={proxyId} /></li></div> */}
                                </ul>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
    