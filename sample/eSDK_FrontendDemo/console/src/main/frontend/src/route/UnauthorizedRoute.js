/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedUser } from '@/utils/xhr'

class UnauthorizedRoute extends React.Component {

  componentWillMount() {
    getLoggedUser();
  }

  render() {
    const { component: Component, pending, logged, adminType, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {       
        if (pending) return <div>Loading...</div>
        console.log('whether is UnauthorizedRoute logged:'+logged);
        if(logged && (adminType === "0")){
            return <Redirect to="/admin"/>;
        }else if(logged && (adminType === "1")){
            return <Redirect to="/generaladmin"/>;
        }
        else if(logged && (adminType === "2")){
            return <Redirect to="/app"/>;
        }else if(logged && (adminType === "3")){
          return <Redirect to="/spadmin"/>;
        }else{
            return <Component {...props} />
        }
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged,
  adminType: loggedUserState.adminType,
})

export default connect(stateToProps)(UnauthorizedRoute)
