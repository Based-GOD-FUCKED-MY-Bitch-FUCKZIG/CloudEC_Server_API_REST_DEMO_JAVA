/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { get } from '@/utils/request';
import { message,Table,Button,Card,Tooltip,Icon,Modal,Pagination,Layout,Tree   } from 'antd';
import { post } from '@/utils/request'
import i18n from '@/locales'

var dataSource = []
var accounts = []
const {  Sider, Content } = Layout
const { TreeNode } = Tree;

/**
 * 企业管理员的管理界面
 */
class AdminCorpManager extends React.Component {
    
    constructor(){
        super();
        this.state={
            admins:[],
            users:[],
            organizaions:[],
            disabled:true,
            visible:false,
            totalUser:0,
            selectedRowKeys:[]
        }
        
        var queryBody = {"pageIndex":1,'pageSize':10}
        var data = JSON.stringify(queryBody)
        this.pageQueryCorpManager(data)
        this.queryDept(1)
        
    }
    
    //查询管理员
    pageQueryCorpManager=(data)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
      };

      console.info("查询管理员body:",JSON.stringify(data));

      post("/rest/usg/datacenter/v1/corp/admin/search", {data}, headers).then(
        (res) => {
            if(!this.failTip(res)){
                return;
            }
            
            this.setState({
                total:JSON.parse(res.data.entity).data.totalCount,
                selectedRowKeys:[]
            })
            dataSource = JSON.parse(res.data.entity).data.data

            for(var i=0; i < dataSource.length; i++){
                if(dataSource[i].adminType===0){
                    dataSource[i].adminType="默认管理员"
                }else{
                    dataSource[i].adminType="普通管理员"
                }
            }
        
            this.setState({
                admins: dataSource
            });
            if(this.state.selectedRowKeys.length === 0){
                this.setState({
                    disabled:true
                })
            }
        })
    }

    //删除管理员
    delCorpManager=(data)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
      };

      console.info("删除管理员body:",JSON.stringify(data));

      post("/rest/usg/datacenter/v1/corp/admin/delete", {data}, headers).then(
        (res) => {
            if(!this.failTip(res)){
                return;
            }

            var queryBody = {"pageIndex":1,'pageSize':10}
            var data = JSON.stringify(queryBody)
            this.pageQueryCorpManager(data)
            message.success('操作成功')
           
        })
    }

    delAdmin=(data)=>{
        const delAdmin =(data) =>  this.delCorpManager(data)      

        Modal.confirm({
            title: '确定要删除管理员吗?',
            onOk() {
                delAdmin(data)
            },
            onCancel() {
              //console.log('Cancel');
            },
          });            
    }

    //查询企业用户
    queryUsers=(deptCode,pageIndex,pageSize)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
         };
         var queryBody = {
             "pageIndex":pageIndex,"pageSize":pageSize,"deptCode":deptCode,"adminType":2
         }
         var data = JSON.stringify(queryBody)

         console.info("查询企业用户body:",data);

         post("/corp/member/search", {data}, headers).then(
            (res) => {
                if(!this.failTip(res)){
                    return;
                }
                this.setState({
                    users: JSON.parse(res.data.entity).data.data,
                    totalUser: JSON.parse(res.data.entity).data.totalCount,
                    selectedRowKeys:[]                    
                });
            })
    }
    onShowSizeChange=(current, pageSize)=>{
        var queryBody={"pageIndex":current,"pageSize":pageSize}
        var data = JSON.stringify(queryBody)
        this.pageQueryCorpManager(data)
    }
    onChange=(current,pageSize)=>{
        var queryBody={"pageIndex":current,"pageSize":pageSize}
        var data = JSON.stringify(queryBody)
        this.pageQueryCorpManager(data)      
    }
    onUserChange=(current)=>{
        if(this.state.deptCode === undefined){
            this.queryUsers('1',current,10)
        }else{
            this.queryUsers(this.state.deptCode,current,10)
        }
        
    }
    showModal=()=>{
        this.queryUsers(this.state.deptCode,1,10)
        this.setState({
            visible:true
        })        
    }

    handleOk = (e) => {
        if(this.state.selectedRowKeys.length === 0){
            return;
        }
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        };
        var addAdminBody = {}
        var data = JSON.stringify(addAdminBody)

        console.info("添加管理员body:",data);
        //添加管理员
        post('/rest/usg/datacenter/v1/corp/admin/' + this.state.userAccount, {data}, headers).then(
            (res) => {
                if(!this.failTip(res)){
                    return;
                }
                var queryBody = {"pageIndex":1,'pageSize':10}
                var data = JSON.stringify(queryBody)
                this.pageQueryCorpManager(data)
                message.success('操作成功')
                this.queryUsers(this.state.deptCode,1,10)
            })

        this.setState({
            visible: false
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectedRowKeys:[]
        });
    }

    //查询部门以一级子部门列表
    queryDept=(deptCode)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        };

        get("/rest/usg/datacenter/v1/member/dept/"+ deptCode, headers).then(
            (res) => {

                if(!this.failTip(res)){
                    return;
                }
                const deptTreeJson = JSON.parse(res.data.entity).data
                
                this.setState({
                    organizaions: [deptTreeJson]
                });
                    
                
            })

    }

    queryOrganizaiton = (node) => {
        let headers = {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': sessionStorage.getItem('access_token')
                    };
        //查询企业部门及一级部门
        get("/rest/usg/datacenter/v1/member/dept/"+node.deptCode, headers).then(
            (res) => {
                if(!this.failTip(res)){
                    return;
                }

                let resbody = JSON.parse(res.data.entity);

                const { data: organizaion } = resbody;
                const { childDepts } = organizaion;
                node.childDepts = childDepts;
                this.setState(preState => {
                    const { organizaions: preOrganizaions } = preState;
                    return { organizaions: [...preOrganizaions] };
                });

                return Promise.resolve();
        })
    }
    handleLoadData = treeNode => {
        const { children, dataRef: node } = treeNode.props;
        if (children) {
          return Promise.resolve();
        }
    
        this.queryOrganizaiton(node);

        return Promise.resolve()
    };

    handleSelect = (selectedKeys) => {
        this.setState({
            deptCode:selectedKeys[0]
        })    
        this.queryUsers(selectedKeys[0],1,10)
    };

    renderNode = nodes => {
        if (!nodes || !nodes.length) {
          return null;
        }
    
        return nodes.map(node => {
          const { deptCode: key, childDepts: children, isLeafNode: isLeaf } = node;
          return (
            <TreeNode
              key={key}
              isLeaf={isLeaf}
              dataRef={node}
              title={node.deptName}
            >
              {this.renderNode(children)}
            </TreeNode>
            );
        });
    };

    //结果返回错误提示
    failTip=(res)=>{
        if(!res.success) {
            message.error(res.msg);
            return false;
        }

        let resbody = JSON.parse(res.data.entity);

        console.info("返回结果:",JSON.stringify(resbody));

        if(resbody.returnCode !== "000000000"){
            message.error(resbody.returnCode+":"+ i18n.t(resbody.returnCode))
            return false;
        }
        return true;
    }
    render(){
<<<<<<< HEAD
        //const { selectedKeys, ...args } = this.props;  
=======
<<<<<<< HEAD
        //const { selectedKeys, ...args } = this.props;  
=======
        const { selectedKeys, ...args } = this.props;  
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '部门',
                dataIndex: 'dept.deptName',
            },
            {
                title: '账号',
                dataIndex: 'account',
            },
            {
                title: '手机',
                dataIndex: 'phone',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '角色',
                dataIndex: 'adminType',
            },
            {
                title: '操作',
                dataIndex: 'operator',
                render:(text,record)=>(
                    
                <span style={{display:record.adminType==="默认管理员"?"none":"block"}}>
                    <Tooltip placement="bottom" title='删除'>
                        <Icon type="delete" style={{color:'#4876FF',fontSize:20}} onClick={this.delAdmin.bind(this,JSON.stringify([this.state.account]))}/>
                    </Tooltip>
                </span>)
            },
          ];

          const columns2 = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '部门',
                dataIndex: 'deptNamePath',
            },
            {
                title: '账号',
                dataIndex: 'userAccount',
            },
            {
                title: '手机',
                dataIndex: 'phone',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            }           
          ];

            const { selectedRowKeys } = this.state;
            // rowSelection object indicates the need for row selection
            const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
            accounts=[]    
            //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

            if(selectedRowKeys.length===0){
                this.setState({
                    disabled:true
                })
            }else{
                this.setState({
                    disabled:false
                })
            }
            for(var i=0;i<selectedRows.length;i++){
                accounts.push(selectedRows[i].account)
            }
            this.setState({
                accounts:accounts,
                selectedRowKeys
            })
            },
            getCheckboxProps: record => ({
            disabled: record.adminType === "默认管理员", // Column configuration not to be checked
            name: record.name,
            }),
        };

        const rowRadioSelection = {
            selectedRowKeys,
            type:'radio',
            onChange: (selectedRowKeys, selectedRows) => {   
            //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({
                selectedRowKeys,
                userAccount:selectedRows[0].userAccount,                
            })
            },
        };
        
        return(            
            <div style={{ background: '#ECECEC', padding: '30px',width:'100%',height:'100%'}}>
                <h3 style={{ marginBottom: 16 }}>管理员</h3>
                <div>
                    <Card>
                        <div style={{ position: 'relative',zIndex: 1}}>
                            <div style={{float:'left'}} ><Button type="primary" onClick={this.showModal}>添加</Button></div>
                            <div style={{float:'left',marginLeft:'10px'}}><Button onClick={this.delAdmin.bind(this,JSON.stringify(this.state.accounts))} disabled={this.state.disabled}>删除</Button></div>
                        </div>
                        
                        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={this.state.admins} pagination={false} size={'small'}
                        onRow={record =>{
                         return {
                            onMouseEnter: event => {
                                this.setState({
                                    account:record.account,
                                    adminType:record.adminType
                                })                      
                            },
                         }
                     }} />
                    </Card>
                </div>
                <div style={{"float":'right'}}>
                        <Pagination
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange}
                        onChange={this.onChange}
                        defaultCurrent={1}
                        total={this.state.total}/>
                </div>
                <Modal title="添加管理员" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} width={1200} maskClosable={false} keyboard={false}>
                    <Card>
                        <Layout>                            
                            <Layout>
                                <Sider>
                                    <div style={{width:'100%',height:'100%',background:'white',overflowX:'auto'}}>
                                        部门
                                        <Tree
                                                loadData={this.handleLoadData}
                                                onSelect={this.handleSelect}
                                                showLine
                                            >
                                            {this.renderNode(this.state.organizaions)}
                                        </Tree>   
                                    </div>                                                                 
                                </Sider>
                                <Content>
                                    <div style={{background:'white'}}>
                                        <Table rowKey={record => record.id} rowSelection={rowRadioSelection} columns={columns2} dataSource={this.state.users} size={'small'}
                                             pagination={{ pageSize: 10,total:this.state.totalUser,onChange:this.onUserChange}}/>                                                                                                                       
                                    </div>
                                </Content>
                            </Layout>                            
                        </Layout>                        
                    </Card>
                </Modal>                  
            </div>
        )
    }
}

export default AdminCorpManager;