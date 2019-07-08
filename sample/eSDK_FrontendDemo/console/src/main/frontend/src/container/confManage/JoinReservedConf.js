/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Form, Radio, message, Input, Button} from 'antd'
import { post } from '@/utils/request'
import i18n from '@/locales';


class JoinReservedConfPage extends React.Component{
    
    //提交预约会议参数，先预约会议，后查询链接入会参数
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            //console.log('values:'+JSON.stringify(values));
            if (!err) {

                let datatemp = {
                    "mediaTypes" : values.mediaTypes,
                    "subject" : values.subject
                }

                let data = JSON.stringify(datatemp);
                console.info("预约会议Body:",data);

                let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token')
                };

                post("/conferences", {data}, headers).then(
                    (res) => {
                        if(!res.success) {
                            message.error(res.msg);
                            return;
                        }

                        let resbody = JSON.parse(res.data.entity);
                        console.info("预约会议返回结果:",JSON.stringify(resbody));

                        if(resbody.returnCode !== 0){
                            message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                            return;
                        }

                        let conferenceID = resbody.data[0].conferenceID;
                        let confPwd = resbody.data[0].passwordEntry[0].password;
                        //console.log("confID:" + conferenceID + ";confpwd:" + confPwd);

                        let body = {
                            "conferenceID": conferenceID,
                            "confPwd": confPwd
                        }
                        console.info("一键入会鉴权Body:",body);
                        post("/joinReservedConf", body, headers).then(
                            (response) => {
                                if(!response.success) {
                                    message.error(response.msg);
                                    return;
                                }

                                const res = JSON.parse(response.data.entity);
                                console.info("一键入会鉴权返回结果:",JSON.stringify(res));

                                if(res.returnCode !== 0){
                                    message.error(res.returnCode +" : "+ i18n.t(res.returnCode));
                                    return;
                                }

                                const siteUrl = res.data.siteUrl;
                                const random = res.data.random;

                                const portalUrl = encodeURI(siteUrl);
                                var sbr = "cloudlink://welinksoftclient/page/link?site_url=" + portalUrl + "&random=" + random;
                                //console.log("linkurl:" + sbr);

                                window.location.href = sbr; 
                            }
                        )
                  })
            }
        });
    }

    
    render(){
        const { getFieldDecorator } = this.props.form;
        return( 
            <div className="joinconf-form">
                <Form onSubmit={this.handleSubmit} style={{width:600,display:'table',marginTop:'50px'}} className="joinconf-form">
                    
                    <Form.Item label="会议主题:" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        {getFieldDecorator('subject', {
                            initialValue:'Joinconf',
                            rules: [{ required: true, message: '请输入会议主题!' }],
                        })(
                            <Input style={{ width:200, fontSize: 13 }}/>
                        )}
                    </Form.Item>

                    <Form.Item label="会议类型:" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        {getFieldDecorator('mediaTypes', {
                            initialValue: 'Video',
                            rules: [{ required: true, message: '请输入会议类型!' }],
                        })(
                            <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="Video">视频会议</Radio.Button>
                                    <Radio.Button value="Voice">语音会议</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    
                    <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                        <Button type="primary" htmlType="submit">点我链接入会</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const JoinReservedConf = Form.create()(JoinReservedConfPage);

export default JoinReservedConf