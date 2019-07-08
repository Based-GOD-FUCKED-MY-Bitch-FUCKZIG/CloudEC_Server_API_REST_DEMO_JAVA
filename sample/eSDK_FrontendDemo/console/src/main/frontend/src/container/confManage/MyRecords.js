/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { message, Table, Card, Icon, Modal, Button, DatePicker, Input} from 'antd'
import { get, del } from '@/utils/request'
//import copy from 'copy-to-clipboard';
// import Highlighter from 'react-highlight-words';
import moment from 'moment';
import i18n from '@/locales';

const confirm = Modal.confirm;
const dateFormat = 'YYYY-MM-DD';

class MyRecords extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            searchText: '',
            startValue: new Date().getTime() - 30*24*60*60*1000,
            endValue: new Date().getTime(),
            selectedRowKeys: [], // Check here to configure the default column
        }

        let params = {
            pageIndex: "1",
            pageSize: "5",
            startDate: new Date().getTime() - 30*24*60*60*1000 + '',
            endDate: new Date().getTime() + '',
        }
        
        this.queryRecords(params);
    }

    //公共查询方法，查询录制文件列表
    queryRecords = (params1) =>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')}
    
        get("/conferences/recordfile", headers,params1).then((response)=>
        {    
            if(!response.success) {
                message.error(response.msg);
                return;
            }

            let resbody = JSON.parse(response.data.entity);
            console.info("查询录制文件列表返回结果:",JSON.stringify(resbody));
    
            if(resbody.returnCode !== 0){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }
    
            this.setState({
                recordsInfo: resbody.data.data,
                totalCount: resbody.data.totalCount,
                pageIndex: resbody.data.pageIndex,
                selectedRowKeys: [],
            });
        })
    }

    //复制操作
    handleOk = e => {

        //需引入copy-to-clipboard
        // copy(this.state.recordUrl);
        //message.success("复制成功！")
        this.setState({
          visible: false,
        });
    };
    
    handleCancel = e => {
        
        this.setState({
            visible: false,
        });
    };

    //删除单个录制文件
    delRecord = () =>{
        console.log("删除单个录制文件confuuid:"+this.state.recordConfUid);
        const recordConfUid = this.state.recordConfUid;
        const queryRecords = (params3) => this.queryRecords(params3);
        confirm({
            title: '确定要删除录制文件吗?',
            content: '点击确定按钮，录制文件将被删除',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('access_token')}

                del("/conferences/"+recordConfUid+"/recordfile",headers).then((response)=>{
                    if(!response.success) {
                        message.error(response.msg);
                        return;
                    }

                    let resbody = JSON.parse(response.data.entity);
                    console.info("删除单个录制文件返回结果:",JSON.stringify(resbody));

                    if(resbody.returnCode !== 0){
                        message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                        return;
                    }

                    let params = {
                        pageIndex: "1",
                        pageSize: "5",
                        startDate: new Date().getTime() - 30*24*60*60*1000 + '',
                        endDate: new Date().getTime() + '',
                    }

                    queryRecords(params);

                    return new Promise((resolve, reject) => {
                        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                        }).catch(() => console.log('Oops errors!'));
                });
            },
            onCancel() {},
          });
    }

    openRecord = () => {
        this.setState({
            visible: true,
        });
    }

    //分页查询录制文件
    paginationChange = (page, pageSize) =>{
        console.log("分页查询录制文件page:"+page+"pagesize:"+pageSize);
        let params = {
            pageIndex: page + "",
            pageSize: "5",
            startDate: new Date().getTime() - 30*24*60*60*1000 + '',
            endDate: new Date().getTime() + '',
        }
        this.queryRecords(params);
    }

    //批量删除录制文件
    showDeleteConfirm = () => {
        const uuids = this.state.selectedRowKeys;
        console.log("批量删除录制文件uuids:",uuids);
        const queryRecords = (params3) => this.queryRecords(params3);
        confirm({
          title: '是否删除这些录制文件?',
          content: '点击确定将删除录制文件',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            let headers = {'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': sessionStorage.getItem('access_token')}

            del("/conferences/recordfile?confUUIDs=" + uuids,headers).then((response)=>{
                if(!response.success) {
                    message.error(response.msg);
                    return;
                }

                let resbody = JSON.parse(response.data.entity);
                console.info("批量删除录制文件返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== 0){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                let params = {
                    pageIndex: "1",
                    pageSize: "5",
                    startDate: new Date().getTime() - 30*24*60*60*1000 + '',
                    endDate: new Date().getTime() + '',
                }

                queryRecords(params);

                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    }).catch(() => console.log('Oops errors!'));
            });
          },
          onCancel() {
            //console.log('Cancel');
          },
        });
    }

    //处理选择开始查询录播文件的日期
    handleStartDateChange= (value) => {
        if(!value){
            return;
        }
        this.onChange('startValue', value);
        var tempTime = new Date(moment(value).format('YYYY-MM-DD 00:00')).getTime();
        //console.log('date changed',tempTime);
        
        var startDate=tempTime + "";
        this.setState({
            startDate: startDate
        })

        var endDate;
        if(this.state.endDate === undefined){
            endDate = new Date().getTime() + '';
        }else{
            endDate = this.state.endDate;
            //console.log("endDate:" + endDate);
        }

        let params = {
            pageIndex: "1",
            pageSize: "5",
            startDate: startDate,
            endDate: endDate,
        }

        this.queryRecords(params);

        return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
    }

    //处理结束查询录播文件的日期
    handleEndDateChange= (value) => {
        if(!value){
            return;
        }
        this.onChange('endValue', value);
        var tempTime = new Date(moment(value).format('YYYY-MM-DD 23:59')).getTime();
        //console.log('date changed', tempTime);
        var endDate = tempTime + "";
        this.setState({
            endDate: endDate,
        })

        var startDate;
        if(this.state.startDate === undefined){
            startDate = new Date().getTime() - 30*24*60*60*1000 + '';
        }else{
            startDate = this.state.startDate;
        }

        let params = {
            pageIndex: "1",
            pageSize: "5",
            startDate: startDate,
            endDate: endDate,
        }

        this.queryRecords(params);

        return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
    }

    //搜索功能
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        //高亮显示模式，需引入react-highlight-words，引入代码已注释
        // render: text => (
        //   <Highlighter
        //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     searchWords={[this.state.searchText]}
        //     autoEscape
        //     textToHighlight={text.toString()}
        //   />
        // ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    //禁用在结束日期及以后日期的开始日期
    disabledStartDate = startValue => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    //禁用结束日期早于开始日期的时刻
    disabledEndDate = endValue => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
    };

    //处理选择的key即录制文件的uuid
    handleSelection = (selectedRowKeys) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`);
        this.setState({
            selectedRowKeys
        });
    }

    handleTimeValue = (value) =>{
        return moment(new Date(value).getTime() + 8*60*60*1000).format("YYYY-MM-DD HH:mm");
    }

    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleSelection
        };
        //是否禁用批量删除按钮，有选中时不删除
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [{
            title: '会议主题',
            dataIndex: 'subject',
            key: 'subject',
          },{
            title: '预订者',
            dataIndex: 'scheduserName',
            key: 'scheduserName',
          },{
            title: '会议ID',
            dataIndex: 'confID',
            key: 'confID',
            ...this.getColumnSearchProps('confID'),
          },{
            title: '录制时间',
            dataIndex: 'startTime',
            key: 'startTime',
            render:(value)=>(this.handleTimeValue(value))
          },{
            title: '时长',
            dataIndex: 'rcdTime',
            key: 'rcdTime',
          },{
            title: '文件大小（M）',
            dataIndex: 'rcdSize',
            key: 'rcdSize',
          },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render:()=>(<div>
                <Icon type="eye" style={{color:'blue'}} onClick={this.openRecord}/> &nbsp;&nbsp;&nbsp;&nbsp;
                <Icon type="delete" style={{color:'blue'}} onClick={this.delRecord}/>
                </div>)
          }];
        
        return(
            <div style={{ background: '#ECECEC', padding: '30px',width:'100%'}}>
                <h3 style={{ marginBottom: 16 }}>我的录制</h3>
                <Card bordered={false} style={{ width: '100%' }}>
                    <Button onClick={this.showDeleteConfirm} size='small' disabled={!hasSelected}>删除</Button>
                    <div style={{width:'40%',float:'right'}}>
                        <DatePicker size='small' defaultValue={moment(new Date().getTime() - 30*24*60*60*1000)} disabledDate={this.disabledStartDate} format={dateFormat} onChange={date => this.handleStartDateChange(date)}/>&nbsp;-&nbsp;
                        <DatePicker size='small' defaultValue={moment(new Date().getTime())} disabledDate={this.disabledEndDate} format={dateFormat} onChange={date => this.handleEndDateChange(date)}/>
                    </div>
                    <br/><br/>
                    <Table rowKey={record => record.confUUID} rowSelection={rowSelection} dataSource={this.state.recordsInfo} columns={columns} 
                        pagination={{ pageSize: 5,total:this.state.totalCount,onChange:this.paginationChange,current:this.state.pageIndex}}
                        onRow={record =>{
                            return {
                               onMouseEnter: event => {
                                   this.setState({
                                       recordConfUid:record.confUUID,
                                       recordUrl:record.url
                                   })
                               }
                            }
                        }}
                    />
                </Card>
                {/* <Modal title="查看录制信息" visible={this.state.visible} cancelText='取消' okText='复制链接' onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>单击“复制”可以复制所有视频的链接地址</p>
                    <div>播放地址 &nbsp;&nbsp;&nbsp;&nbsp; <a href={this.state.recordUrl} target="_blank" rel="noopener noreferrer">单击观看/下载视频</a></div>
                </Modal> */}
                <Modal title="查看录制信息" visible={this.state.visible} cancelText='取消' okText='确定' onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>点击“单击观看/下载视频”可以观看/下载视频</p>
                    <div>播放地址 &nbsp;&nbsp;&nbsp;&nbsp; <a href={this.state.recordUrl} target="_blank" rel="noopener noreferrer">单击观看/下载视频</a></div>
                </Modal>
            </div>
        )
    }
}

export default MyRecords