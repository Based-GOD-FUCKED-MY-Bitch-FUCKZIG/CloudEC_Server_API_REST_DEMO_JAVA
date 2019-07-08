/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Layout, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import { Route, NavLink, Switch } from 'react-router-dom';  
import CreateConf from '@/container/pages/CreateConf';
import CancelConf from '@/container/pages/CancelConf';
import ModifyConf from '@/container/pages/ModifyConf';
import endConf from '@/container/confControl/endConf';
import InviteParticipants from '@/container/confControl/InviteParticipants';
import participantsMute from '@/container/confControl/participantsMute';
import GetConfToken from '@/container/confControl/GetConfToken';
import GetConfList from '@/container/pages/GetConfList';
import ForParticipant from '@/container/confControl/ForParticipant';
import ParticipantsStatus from '@/container/confControl/ParticipantsStatus';
import ParticipantsPhoneNum from '@/container/confControl/ParticipantsPhoneNum';
import setMultiPicture from '@/container/confControl/setMultiPicture';
import switchMode from '@/container/confControl/switchMode';
import ParticipantsRole from '@/container/confControl/ParticipantsRole'
import ConferencesMute from '@/container/confControl/ConferencesMute'
import ConferencesLock from '@/container/confControl/ConferencesLock'
import delRecordFile from '@/container/confControl/delRecordFile';
import deleteRecordfiles from '@/container/confControl/deleteRecordfiles';
import isRollcalled from '@/container/confControl/isRollcalled';
import GetConfInfo from '@/container/pages/GetConfInfo';
import RenameSite from '@/container/confControl/RenameSite';
import Broadcast from '@/container/confControl/Broadcast';
import SetRecord from '@/container/confControl/SetRecord';
import GetRecordFiles from '@/container/confControl/GetRecordFiles';
import GetRecordFile from '@/container/confControl/GetRecordFile';
import GetHistoryConfList from '@/container/confControl/GetHistoryConfList'
import GetHistoryConfInfo from '@/container/confControl/GetHistoryConfInfo'
import GetHistoryConfCtlRecord from '@/container/confControl/GetHistoryConfCtlRecord'
import GetHistoryConfAttendeeRecord from '@/container/confControl/GetHistoryConfAttendeeRecord'
import queryUserMessage from '@/container/userControl/queryUserMessage'
import ModUserMessage from '@/container/userControl/ModUserMessage'
import getVerifycode from '@/container/userControl/getVerifycode'
import checkVerifycode from '@/container/userControl/checkVerifycode'
import modCommunication from '@/container/userControl/modCommunication'
import { logout } from '@/utils/xhr'
import UserCreateConf from '@/container/confManage/UserCreateConf'
import CreateConfSuccess from '@/container/confManage/CreateConfSuccess'
import JoinReservedConf from '@/container/confManage/JoinReservedConf'
import MyConfs from '@/container/confManage/MyConfs'
import MyRecords from '@/container/confManage/MyRecords'
import setUserInfo from '@/container/userControl/setUserInfo'

const { SubMenu }= Menu;
const { Header, Content, Sider } = Layout;
class ConferenceSubLayout extends React.Component {
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
        openKeys: ['sub1'],
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
        //设置滚动条高度
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
                  <Sider width={270} style={{ background: '#fff',overflow: 'auto',height:this.state.deskHeight,position: 'fixed', zIndex: 1}}>
                    <Menu onClick={this.handleClick} defauselectedkeys={['1']} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{ width: 256 }}>
                      <Menu.Item key="0">首页</Menu.Item>
                      <SubMenu key="sub1" title={<span>场景适配</span>}>
                          <Menu.Item key="1"><NavLink to={`${match.path}/user/createConf`}>预约会议</NavLink></Menu.Item> 
                          <Menu.Item key="2"><NavLink to={`${match.path}/user/joinReservedConf`}>一键入会</NavLink></Menu.Item>
                          <Menu.Item key="3"><NavLink to={`${match.path}/user/conference`}>我的会议</NavLink></Menu.Item>
                          <Menu.Item key="4"><NavLink to={`${match.path}/user/records`}>我的录制</NavLink></Menu.Item>
                          <Menu.Item key="5"><NavLink to={`${match.path}/user/userInfo`}>个人信息</NavLink></Menu.Item>
                      </SubMenu>
                      <SubMenu key="sub2" title={<span>API调用</span>}>
                        <SubMenu key="sub2_1" title={<span>会议管理</span>}>
                            <Menu.Item key="1_1"><NavLink to={`${match.path}/createConf`}>预约会议</NavLink></Menu.Item>
                            <Menu.Item key="1_2"><NavLink to={`${match.path}/cancelConf`}>取消预约会议</NavLink></Menu.Item>
                            <Menu.Item key="1_3"><NavLink to={`${match.path}/modifyConf`}>修改预约会议</NavLink></Menu.Item>                           
                            <Menu.Item key="1_4"><NavLink to={`${match.path}/getConfList`}>查询会议列表</NavLink></Menu.Item>
                            <Menu.Item key="1_5"><NavLink to={`${match.path}/getConfInfo`}>查询会议信息</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2_2" title={<span>会议控制</span>}>
                            <Menu.Item key="2_1"><NavLink to={`${match.path}/conferences/confID/token`}>通过会议ID/密码登录会议控制</NavLink></Menu.Item>
                            <Menu.Item key="2_2"><NavLink to={`${match.path}/conferences/confID/forParticipant`}>查询在会会场信息</NavLink></Menu.Item>
                            <Menu.Item key="2_3"><NavLink to={`${match.path}/InviteParticipants`}>邀请与会者</NavLink></Menu.Item>
                            <Menu.Item key="2_4"><NavLink to={`${match.path}/participants/status`}>与会者离开会议</NavLink></Menu.Item>
                            <Menu.Item key="2_5"><NavLink to={`${match.path}/participants/phoneNum`}>删除与会者</NavLink></Menu.Item>
                            <Menu.Item key="2_6"><NavLink to={`${match.path}/participants/mute`}>静音/取消静音</NavLink></Menu.Item>
                            <Menu.Item key="2_7"><NavLink to={`${match.path}/endConf`}>结束会议</NavLink></Menu.Item>
                            <Menu.Item key="2_8"><NavLink to={`${match.path}/conferences/setMultiPicture`}>设置多画面</NavLink></Menu.Item>
                            <Menu.Item key="2_9"><NavLink to={`${match.path}/conferences/switchMode`}>切换会议显示策略</NavLink></Menu.Item>
                            <Menu.Item key="2_10"><NavLink to={`${match.path}/participants/role`}>申请或释放主席</NavLink></Menu.Item>
                            <Menu.Item key="2_11"><NavLink to={`${match.path}/conferences/mute`}>全场静音或取消全场静音</NavLink></Menu.Item>
                            <Menu.Item key="2_12"><NavLink to={`${match.path}/conferences/lock`}>锁定或解锁会议</NavLink></Menu.Item>
                            <Menu.Item key="2_13"><NavLink to={`${match.path}/conferences/delRecordFile`}>根据会议UUID删除录制文件</NavLink></Menu.Item>
                            <Menu.Item key="2_14"><NavLink to={`${match.path}/conferences/deleteRecordfiles`}>批量删除录制文件</NavLink></Menu.Item>
                            <Menu.Item key="2_15"><NavLink to={`${match.path}/conferences/isRollcalled`}>点名会场</NavLink></Menu.Item>
                            <Menu.Item key="2_16"><NavLink to={`${match.path}/renameSite`}>重命名会场</NavLink></Menu.Item>
                            <Menu.Item key="2_17"><NavLink to={`${match.path}/broadcast`}>广播会场</NavLink></Menu.Item>
                            <Menu.Item key="2_18"><NavLink to={`${match.path}/setRecord`}>启动/停止会议录制</NavLink></Menu.Item>
                            <Menu.Item key="2_19"><NavLink to={`${match.path}/getRecordFiles`}>查询录播文件列表</NavLink></Menu.Item>
                            <Menu.Item key="2_20"><NavLink to={`${match.path}/getRecordFile`}>查询录播文件</NavLink></Menu.Item>
                            <Menu.Item key="2_21"><NavLink to={`${match.path}/historyConferencesList`}>查询历史会议列表</NavLink></Menu.Item>
                            <Menu.Item key="2_22"><NavLink to={`${match.path}/historyConferencesInfo`}>查询历史会议信息</NavLink></Menu.Item>
                            <Menu.Item key="2_23"><NavLink to={`${match.path}/historyConferences/hisConfCtlRecord`}>查询历史会议的会控记录信息</NavLink></Menu.Item>
                            <Menu.Item key="2_24"><NavLink to={`${match.path}/historyConferences/hisConfAttendeeRecord`}>查询历史会议的与会者记录信息</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2_3" title={<span>企业用户</span>}>
                            <Menu.Item key="2_3_1"><NavLink to={`${match.path}/queryUserMessage`}>用户查询自己的信息</NavLink></Menu.Item>
                            <Menu.Item key="2_3_2"><NavLink to={`${match.path}/ModUserMessage`}>用户修改自己的信息</NavLink></Menu.Item>
                            <Menu.Item key="2_3_3"><NavLink to={`${match.path}/getVerifycode`}>获取验证码</NavLink></Menu.Item>                           
                            <Menu.Item key="2_3_4"><NavLink to={`${match.path}/checkVerifycode`}>校验手机和邮箱对应的验证码</NavLink></Menu.Item>
                            <Menu.Item key="2_3_5"><NavLink to={`${match.path}/modCommunication`}>修改手机或邮箱</NavLink></Menu.Item>
                        </SubMenu>
                      </SubMenu> 
                  </Menu>
                </Sider>
                <Content style={{ padding: '0 50px',marginLeft:220,zIndex: 0}}>
                  <Switch>
                    <Route path={`${match.path}/createConf`} exact component={CreateConf} />
                    <Route path={`${match.path}/cancelConf`} component={CancelConf} />
                    <Route path={`${match.path}/modifyConf`} component={ModifyConf} />
                    <Route path={`${match.path}/conferences/confID/token`} component={GetConfToken}/>
                    <Route path={`${match.path}/conferences/confID/forParticipant`} component={ForParticipant} />
                    <Route path={`${match.path}/getConfList`} component={GetConfList} />
                    <Route path={`${match.path}/participants/status`} component={ParticipantsStatus} />
                    <Route path={`${match.path}/participants/phoneNum`} component={ParticipantsPhoneNum} />
                    <Route path={`${match.path}/InviteParticipants`} component={InviteParticipants} />
                    <Route path={`${match.path}/participants/mute`} component={participantsMute} />
                    <Route path={`${match.path}/endConf`} component={endConf} />
                    <Route path={`${match.path}/conferences/setMultiPicture`} component={setMultiPicture} />
                    <Route path={`${match.path}/conferences/switchMode`} component={switchMode} />
                    <Route path={`${match.path}/participants/role`} component={ParticipantsRole} />
                    <Route path={`${match.path}/conferences/mute`} component={ConferencesMute} />
                    <Route path={`${match.path}/conferences/lock`} component={ConferencesLock} />
                    <Route path={`${match.path}/conferences/delRecordFile`} component={delRecordFile} />
                    <Route path={`${match.path}/conferences/deleteRecordfiles`} component={deleteRecordfiles} />
                    <Route path={`${match.path}/conferences/isRollcalled`} component={isRollcalled} />
                    <Route path={`${match.path}/getConfInfo`} component={GetConfInfo} />
                    <Route path={`${match.path}/renameSite`} component={RenameSite} />
                    <Route path={`${match.path}/broadcast`} component={Broadcast} />
                    <Route path={`${match.path}/setRecord`} component={SetRecord} />
                    <Route path={`${match.path}/getRecordFiles`} component={GetRecordFiles} />
                    <Route path={`${match.path}/getRecordFile`} component={GetRecordFile} />
                    <Route path={`${match.path}/historyConferencesList`} component={GetHistoryConfList} />
                    <Route path={`${match.path}/historyConferencesInfo`} component={GetHistoryConfInfo} />
                    <Route path={`${match.path}/historyConferences/hisConfCtlRecord`} component={GetHistoryConfCtlRecord} />
                    <Route path={`${match.path}/historyConferences/hisConfAttendeeRecord`} component={GetHistoryConfAttendeeRecord} />
                    <Route path={`${match.path}/queryUserMessage`} component={queryUserMessage} />
                    <Route path={`${match.path}/ModUserMessage`} component={ModUserMessage} />
                    <Route path={`${match.path}/getVerifycode`} component={getVerifycode} />
                    <Route path={`${match.path}/checkVerifycode`} component={checkVerifycode} />
                    <Route path={`${match.path}/modCommunication`} component={modCommunication} />
                    <Route path={`${match.path}/user/createConf`} exact component={UserCreateConf}/>
                    <Route path={`${match.path}/user/joinReservedConf`} component={JoinReservedConf}/>
                    <Route path={`${match.path}/user/conference`} component={MyConfs}/>
                    <Route path={`${match.path}/user/records`} component={MyRecords}/>
                    <Route path={`${match.path}/user/userInfo`} component={setUserInfo}/>
                    <Route path={`${match.path}/user/createConf/:confID`} component={CreateConfSuccess}/>
                  </Switch>
                </Content>
              </Layout>              
          </Layout>             
    </div>
    ); 
  }
}

export default ConferenceSubLayout