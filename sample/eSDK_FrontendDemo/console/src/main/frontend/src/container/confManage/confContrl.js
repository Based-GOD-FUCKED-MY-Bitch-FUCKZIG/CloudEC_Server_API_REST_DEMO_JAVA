/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { get,post,put,del } from '@/utils/request';
import { message,Card,Button,Icon,Table,Modal,Form,Menu, Dropdown,Radio,Input,Divider,Select,Tooltip} from 'antd';
import i18n from '@/locales';

let pageIndex;
let pageSize;
let condition;
var attend = [];
var offConfAttend = [];
const Option = Select.Option;
let participants = [];
let onConfNum = [];
/**
 * 会议控制管理页面
 */
class ConfContrl extends React.Component {
    constructor(props){
        let chairpwd = '';
        super(props);
        this.state = {
            confID: this.props.match.params.confID,
            visible: false,
            visibleRename: false,
            lock:'block',
            unlock:'none',
            mute:'none',
            unmute:'block',
            viewMode:"none",
            visible2: false,
            viewModeValue: 1,
            viewTextWindow2: 'none',
            current: 'mail',
            viewIndex: 1,
            map : {},
        }

        //查询企业通讯录
        get("/datacenter/v1/member", 
            {'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('access_token')
            }, 
        null).then(
        (res) => {
        
            if(!res.success) {
                 message.error(res.msg);
                return;
            }

            let resbody = JSON.parse(res.data.entity);
            console.info("查询企业通讯录返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }

            let deptCode = resbody.data.deptCode;

            this.setState({
                deptCode: deptCode,
                attendUser: resbody.data.name,
                attendees: '{ "accountId" : "' + resbody.data.userAccount + '","name" : "' + resbody.data.name +'","phone" : "'+ resbody.data.sipNum +'" }'
            });  
        })

        let headers = {       
        'Authorization': sessionStorage.getItem('access_token'),
        'type':0,
        'queryType':0}

        let params = {
            pageIndex,pageSize,condition
        }

        //查询会议信息
        get("/conferences/"+this.state.confID, headers,params).then((response)=>
        {    
            if(!response.success) {
                message.error(response.msg);
                return;
            }
            let resbody = JSON.parse(response.data.entity);
            console.info("查询会议信息返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== 0){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }

            let mediaTypes = resbody.data.conferenceData.mediaTypes;
            if(mediaTypes.indexOf("Video") !== -1){
                this.setState({
                    viewMode: "block"
                })
            }

            chairpwd = resbody.data.conferenceData.passwordEntry[0].password;                 
             
            //通过会议ID/密码登录会议控制
            get("/conferences/"+this.state.confID+"/token", {'loginType':1,'password':chairpwd,'Authorization':sessionStorage.getItem('access_token')}).then((response)=>
            {
                if(!response.success) {
                message.error(response.msg);
                return;
                }
                let resbody = JSON.parse(response.data.entity);
                console.info("通过会议ID/密码登录会议控制返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== 0){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                //此处处理结果获取会议token
                this.setState({
                    confToken:resbody.data.token,
                    tmpToken:resbody.data.tmpWsToken,
                    wsURL:resbody.data.wsURL
                })

                // 初始化一个 WebSocket 对象
                var ws = new WebSocket(this.state.wsURL+"/conferences/"+this.state.confID+"/websocket/"+this.state.tmpToken);
 
                // 建立 websocket 连接成功触发事件
                ws.onopen = function () {

                    //setInterval 每隔30s执行一次
                    setInterval(function(){
                        //your codes
                        //维持websocket心跳的sequence值填写消息随机序列号
                        var  from={"action":"HeartBeat","sequence":"141705471311272120860"}
                        ws.send(JSON.stringify(from));//发送参数
                    },30000)
                };

                // 当服务端处理完成后会将数据发送回来
                ws.onmessage =(evt)=> {                    
                    attend = []
                    offConfAttend = []
                    var result= evt.data;
                    var data = JSON.parse(result);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                    console.log("维持心跳返回结果action:" + data.action + "; conferenceState:" + data.conferenceState + "; participants:" + data.participants);
                    if(data.action === "NotifyConference" && data.conferenceState === "Destroyed"){
                        alert("会议已经结束")
                        //message.info("会议已经结束")
<<<<<<< HEAD
=======
=======
                    console.log("action:" + data.action +";participants:"+data.participants);
                    if(data.action === "NotifyConference" && data.conferenceState === "Destroyed"){
                        alert("会议已经结束")
                        message.info("会议已经结束")
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                        window.close()
                    }
                    if(data.action === "NotifyConference" && data.conferenceState === "Created"){
                        //alert("websocket上报")
                        var participantstemp = data.participants;
                        participants = [];
                        onConfNum = [];
                        var mediaTypes = data.mediaTypes
                        if(data.lockState === 1){
                            this.setState({
                                lock:"none",
                                unlock:"block"
                            })
                        }else{
                            this.setState({
                                lock:"block",
                                unlock:"none"
                            })
                        }
                        if(data.isAllMute === 1){
                            this.setState({
                                mute:'none',
                                unmute:'block'
                            })
                        }else{
                            this.setState({
                                mute:'block',
                                unmute:'none'
                            })
                        }
                        if(mediaTypes.indexOf('video')>0){
                            this.setState({
                                showBrocast:"block",
                                showRename:"block"
<<<<<<< HEAD
                               
=======
<<<<<<< HEAD
                               
=======
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                            })
                        }else{
                            this.setState({
                                showBrocast:"none",
                                showRename:"none"
                            })
                        }
                        if(participantstemp === undefined ){
                            return;
                        }
<<<<<<< HEAD
                        for(let k=0; k < participantstemp.length; k++){
=======
<<<<<<< HEAD
                        for(let k=0; k < participantstemp.length; k++){
=======
                        for(var k=0; k < participantstemp.length; k++){
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                            //console.log("participantstemp state:" + participantstemp[k].state);
                            if(participantstemp[k].state === 0){
                                participants.push(participantstemp[k]);
                                //获取在会号码,在会ID和其他一些状态
                                var numAndId = {"num":participantstemp[k].subscriberID,"ID":participantstemp[k].participantID,"role":participantstemp[k].role,"isRollcalled":participantstemp[k].isRollcalled,"isBroadcast":participantstemp[k].isBroadcast}
                                //onConfNum.push(participantstemp[k].subscriberID)
                                onConfNum.push(numAndId)
                            }
                        }

                        var onConfPhone = [];
                                                    
                        //提取在会号码组成数组                        
<<<<<<< HEAD
                        for(let m = 0; m < participants.length; m++){
=======
<<<<<<< HEAD
                        for(let m = 0; m < participants.length; m++){
=======
                        for(var m = 0; m < participants .length; m++){
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                            onConfPhone.push(participants[m].subscriberID)
                        }                       
                              
                        //标注flag，如果在会，设flag为true
                        var flag;
                        if(data.attendees!==undefined && data.attendees.length>0){
                            //提取attend是里的号码
<<<<<<< HEAD
                            //var attendPhone = new Array() 
                            var attendPhone = []
                            for(let i=0; i < data.attendees.length; i++){
=======
<<<<<<< HEAD
                            //var attendPhone = new Array() 
                            var attendPhone = []
                            for(let i=0; i < data.attendees.length; i++){
=======
                            var attendPhone = new Array() 
                            for(var i=0; i < data.attendees.length; i++){
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                                attendPhone.push(data.attendees[i].phone)
                                flag = false                                                                                                
                                if(onConfNum.length>0){
                                    for(var j = 0; j < onConfNum.length; j++){
                                        if(data.attendees[i].phone === onConfNum[j].num){
                                            flag = true
                                            break;
                                        }
                                    }                        
                                }

                                if(flag){
                                    var tempAttendess = JSON.stringify(data.attendees[i]).replace('}','')

                                    var tempRole = onConfNum[j].role === 1?'主席 ':"" 
                                    var tempRollcalled = onConfNum[j].isRollcalled === 1?'点名 ':""
                                    var tempIsBroadcast = onConfNum[j].isBroadcast === 1?'广播 ':""
                                    var temp = tempRole + tempRollcalled + tempIsBroadcast

                                    var NewAttendess = tempAttendess + ',"status":  "在会" , "participantID" :"' + onConfNum[j].ID +  '","info" : "' + temp + '"}'                              
                                    attend.push(JSON.parse(NewAttendess))
                                }else{
                                    var tmpAttendess = JSON.stringify(data.attendees[i]).replace('}','')
                                    
                                    var leaveAttendess = tmpAttendess + ',"status":"离会", "participantID":"0"}'
                                    attend.push(JSON.parse(leaveAttendess))
                                    //记录未入会，点击呼入未入会重新邀请
                                    offConfAttend.push(JSON.parse(leaveAttendess))
                                } 
                            }
                            this.setState({
                                attend:attend,
                                offConfAttend:offConfAttend
                            })                            
                        }
						else{
                            this.setState({
                                attend:[],                                
                            })
                        }
                        //循环在会号码，定位出不在attend中的与会者，即外部主动入会的与会者
<<<<<<< HEAD
                        for(let n = 0;n < onConfPhone.length;n++){
=======
<<<<<<< HEAD
                        for(let n = 0;n < onConfPhone.length;n++){
=======
                        for(var n = 0;n < onConfPhone.length;n++){
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                            if(attendPhone.indexOf(onConfPhone[n]) <0){
                                var confRole = participants[n].role === 1?'主席 ':"" 
                                var particRollcalled = participants[n].isRollcalled === 1?'点名 ':""
                                var particIsBroadcast = participants[n].isBroadcast === 1?'广播 ':""
                                var tempPartic = confRole + particRollcalled + particIsBroadcast
                                
                                //外部主动加入的与会者
                                var outAttendess = '{"name":"'+ participants[n].name + '","phone":"' + participants[n].subscriberID + '","status":  "在会" , "participantID" :"' + participants[n].participantID +  '","info" : "' + tempPartic + '"}'

                                this.state.attend.push(JSON.parse(outAttendess))
                            }
                        }
                        this.setState({
                            attend:attend,
                        })
                    }
                                                            
                };
            })
        })          
    }

    showModal = () => {
        let pageIndex = this.state.pageIndex;
        if(pageIndex === undefined){
            pageIndex = 1;
        }
        this.searchAddressBook(pageIndex);

        this.setState({
            visible: true,
        });
    }

    //邀请与会者
    inviteParticipants = (data) =>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization':this.state.confToken
        };
        post('/conferences/'+this.state.confID+'/participants',{data},headers).then((response)=>
        { 
            if(response.success) {
               message.success('邀请与会者成功')
            }
        })
    }
    
    //呼入未入会与会方
    callAllOffConf = () =>{
        var offAttends = this.state.offConfAttend
        var attends = [];
        if(offAttends.length<=0){
            return;
        }
        for(var i = 0; i < offAttends.length; i++){
            var attend = {"accountId":offAttends[i].accountId,"name":offAttends[i].name,"phone":offAttends[i].phone}
            attends.push(attend)
        }
        var attendsBody = {"attendees":attends}
        var data = JSON.stringify(attendsBody)

        this.inviteParticipants(data)
    }


    handleOk = (e) => {
        //attend = [];
        this.setState({
            visible: false
        });

        //此处调用邀请与会者接口，如果没选择与会者返回不调用
        var users = this.state.selectedRows;
        if(users === undefined){
            return;
        }
       
        var arr = [];
        
        let map = this.state.map;
       
        for(var key in map){
            //console.log("属性：" + key + ",值：" + JSON.stringify(map[key]));
            arr.push.apply(arr,map[key]);
        }

        if(arr !== undefined && arr.length > 0){
            //console.log("arr:" + JSON.stringify(arr));
            var attends = [];
            for(var i = 0; i < arr.length; i++){
                var attend = {"accountId":arr[i].account,"name":arr[i].name,"phone":arr[i].number}
                attends.push(attend)
            }

            var attendsBody = {"attendees":attends}
            var data = JSON.stringify(attendsBody)
    
            this.inviteParticipants(data)
        }
        
    }

    handleCancel = (e) => {
        
        this.setState({
            visible: false,
            attendUser: '请点击下方按钮添加与会人',
            attendees: []
        });
    }

    //呼叫
    call = ()=>{
        var status = this.state.status
        if(status === '在会'){
            message.info('已经在会')
            return;
        }
        var attends = [];
        var attend = {"accountId":this.state.accountId,"name":this.state.name,"phone":this.state.phoneNum}
        attends.push(attend)
        var attendsBody = {"attendees":attends}
        var data = JSON.stringify(attendsBody)
        this.inviteParticipants(data)
    }
    //挂断
    down = () =>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization':this.state.confToken
        };
        var url = "/conferences/"+this.state.confID+"/participants/"+this.state.participantID+"/status"
        del(url, headers).then(
            (res) => {
                if(res.success){
                    message.success("挂断与会者")
                }else{
                    message.error(res.msg)
                }
            })
    }

    //锁定/解除锁定会议
    lockConf = (value) => {
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization':this.state.confToken
        };
        var url = '/conferences/'+ this.state.confID +'/lock';
        var data = '{"isLock":'+ value+'}'
        
        put(url, {data}, headers).then(
            (res) => {
                      
                if(res.success) {
                    if(value === "1"){

                        message.success("已锁定会议")
                    }
                    else{

                        message.success("已解除会议")
                    }
                    
                }else{
                    message.error(res.msg)
                }                    
            })
           
    }

    //全场静音/取消静音
    muteConf = (value) =>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization':this.state.confToken
        };
        var url = '/conferences/'+ this.state.confID +'/mute';
        var data = '{"isMute":'+ value+'}'
        
        put(url, {data}, headers).then(
            (res) => {
                      
                if(res.success) {
                    if(value === "1"){

                        message.success("已全场静音")
                    }
                    else{

                        message.success("已解除静音")
                    }
                    
                }else{
                    message.error(res.msg)
                }                    
            })
    }

    //结束会议
    endConf = () =>{
    let headers = {'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': sessionStorage.getItem('access_token'),
    'Conference-Authorization':this.state.confToken
    };
    var url = '/conferences/'+ this.state.confID +'/state';
    var data = '{"operation":"0"}'
    Modal.confirm({
        title: '结束会议',
        content: '确定结束当前会议？',
        onOk() {                
            put(url, {data}, headers).then(
                (res) => {
                            
                    if(res.success) {
                        //关闭窗口
                        window.close();                        
                    }else{
                        message.error(res.msg)
                    }                    
            })
        },
            onCancel() {
                //console.log('Cancel');
            },
        });   
    }
    
    //删除与会者
    delAttend=() =>{

        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization':this.state.confToken
        };
        var url = '/conferences/'+ this.state.confID +'/participants/'+ this.state.phoneNum
        Modal.confirm({
            title: '删除与会者',
            content: '确定删除与会者吗？',
            onOk() {                
                del(url, headers).then(
                    (res) => {
                        if(res.success) {
                            message.success('删除与会方成功')
                        }else{
                            message.error(res.msg)
                        }
                    })
                },
                onCancel() {
                    //console.log('Cancel');
                },
            });           
    }

    //重命名会场事件
    handleEdit=()=>{
        this.setState({
            visibleRename: true
        });
    }
    
    handleOkRename = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            //校验通过
            if (err == null) {
                this.setState({
                    visibleRename: false,
                });
                //重命名会场
                let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token'),
                'Conference-Authorization':this.state.confToken
                };
                var url = '/conferences/'+ this.state.confID +'/participants/rename'
                var renameBody;
                if(this.state.participantID!==0){
                    renameBody = {"number":this.state.phoneNum,"newName":values.newName,"participantID":this.state.participantID}
                }else{
                    renameBody = {"number":this.state.phoneNum,"newName":values.newName}
                }
                
                var data = JSON.stringify(renameBody)
                put(url,{data},headers).then((response)=>{
                    if(response.success) {
                        message.success('重命名会场成功')
                    }else{
                        message.error(response.msg)
                    }
                })
            }
        });
    }

    //广播
    broadcast = (e)=>{
        var status = this.state.status
        if(status === '离会'){
            message.warn('请先入会')
            return;
        }
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization': this.state.confToken
        };
        put('/conferences/'+this.state.confID+'/participants/'+this.state.participantID+'/broadcast',null,headers).then((response)=>
        {
            if(response.success) {
                message.success('广播成功')
            }
        })

    }
    //点名
    isRollcalled=()=>{
        var status = this.state.status
        if(status === '离会'){
            message.warn('请先入会')
            return;
        }
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('access_token'),
            'Conference-Authorization': this.state.confToken
        }; 
        put('/conferences/'+this.state.confID+'/participants/'+this.state.participantID+'/isRollcalled', null, headers).then((response)=>
        { 
            if(response.success) 
            {
                message.success('点名成功')
            }
        })
    }

    //申请释放主席
    applyChair = (value) =>{
        var status = this.state.status
        if(status === '离会'){
            message.warn('请先入会')
            return;
        }
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization':this.state.confToken
        };
        var url = "/conferences/"+ this.state.confID +"/participants/"+this.state.participantID+"/role"
        var data = '{"applyChair":'+ value+'}'
        
        put(url, {data}, headers).then(
            (res) => {
                if(res.success) {
                    if(value === 1){                        
                        message.success("申请主席成功")
                    }
                    else{                        
                        message.success("释放主席成功")
                    }
                    
                }else{
                    message.error(res.msg)
                }      
            })  
    }

    handleCancelRename = (e) =>{
        this.setState({
            visibleRename: false
        });
    }

    onhandleVideoTypeClick = ({ key }) => {
        //console.info(`Click on item ${key}`);
        if(key === "1"){
            this.setState({
                visible2:true
            })
        }
    };

    handleVideoShowOk = (e) => {
        
        let data;

        if(this.state.viewModeValue === 1){
            data = JSON.stringify({"manualSet":0});
        }

        if(this.state.viewModeValue === 2){
            var arr = this.state.selectedRows2;
            if(arr === undefined || arr.length === 0){
                message.info("至少选择一个会场");
                return;
            }

            var subscriberInPics = [];
            var subscriber = [];
            
            for(var i=0; i < this.state.viewIndex; i++){
                var temppic;
                if(this.state.selectedRows2[i] !== undefined){
                    temppic = {
                        "index": i+1,
                        "subscriber":[this.state.selectedRows2[i].participantID]
                    }
                }else{
                    temppic = {
                        "index": i+1,
                        "subscriber":[]
                    }
                }
                

                if(i === 0){
                    subscriber.push(this.state.selectedRows2[i].participantID)
                }else{
                    subscriberInPics.push(temppic);
                }
            }

            if(arr.length > this.state.viewIndex){
                var temp = arr.length - this.state.viewIndex;
                for(var j=0; j<temp; j++){
                    subscriber.push(this.state.selectedRows2[this.state.viewIndex+j].participantID) 
                }
            }

            var subpic = {
                "index": 1,
                "subscriber": subscriber
            }

            subscriberInPics.push(subpic);
            var imageType;
            if(this.state.viewIndex === 1){
                imageType = "Single"
            }

            if(this.state.viewIndex === 2){
                imageType = "Two"
            }

            if(this.state.viewIndex === 3){
                imageType = "Three"
            }

            if(this.state.viewIndex === 4){
                imageType = "Four"
            }

            if(this.state.viewIndex === 6){
                imageType = "Six"
            }

            if(this.state.viewIndex === 9){
                imageType = "Nine"
            }

            if(this.state.viewIndex === 16){
                imageType = "Sixteen"
            }

            var body = {
                "manualSet":1,
                "imageType": imageType,
                "subscriberInPics": subscriberInPics,
                "switchTime": 20
            }

            data = JSON.stringify(body);
            
        }
        
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token'),
        'Conference-Authorization': this.state.confToken
        };
        
        console.info("设置多画面Body:",data);
        //设置多画面
        put("/conferences/"+this.state.confID+"/setMultiPicture", {data}, headers).then(
            (res) => {
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);
                console.info("设置多画面返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== 0){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                if(resbody.returnCode === 0){
                    message.success("设置多画面成功!");
                    this.setState({
                        visible2: false,
                    });
                }
          })
    }

    handleVideoShowCancel = (e) => {
        
        this.setState({
            visible2: false,
        });
    }

    onViewModeChange = (e) => {
        
        this.setState({
            viewModeValue: e.target.value,
        });

        if(e.target.value === 1){
          this.setState({
            viewTextWindow: 'block',
            viewTextWindow2: 'none'
            });  
        }

        if(e.target.value === 2){
          this.setState({
            viewTextWindow: 'none',
            viewTextWindow2: 'block'
            });  
        }
    };

    handleClick = e => {
        
        this.setState({
        current: e.key,
        });
    };

    handleViewModeChange = (value)  => {
        
        this.setState({
            viewIndex: value
        });
    }

    paginationChange = (page, pageSize) =>{
        //console.log("page:"+page+"pagesize:"+pageSize);
        this.searchAddressBook(page);
    }

    //查询企业通讯录
    searchAddressBook = (pageIndex) => {
        let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token')
                };
        

        let searchbody = {
            "pageIndex": pageIndex,
            "pageSize": 5,
            "searchKey": "",
            "deptCode": this.state.deptCode,
            "querySubDept": true,
            "searchScope": 0
        }

        const data = JSON.stringify(searchbody);
        console.info("查询企业通讯录Body:",data);

        post("/search/addressBook", {data}, headers).then(
            (res) => {
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);

                console.info("查询企业通讯录返回结果:",JSON.stringify(resbody));
              

                if(resbody.returnCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                this.setState({
                    usersInfo: resbody.data.data,
                    totalCount: resbody.data.totalCount,
                    pageIndex: resbody.data.pageIndex,
                });
                //console.log("usersInfo:" + this.state.usersInfo);
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 12 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        
        const columns1 = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },{
            title: '部门',
            dataIndex: 'deptName',
            key: 'deptName',
          },{
            title: '手机号',
            dataIndex: 'number',
            key: 'number',
          }];

        const columns2 = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },{
            title: '与会者ID',
            dataIndex: 'participantID',
            key: 'participantID',
          }];

        const columns = [{
            title: '名称',
            dataIndex: 'name',
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            key: 'name',
          }, {
            title: '会中状态',
            dataIndex: 'status',
            key: 'status',
          }, {
            title: '类型',
            dataIndex: 'style',
            key:'style',
          },{
            title: '信息',
            dataIndex: 'info',
            key: 'info',
          },{
            title: '操作',
            dataIndex: 'operator',
            key: 'operate',
            render:(text,record)=>(<div>
                <div style={{float:'left',display:this.state.status==="在会"?"none":"block"}}>
                    <Tooltip placement="bottom" title='呼叫'>
                        <Icon type="phone" style={{color:'#4876FF',fontSize:20}} onClick={this.call}/>
                    </Tooltip>
                </div>
                <div style={{float:'left',display:this.state.status==="在会"?"block":"none"}} >
                    <Tooltip placement="bottom" title='挂断'>
                        <Icon type="phone" style={{color:'#4876FF',fontSize:20}} onClick={this.down}/>
                    </Tooltip>
                </div>
                <div style={{float:'left',marginLeft:'5px'}}>
                    <Tooltip placement="bottom" title='重命名'>
                        <Icon type="edit" style={{color:'#4876FF',fontSize:20}} onClick={this.handleEdit}/>
                    </Tooltip>
                </div>
                <div style={{float:'left',marginLeft:'5px'}}>
                    <Tooltip placement="bottom" title='删除'>
                        <Icon type="delete" style={{color:'#4876FF',fontSize:20}} onClick={this.delAttend}/>
                    </Tooltip>
                </div>
                <div style={{display:record.status==="在会"?"block":"none",float:'left',marginLeft:'10px'}}>
                    <Dropdown overlay={menu1} style={{disabled:'true'}}>
                        <Icon type="ordered-list" style={{color:'#4876FF',fontSize:20}}/>
                    </Dropdown>
                </div>
<<<<<<< HEAD
=======
=======
          }, {
            title: '会中状态',
            dataIndex: 'status',
          }, {
            title: '类型',
            dataIndex: 'style',
            
          },{
            title: '信息',
            dataIndex: 'info',
            
          },{
            title: '操作',
            dataIndex: 'operator',
            render:()=>(<div>
            <div style={{float:'left',display:this.state.status==="在会"?"none":"block"}}>
                <Tooltip placement="bottom" title='呼叫'>
                    <Icon type="phone" style={{color:'#4876FF',fontSize:20}} onClick={this.call}/>
                </Tooltip>
            </div>
            <div style={{float:'left',display:this.state.status==="在会"?"block":"none"}} >
                <Tooltip placement="bottom" title='挂断'>
                    <Icon type="phone" style={{color:'#4876FF',fontSize:20}} onClick={this.down}/>
                </Tooltip>
            </div>
            <div style={{float:'left',marginLeft:'5px'}}>
                <Tooltip placement="bottom" title='重命名'>
                    <Icon type="edit" style={{color:'#4876FF',fontSize:20}} onClick={this.handleEdit}/>
                </Tooltip>
            </div>
            <div style={{float:'left',marginLeft:'5px'}}>
                <Tooltip placement="bottom" title='删除'>
                    <Icon type="delete" style={{color:'#4876FF',fontSize:20}} onClick={this.delAttend}/>
                </Tooltip>
            </div>
            <div style={{display:'block',float:'left',marginLeft:'10px'}}>
                <Dropdown overlay={menu1} style={{disabled:'true'}}>
                    <Icon type="ordered-list" style={{color:'#4876FF',fontSize:20}}/>
                </Dropdown>
            </div>
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            </div>
            )
          }];
          
          // rowSelection object indicates the need for row selection
          const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                let map = this.state.map;
                let currentPageIndex = this.state.pageIndex;
                if(selectedRows !== undefined){
                    map[currentPageIndex] = selectedRows;
                }
                this.setState({
                    selectedRows: selectedRows
                });
                },
          };

          // rowSelection object indicates the need for row selection
          const rowSelection2 = {
            onChange: (selectedRowKeys, selectedRows) => {
              //console.log(`selectedRowKeys2: ${selectedRowKeys}`, 'selectedRows2: ', selectedRows);
             //alert({selectedRowKeys})
              this.setState({
                selectedRows2: selectedRows
            });
            },
          };

        const menu = (
            <Menu onClick={this.onhandleVideoTypeClick}>
                <Menu.Item key="1">多画面设置</Menu.Item>
                {/* <Menu.Item key="2">广播多画面</Menu.Item>
                <Menu.Item key="3">声控多画面</Menu.Item>
                <Menu.Item key="4">主席观看多画面</Menu.Item> */}
            </Menu>)
          const menu1 = (
            <Menu>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                <Menu.Item style={{display:this.state.applyRole}}>
                    <div onClick={this.applyChair.bind(this,1)}>               
                        设为主席                
                    </div>
                </Menu.Item>
                <Menu.Item style={{display:this.state.releaseRole}}>
                    <div onClick={this.applyChair.bind(this,0)}>              
                        释放主席                
                    </div>
                </Menu.Item>
                <Menu.Item style={{display:this.state.showBrocast}}>
                    <div onClick={this.broadcast}>                  
                        广播                   
                    </div>
                </Menu.Item>
                <Menu.Item style={{display:this.state.showRename}}>
                    <div  onClick={this.isRollcalled}>           
                        点名                  
                    </div>
                </Menu.Item>          
<<<<<<< HEAD
=======
=======
             
            <Menu.Item>
                <div style={{display:this.state.showBrocast}} onClick={this.broadcast}>                  
                    广播                   
                </div>
            </Menu.Item>
            <Menu.Item>
               <div style={{display:this.state.showRename}} onClick={this.isRollcalled}>                   
                    点名                  
               </div>
            </Menu.Item>             
            <Menu.Item style={{display:this.state.applyRole}}>
            <div onClick={this.applyChair.bind(this,1)}>               
                设为主席                
            </div>
            </Menu.Item>
            <Menu.Item style={{display:this.state.releaseRole}}>
            <div onClick={this.applyChair.bind(this,0)}>              
                释放主席                
            </div>
            </Menu.Item>
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            </Menu>
        );

        return(           
            <div>
                <div></div>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Card title="会议控制" bordered={false} style={{ width: '100%' }}>
                        <div style={{float:'left',marginLeft:'5%'}} align='center'>
                            <Icon type="user-add" style={{color:'blue',fontSize:30}} onClick={this.showModal}/><br/>添加与会者
                        </div>
                        <Modal title="添加与会人" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} maskClosable={false} keyboard={false}>
                            <Table rowKey={record => record.id} rowSelection={rowSelection} dataSource={this.state.usersInfo} columns={columns1} size="small" 
                                pagination={{ pageSize: 5,total:this.state.totalCount,onChange:this.paginationChange,current:this.state.pageIndex }} scroll={{ y: 240 }}/>
                        </Modal>
                        <div style={{float:'left',marginLeft:'5%'}} align='center'>
                            <Icon type="phone" style={{color:'blue',fontSize:30}} onClick={this.callAllOffConf}/><br/>呼入未入会与会方
                        </div>
                        <div style={{float:'left',marginLeft:'5%',display:this.state.lock}} align='center'>
                            <Icon type="lock" style={{color:'blue',fontSize:30}} onClick={this.lockConf.bind(this,"1")}/><br/>锁定会议
                        </div> 
                        <div style={{float:'left',marginLeft:'5%',display:this.state.unlock}} align='center'>
                            <Icon type="unlock" style={{color:'blue',fontSize:30}} onClick={this.lockConf.bind(this,"0")}/><br/>解锁会议
                        </div>
                        <div style={{float:'left',marginLeft:'5%',display:this.state.mute}} align='center'>
                            <Icon type="audio" style={{color:'blue',fontSize:30}} onClick={this.muteConf.bind(this,"1")}/><br/>全场静音
                        </div> 
                        <div style={{float:'left',marginLeft:'5%',display:this.state.unmute}} align='center'>
                            <Icon type="audio-fill" style={{color:'blue',fontSize:30}} onClick={this.muteConf.bind(this,"0")}/><br/>取消全场静音
                        </div> 
                        <div style={{float:'left',marginLeft:'5%',display:this.state.viewMode}} align='center'>  
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                                <Icon type="appstore" style={{color:'blue',fontSize:30}}/>
                                {/* <Icon type="down" /> */}
                            </Dropdown>
                            <br/>多画面设置
                            <Modal width={700} okText="确认" cancelText="取消" style={{ top: 20 }} title="设置多画面" visible={this.state.visible2} onOk={this.handleVideoShowOk} onCancel={this.handleVideoShowCancel}
                            maskClosable={false} keyboard={false}>
                                <Radio.Group onChange={this.onViewModeChange} value={this.state.viewModeValue}>
                                    <Radio value={1}>系统自动多画面</Radio>
                                    <Radio value={2}>手动设置多画面</Radio>
                                </Radio.Group>
                                <Divider/>
                                <div style={{display:this.state.viewTextWindow}}>
                                    <Input.TextArea rows={10} readOnly defaultValue="系统自动多画面：系统根据与会方发言和入会顺序自动推送的多画面设置。广播、声控和主席观看均为系统自动多画面"/>
                                </div>

                                <div style={{display:this.state.viewTextWindow2}}>
                                    <div> 
                                        视频源
<<<<<<< HEAD
                                        {/* <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"> */}
                                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}>
=======
<<<<<<< HEAD
                                        {/* <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"> */}
                                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}>
=======
                                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                                            <Menu.Item key="mail">
                                                与会方
                                            </Menu.Item>
                                            {/* <Menu.Item key="app">
                                                会议共享
                                            </Menu.Item> */}
                                            <Table rowKey={record => record.id} rowSelection={rowSelection2} dataSource={participants} columns={columns2} size="small" pagination={{ pageSize: 5 }} scroll={{ y: 240 }}/>
                                        </Menu>
                                    </div>
                                    <Divider style={{float:'left'}}/>
                                    <div>
                                        设置视频源 &nbsp;&nbsp;
                                        <Select defaultValue={this.state.viewIndex} style={{ width: 120 }} onChange={this.handleViewModeChange}>
                                            <Option value={1}>单画面</Option>
                                            <Option value={2}>二画面</Option>
                                            <Option value={3}>三画面</Option>
                                            <Option value={4}>四画面</Option>
                                            <Option value={6}>六画面</Option>
                                            <Option value={9}>九画面</Option>
                                            <Option value={16}>十六画面</Option>
                                        </Select>
                                    </div>   
                                </div>
                            </Modal>
                        </div> 
                        <div style={{"float":'right'}}>                            
                            <Button type="danger" onClick={this.endConf} >结束会议</Button>
                        </div>
                        <Modal title="重命名会场" visible={this.state.visibleRename} onOk={this.handleOkRename} onCancel={this.handleCancelRename}
                        maskClosable={false} keyboard={false}> 
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Form.Item
                                label="原名称"
                            >                                                                      
                            {getFieldDecorator('oldName', {
                                rules: [{ required: false, message: '' }],
                            })(
                                <Input disabled placeholder={this.state.name}/>
                            )}
                            </Form.Item>
                            <Form.Item label="新名称">
                            {getFieldDecorator('newName', {                                
                                rules: [{ required: true, message: '新名称必须为1~64字符' }],
                            })(
                                <Input placeholder="1-64字符" />
                            )}
                            </Form.Item>
                        </Form>
                        </Modal>                                            
                    </Card>
              </div>
              
              <div >
                    <div style={{float:'left',marginLeft:'5%'}}>与会者列表</div>
                    <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={this.state.attend} 
                     onRow={record =>{
                         return {
                            onMouseEnter: event => {
                                this.setState({
                                    phoneNum:record.phone,
                                    name:record.name,
                                    status:record.status,
                                    participantID:record.participantID,
                                    accountId:record.accountId
                                })
                                if(record.info===undefined || record.status==="离会"){
                                    this.setState({
                                        applyRole:"none",
                                        releaseRole:"none"
                                    })
                                }else if(record.info.indexOf("主席")>=0){
                                   
                                    this.setState({
                                        applyRole:"none",
                                        releaseRole:"block"
                                    })
                                    
                                }else{
                                    return this.setState({
                                        applyRole:"block",
                                        releaseRole:"none"
                                    })
                                }
                            },
                         }
                     }}                                                   
                />
                    
              </div>
                
            </div>
        )
    }
}
const ConfContrlPage = Form.create()(ConfContrl);
export default ConfContrlPage;