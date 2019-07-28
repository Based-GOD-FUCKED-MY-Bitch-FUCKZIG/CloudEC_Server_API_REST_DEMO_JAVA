/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { message,Layout,Input,Button,Modal,Breadcrumb,Icon,Table,Dropdown,Menu,Tooltip} from 'antd'
import { post,put } from '@/utils/request'
import CrudTree from '@/container/deptTree/CrudTree'
import { CreateUserForm } from './AddCorpUser'
import { countryCode } from '@/component/custom/CountryCode'
import i18n from '@/locales'
import styled from 'styled-components';

const { Content, Sider } = Layout;
const confirm = Modal.confirm;

const Link = styled.a`
  &&& {
    color: #0d94ff;
    font-size: 12px;
  }
`;

export default class CorpDeptManage extends React.Component{
    constructor(){
        super();
        this.state = {
            addUserVisible: false,   
            headers: {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': sessionStorage.getItem('access_token')
                    },
            searchText: '',
            selectedRowKeys: [], // Check here to configure the default column
        }

        let params = 
        {
            condition: "",
            pageIndex: 1,
            pageSize: 5,
            deptCode: "1",
            enableRoom: false
        }
        
        this.queryCorpUsers(params);
    }

    //查询部门用户列表
    queryCorpUsers = (params1) =>{

        let data = JSON.stringify(params1);
        console.info("分页查询用户body:",data);
        
        post("/corp/member/search", {data}, this.state.headers).then((response)=>
        {    
            if(!response.success) {
                message.error(response.msg);
                return;
            }

            let resbody = JSON.parse(response.data.entity);

            console.info("分页查询用户返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }
    
            this.setState({
                usersInfo: resbody.data.data,
                totalCount: resbody.data.totalCount,
                pageIndex: resbody.data.pageIndex,
                selectedRowKeys: [],
            });
        })
    }

    //删除单个用户
    delRecord = () =>{
        let delList = [];
        delList.push(this.state.deluser);
        const delCorpUsers = (delList1) => this.delCorpUsers(delList1);
        confirm({
                title: '确定删除此用户吗?',
                content: '删除后，此用户无法再使用会议系统',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    delCorpUsers(delList);
                },
                onCancel() {},
        });
    }
    
    //删除
    delCorpUsers = (delList) =>{
        const data = JSON.stringify(delList);
        console.info("批量删除用户body:",data);

        post("/corp/member/delete", {data}, this.state.headers).then(
            (response) => {
                if(!response.success) {
                    message.error(response.msg);
                    return;
                }
    
                let resbody = JSON.parse(response.data.entity);
                console.info("批量删除用户返回结果:",JSON.stringify(resbody));
        
                if(resbody.returnCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                let deptCode = this.state.selectedDeptCode;
                
                let params = 
                {
                    condition: "",
                    pageIndex: 1,
                    pageSize: 5,
                    deptCode: deptCode,
                    enableRoom: false
                }

                this.queryCorpUsers(params);
            })
    }

    //分页查询
    paginationChange = (page, pageSize) =>{
        //console.log("page:"+page+"pagesize:"+pageSize);
        let deptCode = this.state.selectedDeptCode;

        let params = 
        {
            condition: "",
            pageIndex: page,
            pageSize: 5,
            deptCode: deptCode,
            enableRoom: false
        }
        this.queryCorpUsers(params);
    }

    //批量删除用户
    showDeleteConfirm = () => {
        const uuids = this.state.selectedRowKeys;
        console.log("批量删除用户uuids:",uuids);
        const delCorpUsers = (params3) => this.delCorpUsers(params3);
        confirm({
          title: '确定删除已选用户？',
          content: '删除后，用户无法再使用会议系统',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            delCorpUsers(uuids);
          },
          onCancel() {
            //console.log('Cancel');
          },
        });
    }

    //搜索用户
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
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
    };

    //保留选择项
    handleSelection = (selectedRowKeys) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`);
        this.setState({
            selectedRowKeys
        });
    }

    //从子组件传递过来的部门信息
    printContent = (messageInfo) =>{
        var { deptCode,deptNamePath } = messageInfo;
        //console.log("deptcode:"+deptCode);

        let deptPath = this.handleDeptNamePath(deptNamePath);
        this.setState({
            selectedDeptCode:deptCode,
            selectedDeptName:deptPath
        })

        let params = 
                {
                    condition: "",
                    pageIndex: 1,
                    pageSize: 5,
                    deptCode: deptCode,
                    enableRoom: false
                }

        this.queryCorpUsers(params);
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    hideAddUserModal = () => {
        this.setState({
            addUserVisible: false,
        });
    };

    //处理添加用户
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
        
            console.log('Received values of form: ', values);
            if( (values.phone === undefined||values.phone ===""||values.phone === null) && 
                (values.email === undefined||values.email ===""||values.email ===null) ) {
                    message.info("请输入手机号或邮箱！");
                    return;
            }
          
            if(values.email === ""){
                values.email = undefined;
            }

            let phone;
            let country;
            if(values.phone !== undefined && values.phone !=="" && values.phone !== null){
                phone = "+" + values.prefix + values.phone;
                country = countryCode[values.prefix];
            }

            let body = {
                    "account": values.account,
                    "country": country,
                    "deptCode": this.state.selectedDeptCode,
                    "email": values.email,
                    "mode": values.mode,
                    "name": values.name,
                    "phone": phone,
                    "pwd": values.pwd
                }

            this.addUser(body,form);
        });
    };

    showAddUserConfirm = () =>{
        this.setState({
            addUserVisible:true,
        })
    }

    //添加用户
    addUser = (body,form) => {
        const data = JSON.stringify(body);
        console.info("添加用户body:",data);

        //添加用户
        post("/corp/member", {data}, this.state.headers).then(
          (response) => {
            
            if(!response.success) {
                message.error(response.msg);
                return;
            }

            let resbody = JSON.parse(response.data.entity);
            console.info("添加用户返回结果:",JSON.stringify(resbody));
    
            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }

            let params = 
            {
                condition: "",
                pageIndex: 1,
                pageSize: 5,
                deptCode: this.state.selectedDeptCode,
                enableRoom: false
            }
            
            this.queryCorpUsers(params);
            message.success("添加成功！");

            form.resetFields(['name','account','phone','email','pwd','confirmPwd','deptName']);
            this.setState({ addUserVisible: false });
        })
    }
    
    handleStatus = (val) =>{
        if(val === 0){
            return "正常";
        }else{
            return "停用";
        }
    }

    handleDeptNamePath = (path) =>{
        return (
            path && path.split('#').reverse().map((item,index)=>{
                if(index !== 0 )
                {
                return "【"+item+"】";
                }
                return item;
            })
            .join('')
        );
    }

    //编辑用户
    editUserInfo = () => {
        const { history,match } = this.props;
        let pathUrl = `${match.path}`;
        let path = pathUrl.split("/")[1];
        history.push('/' + path + '/editCorpUser/'+this.state.deluser);
    }

    //查询用户信息
    queryUserInfo= () => {
        const { history,match } = this.props;
        let pathUrl = `${match.path}`;
        let path = pathUrl.split("/")[1];
        history.push('/' + path + '/queryUser/'+this.state.deluser);
    }

    //修改用户状态
    UserStatus =(value) =>{
        const data = JSON.stringify([this.state.deluser]); 

        const url= "/corp/member/status/" + value;

        console.info("修改用户状态body:",data);
       //修改用户状态
       put(url, {data}, this.state.headers).then(
        (res) => {

            if(!res.success) {
                message.error(res.msg);
                return;
            }
            let resbody = JSON.parse(res.data.entity);
            console.info("修改用户状态返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }

            let params = 
            {
                condition: "",
                pageIndex: 1,
                pageSize: 5,
                deptCode: this.state.selectedDeptCode,
                enableRoom: false
            }
            
            this.queryCorpUsers(params);
        })
    }

    //重置密码
    SettingPwd = () =>{
        const data =JSON.stringify({account:this.state.deluser});
        const headers = this.state.headers;
        confirm({
            title: '确定重置密码吗？',
            content: '新密码将会发送到用户的手机或邮箱',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                //重置密码
                console.info("重置密码body:",data);
                put("/password/admin/reset", {data}, headers).then(
                    (res) => {
            
                        if(!res.success) {
                            message.error(res.msg);
                            return;
                        }
                        let resbody = JSON.parse(res.data.entity);
                        console.info("重置密码返回结果:",JSON.stringify(resbody));
            
                        if(resbody.returnCode !== "000000000"){
                            message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                            return;
                        }
                        message.success("重置密码成功！"); 
                })
            },
            onCancel() {
            },
        });    
    }

    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
<<<<<<< HEAD

            selectedRowKeys,
            onChange: this.handleSelection,
            getCheckboxProps:record =>({
                disabled:record.userAccount===userAccount
            })
=======
            selectedRowKeys,
            onChange: this.handleSelection
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
        };
        const hasSelected = selectedRowKeys.length > 0;
        const access_token = sessionStorage.getItem("access_token");
        let userAccount = '';
        if(access_token){
            userAccount = access_token.split("|")[1];
        }
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 100,
            render: text => <Link onClick={this.queryUserInfo}>{text}</Link>,
          },{
            title: '部门',
            dataIndex: 'deptNamePath',
            key: 'deptNamePath',
            width: 150,
            render: (text) => (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                  {this.handleDeptNamePath(text)}
                </div>
              ),
          },{
            title: '账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
            // width: 100,
            ...this.getColumnSearchProps('userAccount'),
          },{
            title: '云会议室ID',
            dataIndex: 'vmrId',
            key: 'vmrId',
            width: 150,
          },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            // width: 100,
            render:(value)=>(this.handleStatus(value))
          },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            fixed: 'right',
            width: 120,
            render:(text,record)=>(<div>
                <div style={{float:'left'}}>
                   <Tooltip placement="bottom" title='修改'> 
                    <Icon type="edit" style={{color:'blue'}} onClick={this.editUserInfo}/>&nbsp;&nbsp;&nbsp;&nbsp;
                   </Tooltip>
                </div>

                <div style={{float:'left', display:record.userAccount===userAccount ? "none":"block"}}>
                  <Tooltip placement="bottom" title='删除'>
                    <Icon type="delete" style={{color:'blue'}} onClick={this.delRecord}/>&nbsp;&nbsp;&nbsp;&nbsp;
                  </Tooltip>
                </div>

                <div style={{float:'left'}}>
                    <Dropdown overlay={moreInfo} style={{disabled:'true'}}>
                            <Icon type="unordered-list" style={{color:'blue'}}/>
                    </Dropdown>
                </div>
            </div>)
          }];

          const moreInfo = (
            <Menu>
                <Menu.Item onClick={this.SettingPwd}>
                        重置密码                   
                </Menu.Item>
                <Menu.Item style={{display:this.state.status ===0 ? "block":"none"}} onClick={this.UserStatus.bind(this,1)}>
                        停用                  
                </Menu.Item>
                <Menu.Item style={{display:this.state.status ===1 ? "block":"none"}} onClick={this.UserStatus.bind(this,0)}>
                        启用                  
                </Menu.Item>        
            </Menu>
            );

        return( 
            <Layout>
                <Content style={{ background: '#ECECEC', padding: '30px',width:'100%',height:'100%'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>企业</Breadcrumb.Item>
                        <Breadcrumb.Item>会议用户</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout>
                        <Sider width={250} style={{background: '#fff',padding: 24,margin: 0,minHeight: 280,overflowX:'auto'}}> 
                            <CrudTree onSubmit={this.printContent}/>
                        </Sider>

                        <Content style={{ padding: '0 24px', minHeight: 280 ,background:'white'}}>
                            <br/>
                            <Button onClick={this.showDeleteConfirm} size='small' disabled={!hasSelected}>删除</Button>&nbsp;&nbsp;
                            <Button onClick={this.showAddUserConfirm} size='small'>添加</Button><br/><br/>

                            <CreateUserForm wrappedComponentRef={this.saveFormRef} visible={this.state.addUserVisible} 
                                onCancel={this.hideAddUserModal}
                                onCreate={this.handleCreate}
                                deptName={this.state.selectedDeptName}/>

                            <Table rowKey={record => record.userAccount} rowSelection={rowSelection} scroll={{ x: 800,y: 300 }} dataSource={this.state.usersInfo} columns={columns} 
                                pagination={{ pageSize: 5,total:this.state.totalCount,onChange:this.paginationChange,current:this.state.pageIndex}}
                                onRow={record =>{
                                    return {
                                        onMouseOver: event => {
                                            this.setState({
                                                deluser: record.userAccount,
                                                status: record.status,
                                            })
                                        }
                                    }
                                }}
                            />
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}