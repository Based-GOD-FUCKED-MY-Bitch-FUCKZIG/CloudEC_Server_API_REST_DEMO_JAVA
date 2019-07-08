/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { message, Icon} from 'antd'
import { get } from '@/utils/request'
import moment from 'moment'
import i18n from '@/locales';

let pageIndex;
let pageSize;
let condition;

class CreateConfSuccess extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confID: this.props.match.params.confID
        }

        let params = {
            pageIndex,pageSize,condition
        }
        
    
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'type':0,
        'queryType':0}

        //查询会议详情
        get("/conferences/"+this.state.confID, headers,params).then((response)=>
        {    
            if(!response.success) {
                message.error(response.msg);
                return;
            }

            let resbody = JSON.parse(response.data.entity);
            console.info("查询会议详情返回结果:",JSON.stringify(resbody));
            

            if(resbody.returnCode !== 0){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }

            var arr = resbody.data.conferenceData.partAttendeeInfo;
            var userNames = "";
            if(arr !== undefined){
                for(var i = 0; i < arr.length; i++){
                    userNames += arr[i].name + ";"
                }
            }

            let chairpwd = resbody.data.conferenceData.passwordEntry[0].password;
            let generalpwd = resbody.data.conferenceData.passwordEntry[1].password;

            this.setState(
                {
                    subject: resbody.data.conferenceData.subject,
                    mediaTypes: resbody.data.conferenceData.mediaTypes,
                    startTime: moment(parseInt(new Date( resbody.data.conferenceData.startTime).getTime() + 8*60*60*1000)).format("YYYY-MM-DD HH:mm"),
                    chairpwd: chairpwd,
                    generalpwd: generalpwd,
                    scheduserName: resbody.data.conferenceData.scheduserName,
                    attendees: userNames
                }
            );
            
        })
            
    }

    render(){
        return(
            <div style={{marginTop: '50px',marginLeft: '20%',width:'100%'}}>
                <div>
                    <Icon type="check-circle" style={{ float: 'left',fontSize: '32px' }} theme="twoTone" twoToneColor="#52c41a" />
                    <div style={{float: 'left',marginLeft: '2%'}}>
                        <div style={{fontSize: '18px',marginTop: '2%'}}>会议创建成功</div>
                    </div>
                </div>
                <div style={{clear:'both',marginTop: '70px'}}>
                    <div style={{marginTop: '2%'}}>
                        <div>会议主题 &nbsp;&nbsp;&nbsp;&nbsp;{this.state.subject}</div>
                    </div>
                    
                    <div style={{marginTop: '2%'}}>
                        <div>会议类型   &nbsp;&nbsp;&nbsp;&nbsp;{this.state.mediaTypes}</div>
                    </div>

                    <div style={{marginTop: '2%'}}>
                        <div>时间   &nbsp;&nbsp;&nbsp;&nbsp;{this.state.startTime}</div>
                    </div>

                    <div style={{marginTop: '2%'}}>
                        <div>会议ID &nbsp;&nbsp;&nbsp;&nbsp;{this.state.confID}</div>
                    </div>

                    <div style={{marginTop: '2%'}}>
                        <div>会议密码   &nbsp;&nbsp;&nbsp;&nbsp;主席({this.state.chairpwd}) 来宾({this.state.generalpwd})</div>
                    </div>

                    <div style={{marginTop: '2%'}}>
                        <div>预订人 &nbsp;&nbsp;&nbsp;&nbsp;{this.state.scheduserName}</div>
                    </div>

                    <div style={{marginTop: '2%'}}>
                        <div>与会人 &nbsp;&nbsp;&nbsp;&nbsp;{this.state.attendees}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateConfSuccess