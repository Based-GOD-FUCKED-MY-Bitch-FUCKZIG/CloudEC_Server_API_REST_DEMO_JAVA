/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { Form, Modal, InputNumber, DatePicker, Button, Input, Radio, TimePicker,message,Table,Select,Checkbox,Tag, Card,Icon} from 'antd';
import moment from 'moment';
import { post,get } from '@/utils/request';
import i18n from '@/locales';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const timeFormat = 'HH:mm';
const dateFormat = 'YYYY-MM-DD';
const disabledDate = (current) => {
    return current < moment().startOf('day');
}

class UserCreateConfPage extends React.Component {
    constructor(){
        super();
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleMinisChange = this.handleMinisChange.bind(this);
        this.state = {
            conferenceType: 0,
            display: 'none',
            visible: false,
            hours: 1,
            minis: 15,
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm'),
            visible2: false,
            defaultCheck: true,
            display2: 'none',
            recordType:"0",
            recordAuxStream: 0,
            isAutoRecord: 0,
            map : {},
            sitesName: [],
            inputVisible: false,
            inputValue: '',
            inputName: '',
        }
        
        let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token')
                };
        
        //查询用户所在部门，并初始化预约会议时的与会者信息
        get("/datacenter/v1/member", headers, null).then(
            (res) => {
                
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);
                console.info("用户查询自己的信息返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                let deptCode = resbody.data.deptCode;
                //console.log("deptCode1:" + deptCode);
                this.setState({
                    deptCode: deptCode,
                    attendUser: resbody.data.name,
                    attendees: '{ "accountId" : "' + resbody.data.userAccount + '","name" : "' + resbody.data.name +'","phone" : "'+ resbody.data.sipNum +'" }'
                });  
        })
        
    }

    //判断是立即会议还是预约会议，预约会议将展示时间选择框
    handleconfTypeChange = (e) => {

        if(e.target.value === 2){
            this.setState({
                display: 'block'
            })
        }
        else{
            this.setState({
                display: 'none'
            })  
        }
    }

    //date选择，默认当前时间
    handleDateChange= (value) => {
        this.setState({
            date:moment(value).format('YYYY-MM-DD')
        })    
    }

    handleTimeChange= (value) => {
        this.setState({
            time:moment(value).format('HH:mm')
        })    
    }

    //记录会议时长的hours
    handleHoursChange(value) {
        this.setState({
            hours:value
        })
    }

    handleMinisChange(value) {
        this.setState({
            minis:value
        })
    }

    //查询企业通信录，获取用户信息
    searchAddressBook = (pageIndex) => {
        let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token')
                };
        //console.log("deptCode:" + this.state.deptCode);

        let searchbody = {
            "pageIndex": pageIndex,
            "pageSize": 5,
            "searchKey": "",
            "deptCode": this.state.deptCode,
            "querySubDept": true,
            "searchScope": 0
        }

        const data = JSON.stringify(searchbody);
        console.info("查询企业通信录Body:",searchbody);

        post("/search/addressBook", {data}, headers).then(
            (res) => {
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);
                console.info("查询企业通信录返回结果:",JSON.stringify(resbody));

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

    //展示企业联系人
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
    
    //处理用户选择的与会者，用当前页表示key,用户选择项作为value,最后遍历map，合并value
    handleOk = (e) => {
        //console.log(e);
        let arr = [];
        let map = this.state.map;
        
        for(var key in map){
            console.log("用户选择的与会者属性：" + key + ",值：" + JSON.stringify(map[key]));
            arr.push.apply(arr,map[key]);
        }

        if(arr !== undefined){
            console.log("用户选择的与会者arr:" + JSON.stringify(arr));
            var userNames = "";
            var attend = [];
            for(var i = 0; i < arr.length; i++){
                userNames += arr[i].name + ";"
                var temp = '{ "accountId" : "' + arr[i].account + '","name" : "' + arr[i].name +'","phone" : "'+ arr[i].number +'" }';
                attend.push(temp);
            }
            
            //console.log("usernames:" + userNames);
            if(userNames === ""){
                userNames = "请点击左侧按钮添加与会人"
            }
            this.setState({
                attendUser: userNames,
                attendees: attend.join(",")
            });
        }

        this.setState({
            visible: false,
        });
    }
    
    handleCancel = (e) => {
        //console.log(e + "attendees:" + this.state.attendees);
        if(this.state.attendees === ""){
            this.setState({
                attendUser: '请点击左侧按钮添加与会人',
                attendees: ""
            });
        }
        
        this.setState({
            visible: false,
        })
    }

    //业务处理，预约会议，预约成功跳转至会议详情页
    handleSubmit = (e) => {
        e.preventDefault();

        const { history,match } = this.props;
  
        this.props.form.validateFields((err, values) => {
            //console.log('values:'+JSON.stringify(values));
            if (!err) {
                let startTime = "";
                if(values.conferenceType === 2){
                    startTime = this.state.date + " " + this.state.time;
                    this.setState({conferenceType: 0});
                }
                let length = this.state.hours*60 + this.state.minis;

                var sitesName = this.state.sitesName;
                let tempSites = [];
                for(var i = 0; i < sitesName.length; i++){
                    tempSites.push(
                        JSON.stringify({
                            name: sitesName[i],
                            phone: sitesName[i],
                            type: "outside",
                            isHardTerminal: false,
                            role: 0,
                            markId: sitesName[i],
                        })
                    );
                }
                let attendees = this.state.attendees;
                tempSites.push(attendees);
                let sites = tempSites.join(",");
            
                let data = '{ "subject" : "' + values.subject + '", "mediaTypes" :"' + values.mediaTypes + '", "conferenceType" :"' + this.state.conferenceType + '", "length" :"' + length +'", "startTime" :"' +startTime + '", "attendees": [' +
                sites + '], "recordType": "' + this.state.recordType + '", "isAutoRecord": "' + this.state.isAutoRecord + '", "recordAuxStream": "' + this.state.recordAuxStream + '"}'

                console.info("预约会议body:",JSON.stringify(data));

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
                        //console.log("confID:" + conferenceID);
                        let pathUrl = `${match.path}`;
                        history.push(pathUrl + "/" +conferenceID);
                  })
            }
        });
    }

    showConfirm = () => {
        this.setState({
          visible2: true,
        });
    }

    //高级参数设置，选择是否录制
    handleModalOk = (e) => {
        if(this.state.recordVideoTemp !== undefined && this.state.recordVideoTemp !== "0"){
            if(this.state.tempCheck !== undefined){
                this.setState({
                    defaultCheck: this.state.tempCheck
                });
                if(this.state.tempCheck){
                    this.setState({
                        isAutoRecord:1
                    })
                }
            }else{
                if(this.state.defaultCheck){
                    this.setState({
                        isAutoRecord:1
                    })
                }
            }

            this.setState({
                recordType: this.state.recordVideoTemp
            });

            if(this.state.recordVideoTemp === "2"){
                this.setState({
                    recordAuxStream:1
                });
            }
        }

        this.setState({
            visible2: false,
        });
    }

    handleModalCancel = (e) => {
        this.setState({
            visible2: false
        });
    }

    //记录选择的录制方式
    handleChange = (value) => {
        //console.log(`selected ${value}`);
        this.setState({
            recordVideoTemp: value
        });
        if(value === "2"){
            this.setState({
                display2: 'block'
            })
        }

        if(value === "0"){
            this.setState({
                display2: 'none'
            })
        }
    }

    handleCheckedChange = (e) => {
        //console.log(`checked = ${e.target.checked}`);
        this.setState({
            tempCheck: e.target.checked
        })
    }

    //处理分页
    paginationChange = (page, pageSize) =>{
        console.log("page:"+page+"pagesize:"+pageSize);
        this.searchAddressBook(page);
    }

    //处理选择
    handleSelections = (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        let currentPageIndex = this.state.pageIndex;

        let map = this.state.map;
        
        if(selectedRows !== undefined){
            map[currentPageIndex] = selectedRows;
        }
    }

    //关闭外部联系人号码输入框
    handleClose = removedTag => {
        const sitesName = this.state.sitesName.filter(tag => tag !== removedTag);
        //console.log(sitesName);
        this.setState({ sitesName });
    };

    forMap = tag => {
        const tagElem = (
          <Tag
            closable
            onClose={e => {
              e.preventDefault();
              this.handleClose(tag);
            }}
          >
            {tag}
          </Tag>
        );
        return (
          <span key={tag} style={{ display: 'inline-block' }}>
            {tagElem}
          </span>
        );
    };

    //显示外部联系人号码输入框
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    //确认input输入框的值并关闭输入框
    handleInputConfirm = () => {
        const { inputValue } = this.state;
        var pattern = /^[0-9]*$/;
        if(!pattern.test(inputValue)){
            message.error("请输入号码,正确号码示例：8657110000");
            return;
        }

        let { sitesName } = this.state;
        if (inputValue && sitesName.indexOf(inputValue) === -1) {
            sitesName = [...sitesName, inputValue];
        }
        //console.log(sitesName);
        this.setState({
            sitesName,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [{
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

          // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: this.handleSelections
        };

        const { sitesName, inputVisible, inputValue, inputName } = this.state;
        const tagChild = sitesName.map(this.forMap);

        return (
            <div className="createConf"  id="div_cssconf">
                <div className="createConf-form">
                <Form onSubmit={this.handleSubmit} style={{width:600, style:"table", marginTop:'50px'}} className="createConf-form">
                    <Form.Item label="会议主题" labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                        {getFieldDecorator('subject', {
                            initialValue:'Creatconf',
                            rules: [{ required: true, message: '请输入会议主题!' }],
                        })(
                            <Input style={{ width:200, fontSize: 14 }}/>
                        )}
                    </Form.Item>

                    <Form.Item label="会议类型" labelCol={{ span: 8}} wrapperCol={{ span: 16}}>
                        {getFieldDecorator('mediaTypes', {
                            initialValue:'Video',
                            rules: [{ required: true}],
                        })(
                            <Radio.Group buttonStyle="solid" style={{display:'inline'}}>
                                <Radio.Button value="Video" >视频会议</Radio.Button>
                                <Radio.Button value="Voice" >语音会议</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>

                    <Form.Item label="会议时间" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        {getFieldDecorator('conferenceType', {
                            initialValue: this.state.conferenceType,
                            rules: [{ required: true}],
                        })(
                            <RadioGroup onChange={this.handleconfTypeChange}>
                                <Radio value={0}>立即会议</Radio>
                                <Radio value={2}>预约会议</Radio>
                            </RadioGroup>
                        )}
                        
                        <div style={{display: this.state.display}}>
                            <div style={{width:'50%',float:'left'}}>
                                <DatePicker defaultValue={moment()} format={dateFormat} disabledDate={disabledDate} onChange={date => this.handleDateChange(date)}/>
                            </div>
                            <div style={{width:'50%',float:'left'}}>
                                <TimePicker defaultValue={moment()} format={timeFormat} onChange={time => this.handleTimeChange(time)}/>
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item label="会议时长" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <InputNumber min={0} max={23} defaultValue={this.state.hours} step={1} formatter={value => Math.round(`${value}`)} onChange={this.handleHoursChange}/>小时
                        <InputNumber min={0} max={45} defaultValue={this.state.minis} step={15} formatter={value => Math.round(`${value}`)} onChange={this.handleMinisChange}/>分钟
                    </Form.Item>

                    <Form.Item label="与会方" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <div>
                            <Input readOnly value={this.state.attendUser} style={{ display:'inline-block',width:'95%',float:'left'}} size="large">
                            </Input>
                            <Button type="primary" onClick={this.showModal} size="small" style={{ width:'5%',float:'left'}}>+</Button>
                            <Modal title="添加与会人" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} maskClosable={false} keyboard={false}>
                                <Table rowKey={record => record.id} rowSelection={rowSelection} dataSource={this.state.usersInfo} columns={columns} size="small" 
                                pagination={{ pageSize: 5,total:this.state.totalCount,onChange:this.paginationChange,current:this.state.pageIndex}} scroll={{ y: 240 }}/>
                            </Modal>
                        </div>
                    </Form.Item>
                    
                    <Form.Item label="其他会场" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Card style={{ width: 400 }}>
                            <div>
                                {tagChild}
                            </div><br/>
                            {inputVisible && (<div>号码：
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 150 }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            </div>
                            )}
                            {!inputVisible && (
                            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                <Icon type="plus" /> 添加外部联系人
                            </Tag>
                            )}
                        </Card>

                        <div>
                            <Button type="primary" ghost={true} onClick={this.showConfirm} style={{marginTop:"25px"}} >高级参数</Button>
                            <Modal title="高级参数" visible={this.state.visible2} onOk={this.handleModalOk} okText='确定' cancelText='取消' onCancel={this.handleModalCancel}
                            maskClosable={false} keyboard={false}>
                                <div id="components-dropdown-demo-dropdown-button" style={{marginLeft: '2%'}}>
                                    录制设置&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Select defaultValue={this.state.recordType} style={{ width: 120 }} onChange={this.handleChange}>
                                        <Option value="0">不启用</Option>
                                        <Option value="2">录制</Option>
                                    </Select>
                                    <div style={{ marginTop: 20,display: this.state.display2}}>
                                        录制选项&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Checkbox defaultChecked={this.state.defaultCheck} onChange={this.handleCheckedChange}>入会后自动开始录制</Checkbox>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </Form.Item>

                    <Form.Item  wrapperCol={{ span: 16 , offset:12}}>
                        <Button type="primary" htmlType="submit">创建</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        );
    }
}

const UserCreateConf = Form.create()(UserCreateConfPage);
  
export default UserCreateConf;  