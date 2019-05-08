/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedUser } from '@/utils/xhr'

class AuthorizedRoute extends React.Component {

  componentWillMount() {
    console.log("componentWillMount,start get logged user");
    getLoggedUser();
  }

  render() {
    const { component: Component, pending, logged, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {       
        if (pending) return <div>Loading...</div>
        console.log('whether is logged:'+logged);
        return logged
          ? <Component {...props} />
          : <Redirect to="/auth/login" />
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged
})

export default connect(stateToProps)(AuthorizedRoute)
