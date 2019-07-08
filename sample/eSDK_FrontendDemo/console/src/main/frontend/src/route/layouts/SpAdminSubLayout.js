/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Layout, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import { Route, NavLink, Switch } from 'react-router-dom';  
import { logout } from '@/utils/xhr'
import SpCorpSearch from '@/container/corpManage/SpCorpSearch'
import AddCorp from '@/container/corpManage/AddCorp'
import ModifyCorp from '@/container/corpManage/ModifyCorp'
import QueryCorpDetail from '@/container/corpManage/QueryCorpDetail'
import DeleteCorp from '@/container/corpManage/DeleteCorp'
import spCorpResourceSearch from '@/container/ResourceControl/spCorpResourceSearch'
import spCorpResourceRecordSearch from '@/container/ResourceControl/spCorpResourceRecordSearch'
import QueryCorpResourceList from '@/container/ResourceControl/QueryCorpResourceList'
import DelCorpResource from '@/container/ResourceControl/DelCorpResource'
import ModifyResourceExpireTime from '@/container/ResourceControl/ModifyResourceExpireTime'
import AddCorpResource from '@/container/ResourceControl/AddCorpResource'
import QueryResourceType from '@/container/ResourceControl/QueryResourceType'

const { SubMenu }= Menu;
const { Header, Content, Sider } = Layout;
class SpAdminSubLayout extends React.Component {
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
        openKeys: ['sub2'],
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
    return (
      <div className="conference-sub-layout">
        <Layout>
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu onClick={this.handleClick} theme="dark" mode="horizontal" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{ lineHeight : '64px'}}>
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
                      <SubMenu key="sub2" title={<span>API调用</span>}>
                        <SubMenu key="sub2_1" title={<span>企业管理</span>}>
                            <Menu.Item key="2_1_1"><NavLink to={`${match.path}/search/sp/corp`}>分页搜索企业</NavLink></Menu.Item>
                            <Menu.Item key="2_1_2"><NavLink to={`${match.path}/add/sp/corp`}>创建企业</NavLink></Menu.Item>
                            <Menu.Item key="2_1_3"><NavLink to={`${match.path}/modify/sp/corp`}>修改企业</NavLink></Menu.Item>
                            <Menu.Item key="2_1_4"><NavLink to={`${match.path}/queryCorpDetail/sp/corp`}>查询企业详情</NavLink></Menu.Item>
                            <Menu.Item key="2_1_5"><NavLink to={`${match.path}/delete/sp/corp`}>删除企业</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2_2" title={<span>资源发放管理</span>}>
                            <Menu.Item key="2_2_4"><NavLink to={`${match.path}/search/sp/corp/resource`}>查询企业资源列表</NavLink></Menu.Item>
                            <Menu.Item key="2_2_5"><NavLink to={`${match.path}/delete/sp/corp/resource`}>企业删除资源项</NavLink></Menu.Item>
                            <Menu.Item key="2_2_6"><NavLink to={`${match.path}/sp/corp/resource/search`}>SP根据条件查询企业的资源项</NavLink></Menu.Item>
                            <Menu.Item key="2_2_7"><NavLink to={`${match.path}/sp/corp/resourceRecord/search`}>SP根据条件查询企业的资源操作记录</NavLink></Menu.Item>
                            <Menu.Item key="2_2_8"><NavLink to={`${match.path}/query/resource/type`}>查询sp支持的订单资源类型</NavLink></Menu.Item>
                            <Menu.Item key="2_2_9"><NavLink to={`${match.path}/add/resource`}>企业新增资源发放</NavLink></Menu.Item>
                            <Menu.Item key="2_2_10"><NavLink to={`${match.path}/modify/resource/expireTime`}>企业修改资源的过期时间</NavLink></Menu.Item>
                        </SubMenu>
                      </SubMenu> 
                  </Menu>
                </Sider>
                <Content style={{ padding: '0 50px',marginLeft:220,zIndex: 0,}}>
                <Switch>
                  <Route path={`${match.path}/search/sp/corp`} exact component={SpCorpSearch} />
                  <Route path={`${match.path}/add/sp/corp`}  component={AddCorp} />
                  <Route path={`${match.path}/modify/sp/corp`}  component={ModifyCorp} />
                  <Route path={`${match.path}/queryCorpDetail/sp/corp`}  component={QueryCorpDetail} />
                  <Route path={`${match.path}/delete/sp/corp`}  component={DeleteCorp} />
                  <Route path={`${match.path}/search/sp/corp/resource`} exact component={QueryCorpResourceList} />
                  <Route path={`${match.path}/delete/sp/corp/resource`} exact component={DelCorpResource} />
                  <Route path={`${match.path}/sp/corp/resource/search`}  component={spCorpResourceSearch} />
                  <Route path={`${match.path}/sp/corp/resourceRecord/search`}  component={spCorpResourceRecordSearch} />
                  <Route path={`${match.path}/modify/resource/expireTime`}  component={ModifyResourceExpireTime} />
                  <Route path={`${match.path}/add/resource`}  component={AddCorpResource} />
                  <Route path={`${match.path}/query/resource/type`}  component={QueryResourceType} />
                </Switch>
                </Content> 
              </Layout>
             
          </Layout>             
    </div>
    ); 
  }
}

export default SpAdminSubLayout