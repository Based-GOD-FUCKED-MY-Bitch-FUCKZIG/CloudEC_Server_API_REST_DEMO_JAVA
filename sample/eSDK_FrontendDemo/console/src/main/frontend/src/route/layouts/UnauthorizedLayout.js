/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from '@/container/pages/LoginPage'
import forgetLayout from '@/route/layouts/ForgetLayout'

const UnauthorizedLayout = () => (
  <div className="unauthorized-layout">
    <Switch>
      <Route path="/auth/login" exact component={LoginPage} />
      <Route path="/auth/forget" component={forgetLayout} />
      <Redirect to="/auth/login" />
    </Switch>
  </div>
)

export default UnauthorizedLayout