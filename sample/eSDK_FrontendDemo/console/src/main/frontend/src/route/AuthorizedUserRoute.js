/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedUser } from '@/utils/xhr'

class AuthorizedUserRoute extends React.Component {

  componentWillMount() {
    getLoggedUser();
  }

  render() {
    const { component: Component, pending, logged, adminType, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {       
        if (pending) return <div>Loading...</div>
        console.log('whether is AuthorizedUserRoute logged:'+logged);
        return logged && (adminType === "2")
          ? <Component {...props} />
          : <Redirect to="/auth/login" />
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged,
  adminType: loggedUserState.adminType,
})

export default connect(stateToProps)(AuthorizedUserRoute)
