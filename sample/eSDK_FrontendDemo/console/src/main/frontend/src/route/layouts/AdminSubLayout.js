/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Layout, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import { Route, NavLink, Switch } from 'react-router-dom';  
import { logout } from '@/utils/xhr'

import AdminCorpManager from '@/container/corpControl/AdminCorpManager'

import addCorpUser from '@/container/corpControl/addCorpUser'
import modCorpUser from '@/container/corpControl/modCorpUser'
import queryCorpUser from '@/container/corpControl/queryCorpUser'
import delCorpUsers from '@/container/corpControl/delCorpUsers'
import pageQueryCorpUser from '@/container/corpControl/pageQueryCorpUser'
import modCorpUserStatus from '@/container/corpControl/modCorpUserStatus'

import AddDevice from '@/container/deviceManage/AddDevice';
import ModifyDevice from '@/container/deviceManage/ModifyDevice';
import GetDeviceInfo from '@/container/deviceManage/GetDeviceInfo';
import DelDevice from '@/container/deviceManage/DelDevice';
import SearchDevice from '@/container/deviceManage/SearchDevice';
import ModDeviceStatus from '@/container/deviceManage/ModDeviceStatus';
import GetDeviceType from '@/container/deviceManage/GetDeviceType';
import ResetDeviceCode from '@/container/deviceManage/ResetDeviceCode';
import DevicePortal from '@/container/deviceManage/DevicePortal';
import AddDevicePortal from '@/container/deviceManage/AddDevicePortal';
import ModifyDevicePortal from '@/container/deviceManage/ModifyDevicePortal';
import DeviceDetailPortal from '@/container/deviceManage/DeviceDetailPortal';

import AddCorpDept from '@/container/corpManage/AddCorpDept'
import ModifyCorpDept from '@/container/corpManage/ModifyCorpDept'
import DeleteCorpDept from '@/container/corpManage/DeleteCorpDept'
import QueryCorpDeptCode from '@/container/corpManage/QueryCorpDeptCode'
import QueryCorpDept from '@/container/corpManage/QueryCorpDept'

import AddCorpManager from '@/container/corpManager/AddCorpManager';
import ModifyCorpManager from '@/container/corpManager/ModifyCorpManager';
import GetCorpManager from '@/container/corpManager/GetCorpManager';
import DelCorpManager from '@/container/corpManager/DelCorpManager';
import PageQueryCorpManager from '@/container/corpManager/PageQueryCorpManager';
import CorpDeptManage from '@/container/corpManage/CorpDeptManage';
import EditCorpUser from '@/container/corpManage/EditCorpUser';
import QueryUser from '@/container/corpManage/QueryUser';
import SpCorpInfo from '@/container/corpManage/SpCorpInfo'
import ModifySpCorp from '@/container/corpManage/ModifySpCorp'
import SearchCorpResource from '@/container/corpManage/SearchCorpResource'

const { SubMenu }= Menu;
const { Header, Content, Sider } = Layout;
class AdminSubLayout extends React.Component {
    constructor () {
      super();
      this.handleClick = this.handleClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    componentDidMount() {
      // 注册浏览器尺寸变化监听事件， 刷新桌面尺寸
      window.addEventListener('resize', this.handleSize);
      
    }
    
    handleSize = () => {
      this.setState({
          deskHeight:window.innerHeight - 50,
      });

    }
    componentWillUnmount() {
      // 移除监听事件
      window.removeEventListener('resize', this.handleSize);
    }
    
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    
      state = {
<<<<<<< HEAD
        openKeys: ['sub1'],
=======
<<<<<<< HEAD
        openKeys: ['sub1'],
=======
        openKeys: ['sub2'],
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
      };

    handleClick = (e) => {
      //console.log('click ', e);
    }

    handleLogoutClick =
    () => {
      const { history } = this.props;
      logout().then(() => {
        history.push('/')
      })
    }

    onOpenChange = (openKeys) => {
        this.setState({ deskHeight:window.innerHeight - 50 });
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],               
          }); 
        }
    }

  render() {
    const {match} = this.props;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
    const token = sessionStorage.getItem("access_token");
    let userName = "";
    if(token){
      userName = "欢迎光临，" + token.split("|")[1];
    }
<<<<<<< HEAD
=======
=======
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
    return (
      <div className="conference-sub-layout">
        <Layout>
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu onClick={this.handleClick} theme="dark" mode="horizontal" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{ lineHeight : '64px'}}>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                  <Menu.Item key="1" style={{float: 'right'}}>
                      <Button onClick={this.handleLogoutClick} type = "primary" >注销</Button>
                  </Menu.Item>
                  <Menu.Item style={{float: 'right'}} key="2">{userName}</Menu.Item>
              </Menu> 
            </Header>
    
            <Layout style={{ padding: '24px 0',background:'#fff',marginTop:40}}>
              <Sider width={270} style={{ background: '#fff',overflow: 'auto',height:this.state.deskHeight, position: 'fixed', zIndex: 1}}>
                <Menu onClick={this.handleClick} defauselectedkeys={['1']} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{ width: 256 }}>
                  <Menu.Item key="0">首页</Menu.Item>
                  <SubMenu key="sub1" title={<span>场景适配</span>}>
                    <SubMenu key="sub1_1" title={<span>企业</span>}>
                      <Menu.Item key="1_1_3"><NavLink to={`${match.path}/corpDept`}>会议用户</NavLink></Menu.Item> 
                      <Menu.Item key="1_1_2"><NavLink to={`${match.path}/corp/admin`}>管理员</NavLink></Menu.Item>
                      <Menu.Item key="1_1_4"><NavLink to={`${match.path}/corp/device`}>终端管理</NavLink></Menu.Item> 
                    </SubMenu>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span>API调用</span>}>
                    <SubMenu key="sub2_1" title={<span>用户管理</span>}>
                        <Menu.Item key="2_1_1"><NavLink to={`${match.path}/addCorpUser`}>添加用户</NavLink></Menu.Item>
                        <Menu.Item key="2_1_2"><NavLink to={`${match.path}/modCorpUser`}>修改用户</NavLink></Menu.Item>
                        <Menu.Item key="2_1_3"><NavLink to={`${match.path}/queryCorpUser`}>查询用户详情</NavLink></Menu.Item>                           
                        <Menu.Item key="2_1_4"><NavLink to={`${match.path}/delCorpUsers`}>批量删除用户</NavLink></Menu.Item>
                        <Menu.Item key="2_1_5"><NavLink to={`${match.path}/pageQueryCorpUser`}>分页查询用户</NavLink></Menu.Item>
                        <Menu.Item key="2_1_6"><NavLink to={`${match.path}/modCorpUserStatus`}>批量修改用户状态</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2_2" title={<span>终端管理</span>}>
                        <Menu.Item key="2_2_1"><NavLink to={`${match.path}/addDevice`}>增加终端</NavLink></Menu.Item>
                        <Menu.Item key="2_2_2"><NavLink to={`${match.path}/modifyDevice`}>修改终端</NavLink></Menu.Item>
                        <Menu.Item key="2_2_3"><NavLink to={`${match.path}/getDeviceInfo`}>查询终端详情</NavLink></Menu.Item>
                        <Menu.Item key="2_2_4"><NavLink to={`${match.path}/delDevice`}>批量删除终端</NavLink></Menu.Item>
                        <Menu.Item key="2_2_5"><NavLink to={`${match.path}/searchDevice`}>分页查询终端</NavLink></Menu.Item>
                        <Menu.Item key="2_2_6"><NavLink to={`${match.path}/modDeviceStatus`}>批量修改终端状态</NavLink></Menu.Item>
                        <Menu.Item key="2_2_7"><NavLink to={`${match.path}/getDeviceType`}>获取所有终端类型</NavLink></Menu.Item>
                        <Menu.Item key="2_2_8"><NavLink to={`${match.path}/ResetDeviceCode`}>重置激活码</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2_3" title={<span>部门管理</span>}>
                        <Menu.Item key="api1_1"><NavLink to={`${match.path}/add/corp/dept`}>创建部门</NavLink></Menu.Item> 
                        <Menu.Item key="api1_2"><NavLink to={`${match.path}/modify/corp/dept`}>修改部门</NavLink></Menu.Item>
                        <Menu.Item key="api1_3"><NavLink to={`${match.path}/delete/corp/dept`}>删除部门</NavLink></Menu.Item>
                        <Menu.Item key="api1_4"><NavLink to={`${match.path}/query/corp/deptCode`}>查询部门及其一级子部门列表</NavLink></Menu.Item>
                        <Menu.Item key="api1_5"><NavLink to={`${match.path}/query/corp/dept`}>按名称查询所有的部门</NavLink></Menu.Item>  
                    </SubMenu>
                    <SubMenu key="sub2_4" title={<span>企业管理员管理</span>}>
                        <Menu.Item key="2_4_1"><NavLink to={`${match.path}/addCorpManager`}>增加企业管理员</NavLink></Menu.Item>
                        <Menu.Item key="2_4_2"><NavLink to={`${match.path}/modifyCorpManager`}>修改企业管理员</NavLink></Menu.Item>
                        <Menu.Item key="2_4_3"><NavLink to={`${match.path}/getCorpManager`}>查询企业管理员</NavLink></Menu.Item>
                        <Menu.Item key="2_4_4"><NavLink to={`${match.path}/delCorpManager`}>删除企业管理员</NavLink></Menu.Item>
                        <Menu.Item key="2_4_5"><NavLink to={`${match.path}/pageQueryCorpManager`}>分页企业管理员</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2_5" title={<span>企业管理</span>}>
                        <Menu.Item key="2_5_2"><NavLink to={`${match.path}/info/sp/corp`}>查询企业注册信息</NavLink></Menu.Item>
                        <Menu.Item key="2_5_3"><NavLink to={`${match.path}/modify/sp/corp`}>修改企业注册信息</NavLink></Menu.Item>
                        <Menu.Item key="2_5_4"><NavLink to={`${match.path}/search/corp/resource`}>查询企业内资源</NavLink></Menu.Item>
                    </SubMenu> 
                  </SubMenu>
              </Menu>
              </Sider>
              <Content style={{ padding: '0 50px',marginLeft:220,zIndex: 0,}}>
              <Switch>
                <Route path={`${match.path}/corp/admin`} exact component={AdminCorpManager} />
                <Route path={`${match.path}/corp/device`} exact component={DevicePortal} />
                <Route path={`${match.path}/corp/device/create`} exact component={AddDevicePortal} />
                <Route path={`${match.path}/corp/device/modify/:sn`} exact component={ModifyDevicePortal} />
                <Route path={`${match.path}/corp/device/detail`} component={DeviceDetailPortal} />

                <Route path={`${match.path}/addCorpUser`} component={addCorpUser} />
                <Route path={`${match.path}/modCorpUser`} component={modCorpUser} />
                <Route path={`${match.path}/queryCorpUser`} component={queryCorpUser} />
                <Route path={`${match.path}/delCorpUsers`} component={delCorpUsers} />
                <Route path={`${match.path}/pageQueryCorpUser`} component={pageQueryCorpUser} />
                <Route path={`${match.path}/modCorpUserStatus`} component={modCorpUserStatus} />

                <Route path={`${match.path}/addDevice`} component={AddDevice} />
                <Route path={`${match.path}/modifyDevice`} component={ModifyDevice} />
                <Route path={`${match.path}/getDeviceInfo`} component={GetDeviceInfo} />
                <Route path={`${match.path}/delDevice`} component={DelDevice} />
                <Route path={`${match.path}/searchDevice`} component={SearchDevice} />
                <Route path={`${match.path}/modDeviceStatus`} component={ModDeviceStatus} />
                <Route path={`${match.path}/getDeviceType`} component={GetDeviceType} />
                <Route path={`${match.path}/ResetDeviceCode`} component={ResetDeviceCode} />
                <Route path={`${match.path}/add/corp/dept`} component={AddCorpDept}/>
                <Route path={`${match.path}/modify/corp/dept`} component={ModifyCorpDept}/>
                <Route path={`${match.path}/delete/corp/dept`} component={DeleteCorpDept}/>
                <Route path={`${match.path}/query/corp/deptCode`} component={QueryCorpDeptCode}/>
                <Route path={`${match.path}/query/corp/dept`} component={QueryCorpDept}/>
              
                <Route path={`${match.path}/addCorpManager`} component={AddCorpManager} />
                <Route path={`${match.path}/modifyCorpManager`} component={ModifyCorpManager} />
                <Route path={`${match.path}/getCorpManager`} component={GetCorpManager} />
                <Route path={`${match.path}/delCorpManager`} component={DelCorpManager} />
                <Route path={`${match.path}/pageQueryCorpManager`} component={PageQueryCorpManager} />
                <Route path={`${match.path}/corpDept`} component={CorpDeptManage} />
                <Route path={`${match.path}/editCorpUser/:userAccount`} component={EditCorpUser} />
                <Route path={`${match.path}/queryUser/:userAccount`} component={QueryUser} />
                <Route path={`${match.path}/info/sp/corp`} component={SpCorpInfo} />
                <Route path={`${match.path}/modify/sp/corp`} component={ModifySpCorp} />
                <Route path={`${match.path}/search/corp/resource`} component={SearchCorpResource} />
              </Switch>
              </Content> 
            </Layout>   
<<<<<<< HEAD
=======
=======
              <Menu.Item key="1">欢迎光临</Menu.Item>
                <Menu.Item key="2">
                  <Button onClick={this.handleLogoutClick} type = "primary" >注销</Button>
                </Menu.Item>
              </Menu> 
            </Header>
            
            
                <Layout style={{ padding: '24px 0',background:'#fff',marginTop:40}}>
                  <Sider width={270} style={{ background: '#fff',overflow: 'auto',height:this.state.deskHeight, position: 'fixed', zIndex: 1}}>
                    <Menu onClick={this.handleClick} defauselectedkeys={['1']} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{ width: 256 }}>
                      <Menu.Item key="0">首页</Menu.Item>
                      <SubMenu key="sub1" title={<span>场景适配</span>}>
                        <SubMenu key="sub1_1" title={<span>企业</span>}>
                          <Menu.Item key="1_1_3"><NavLink to={`${match.path}/corpDept`}>会议用户</NavLink></Menu.Item> 
			                    <Menu.Item key="1_1_2"><NavLink to={`${match.path}/corp/admin`}>管理员</NavLink></Menu.Item>
                          <Menu.Item key="1_1_4"><NavLink to={`${match.path}/corp/device`}>终端管理</NavLink></Menu.Item> 
                        </SubMenu>
                      </SubMenu>
                      <SubMenu key="sub2" title={<span>API调用</span>}>
                        <SubMenu key="sub2_1" title={<span>用户管理</span>}>
                            <Menu.Item key="2_1_1"><NavLink to={`${match.path}/addCorpUser`}>添加用户</NavLink></Menu.Item>
                            <Menu.Item key="2_1_2"><NavLink to={`${match.path}/modCorpUser`}>修改用户</NavLink></Menu.Item>
                            <Menu.Item key="2_1_3"><NavLink to={`${match.path}/queryCorpUser`}>查询用户详情</NavLink></Menu.Item>                           
                            <Menu.Item key="2_1_4"><NavLink to={`${match.path}/delCorpUsers`}>批量删除用户</NavLink></Menu.Item>
                            <Menu.Item key="2_1_5"><NavLink to={`${match.path}/pageQueryCorpUser`}>分页查询用户</NavLink></Menu.Item>
                            <Menu.Item key="2_1_6"><NavLink to={`${match.path}/modCorpUserStatus`}>批量修改用户状态</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2_2" title={<span>终端管理</span>}>
                            <Menu.Item key="2_2_1"><NavLink to={`${match.path}/addDevice`}>增加终端</NavLink></Menu.Item>
                            <Menu.Item key="2_2_2"><NavLink to={`${match.path}/modifyDevice`}>修改终端</NavLink></Menu.Item>
                            <Menu.Item key="2_2_3"><NavLink to={`${match.path}/getDeviceInfo`}>查询终端详情</NavLink></Menu.Item>
                            <Menu.Item key="2_2_4"><NavLink to={`${match.path}/delDevice`}>批量删除终端</NavLink></Menu.Item>
                            <Menu.Item key="2_2_5"><NavLink to={`${match.path}/searchDevice`}>分页查询终端</NavLink></Menu.Item>
                            <Menu.Item key="2_2_6"><NavLink to={`${match.path}/modDeviceStatus`}>批量修改终端状态</NavLink></Menu.Item>
                            <Menu.Item key="2_2_7"><NavLink to={`${match.path}/getDeviceType`}>获取所有终端类型</NavLink></Menu.Item>
                            <Menu.Item key="2_2_8"><NavLink to={`${match.path}/ResetDeviceCode`}>重置激活码</NavLink></Menu.Item>
                        </SubMenu>
						            <SubMenu key="sub2_3" title={<span>部门管理</span>}>
                            <Menu.Item key="api1_1"><NavLink to={`${match.path}/add/corp/dept`}>创建部门</NavLink></Menu.Item> 
                            <Menu.Item key="api1_2"><NavLink to={`${match.path}/modify/corp/dept`}>修改部门</NavLink></Menu.Item>
                            <Menu.Item key="api1_3"><NavLink to={`${match.path}/delete/corp/dept`}>删除部门</NavLink></Menu.Item>
                            <Menu.Item key="api1_4"><NavLink to={`${match.path}/query/corp/deptCode`}>查询部门及其一级子部门列表</NavLink></Menu.Item>
                            <Menu.Item key="api1_5"><NavLink to={`${match.path}/query/corp/dept`}>按名称查询所有的部门</NavLink></Menu.Item>  
                        </SubMenu>
                        <SubMenu key="sub2_4" title={<span>企业管理员管理</span>}>
                            <Menu.Item key="2_4_1"><NavLink to={`${match.path}/addCorpManager`}>增加企业管理员</NavLink></Menu.Item>
                            <Menu.Item key="2_4_2"><NavLink to={`${match.path}/modifyCorpManager`}>修改企业管理员</NavLink></Menu.Item>
                            <Menu.Item key="2_4_3"><NavLink to={`${match.path}/getCorpManager`}>查询企业管理员</NavLink></Menu.Item>
                            <Menu.Item key="2_4_4"><NavLink to={`${match.path}/delCorpManager`}>删除企业管理员</NavLink></Menu.Item>
                            <Menu.Item key="2_4_5"><NavLink to={`${match.path}/pageQueryCorpManager`}>分页企业管理员</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2_5" title={<span>企业管理</span>}>
                            <Menu.Item key="2_5_2"><NavLink to={`${match.path}/info/sp/corp`}>查询企业注册信息</NavLink></Menu.Item>
                            <Menu.Item key="2_5_3"><NavLink to={`${match.path}/modify/sp/corp`}>修改企业注册信息</NavLink></Menu.Item>
                            <Menu.Item key="2_5_4"><NavLink to={`${match.path}/search/corp/resource`}>查询企业内资源</NavLink></Menu.Item>
                        </SubMenu> 
                      </SubMenu>
                  </Menu>
                </Sider>
                <Content style={{ padding: '0 50px',marginLeft:220,zIndex: 0,}}>
                <Switch>
                  <Route path={`${match.path}/corp/admin`} exact component={AdminCorpManager} />
                  <Route path={`${match.path}/corp/device`} exact component={DevicePortal} />
                  <Route path={`${match.path}/corp/device/create`} exact component={AddDevicePortal} />
                  <Route path={`${match.path}/corp/device/modify/:sn`} exact component={ModifyDevicePortal} />
                  <Route path={`${match.path}/corp/device/detail`} component={DeviceDetailPortal} />

                  <Route path={`${match.path}/addCorpUser`} component={addCorpUser} />
                  <Route path={`${match.path}/modCorpUser`} component={modCorpUser} />
                  <Route path={`${match.path}/queryCorpUser`} component={queryCorpUser} />
                  <Route path={`${match.path}/delCorpUsers`} component={delCorpUsers} />
                  <Route path={`${match.path}/pageQueryCorpUser`} component={pageQueryCorpUser} />
                  <Route path={`${match.path}/modCorpUserStatus`} component={modCorpUserStatus} />

                  <Route path={`${match.path}/addDevice`} component={AddDevice} />
                  <Route path={`${match.path}/modifyDevice`} component={ModifyDevice} />
                  <Route path={`${match.path}/getDeviceInfo`} component={GetDeviceInfo} />
                  <Route path={`${match.path}/delDevice`} component={DelDevice} />
                  <Route path={`${match.path}/searchDevice`} component={SearchDevice} />
                  <Route path={`${match.path}/modDeviceStatus`} component={ModDeviceStatus} />
                  <Route path={`${match.path}/getDeviceType`} component={GetDeviceType} />
                  <Route path={`${match.path}/ResetDeviceCode`} component={ResetDeviceCode} />
				          <Route path={`${match.path}/add/corp/dept`} component={AddCorpDept}/>
                  <Route path={`${match.path}/modify/corp/dept`} component={ModifyCorpDept}/>
                  <Route path={`${match.path}/delete/corp/dept`} component={DeleteCorpDept}/>
                  <Route path={`${match.path}/query/corp/deptCode`} component={QueryCorpDeptCode}/>
                  <Route path={`${match.path}/query/corp/dept`} component={QueryCorpDept}/>
                
                  <Route path={`${match.path}/addCorpManager`} component={AddCorpManager} />
                  <Route path={`${match.path}/modifyCorpManager`} component={ModifyCorpManager} />
                  <Route path={`${match.path}/getCorpManager`} component={GetCorpManager} />
                  <Route path={`${match.path}/delCorpManager`} component={DelCorpManager} />
                  <Route path={`${match.path}/pageQueryCorpManager`} component={PageQueryCorpManager} />
                  <Route path={`${match.path}/corpDept`} component={CorpDeptManage} />
                  <Route path={`${match.path}/editCorpUser/:userAccount`} component={EditCorpUser} />
                  <Route path={`${match.path}/queryUser/:userAccount`} component={QueryUser} />
                  <Route path={`${match.path}/info/sp/corp`} component={SpCorpInfo} />
                  <Route path={`${match.path}/modify/sp/corp`} component={ModifySpCorp} />
                  <Route path={`${match.path}/search/corp/resource`} component={SearchCorpResource} />
                </Switch>
                </Content> 
              </Layout>
             
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
          </Layout>             
    </div>
    ); 
  }
}

export default AdminSubLayout