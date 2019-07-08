/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { get } from '@/utils/request';
import { List,message,Card,Button,Pagination   } from 'antd';
import moment from 'moment';

var myConfs = []

class MyConfs extends React.Component {
    
    constructor(){
        super();
        this.state = {   
            accountID:'',
            pageIndex:'',
            pageSize:'10',
            queryAll:'',
            status:'',
            condition:'',
            queryConfMode:'',
            sortType:''
        }
        const {accountID,pageIndex,pageSize,queryAll,status,condition,queryConfMode,sortType} = this.state
        let params = {
            accountID,pageIndex,pageSize,queryAll,status,condition,queryConfMode,sortType
        }
        this.queryConfs(params)
    }
    //查询会议列表
    queryConfs=(params)=>{
        myConfs=[];
        
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        };

        get("/conferences", headers, params).then(
            (res) => {
                
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);
                console.info("查询会议列表返回结果:",JSON.stringify(resbody));

                this.setState({
                    total:resbody.data.totalCount
                })
                let confs = resbody.data.data
                //console.log(JSON.stringify(confs))
                
                let card;
                let conferenceID;
                let users;
                for(var i = 0; i < confs.length; i++){
                    this.setState({
                        confContrl:'block'
                    })
                    users = '';
                    conferenceID = confs[i].conferenceID
                    if(confs[i].partAttendeeInfo === undefined){
                        users = ''
                    }else{
                        for(var j = 0; j < confs[i].partAttendeeInfo.length; j++){
                            users += confs[i].partAttendeeInfo[j].name + ';'
                        }
                    }
                    if(confs[i].passwordEntry[1]===undefined){
                        this.setState({
                           confContrl:'none' 
                        })
                    }
                    //时间转化格式化
                    const startTime = moment(parseInt(new Date(confs[i].startTime).getTime() + 8*60*60*1000)).format("YYYY-MM-DD HH:mm")
                    const endTime = moment(parseInt(new Date(confs[i].endTime).getTime() + 8*60*60*1000)).format("YYYY-MM-DD HH:mm")
                    card = <Card title={confs[i].subject} bordered={false} style={{ width: '100%' }}>
                        <div style={{width:'100%'}}>
                            <div style={{float:'left',width:'70%',marginTop:'1%'}}>
                                <div>时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {startTime}--{endTime}</div>
                                
                            </div>
                            <div style={{float:'left',width:'70%',marginTop:'1%'}}>
                                <div>会议ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {confs[i].conferenceID}</div>
                            </div>
                            <div style={{float:'left',width:'70%',marginTop:'1%'}}>
                                <div>会议密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                主席（{confs[i].passwordEntry[1]===undefined?"无":confs[i].passwordEntry[0].password})&nbsp;&nbsp;&nbsp;来宾({confs[i].passwordEntry[1]===undefined?confs[i].passwordEntry[0].password:confs[i].passwordEntry[1].password}）</div>
                            </div>
                            <div style={{float:'left',width:'70%',marginTop:'1%'}}>
                                <div>预订人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {confs[i].scheduserName}</div>
                            </div>
                            <div style={{float:'left',width:'70%',marginTop:'1%'}}>
                                <div>与会人({confs[i].partAttendeeInfo === undefined?0:confs[i].partAttendeeInfo.length})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {users}</div>
                            </div>
                        </div>
                        <div style={{float:'left'}}>
                            {/* <div><Button type="primary">加入会议</Button></div> */}
                            <div style={{marginTop:'10px',display:this.state.confContrl}}><Button onClick={this.handClick.bind(this,conferenceID)}>进入会控</Button></div>
                        </div>
                    </Card> 
                    myConfs.push(card)                  
                } 
                this.setState({
                    data: myConfs
                })                  
                            
        })
    }

    handClick(confID){

        //查询会议信息
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'type':0,
        'queryType':0
        };
        get("/conferences/"+confID, headers,{}).then((response)=>
        {  
            
            if(response.success){                
                if(JSON.parse(response.data.entity).returnCode===0){
                    window.open('/#/user/confContrl/'+confID);
                }
                else if(JSON.parse(response.data.entity).returnCode===11070005){
                    message.error('会议不存在('+ JSON.parse(response.data.entity).returnCode +')')
                    let params={"pageIndex":'1',"pageSize":'10',"queryConfMode":"ALL"}
                    this.queryConfs(params)
                }else{
                    message.error('会议错误')
                }          
            }                     
        })        
    }

    onShowSizeChange=(current, pageSize)=>{
        let params={"pageIndex":JSON.stringify(current),"pageSize":JSON.stringify(pageSize),"queryConfMode":"ALL"}
        this.queryConfs(params)
    }
    onChange=(current,pageSize)=>{

        let params={"pageIndex":JSON.stringify(current),"pageSize":JSON.stringify(pageSize),"queryConfMode":"ALL"}
        this.queryConfs(params)
    }

    render(){
        return(
            <div style={{ background: '#ECECEC', padding: '30px',width:'100%'}}>
                <h3 style={{ marginBottom: 16 }}>我的会议</h3>
                <List
                    size="large"                   
                    dataSource={this.state.data}
                    renderItem={item => (<List.Item>{item}</List.Item>)
                    }
                    />
                    <div style={{"float":'right'}}>
                        <Pagination
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange}
                        onChange={this.onChange}
                        defaultCurrent={1}
                        total={this.state.total}/>
                    </div>               
            </div>
        )
    }
}

export default MyConfs;