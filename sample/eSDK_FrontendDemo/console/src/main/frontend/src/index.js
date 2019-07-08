/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {HashRouter, Switch, Redirect } from 'react-router-dom'
import AuthorizedDefaultAdminRoute from '@/route/AuthorizedDefaultAdminRoute'
import AuthorizedUserRoute from '@/route/AuthorizedUserRoute'
import AuthorizedGeneralAdminRoute from '@/route/AuthorizedGeneralAdminRoute'
import AuthorizedSpAdminRoute from '@/route/AuthorizedSpAdminRoute'
import store from '@/stores/store'
import UnauthorizedLayout from '@/route/layouts/UnauthorizedLayout'
import ConferenceSubLayout from '@/route/layouts/ConferenceSubLayout'
import AdminSubLayout from '@/route/layouts/AdminSubLayout'
import UnauthorizedRoute from '@/route/UnauthorizedRoute'
import ConfContrl from '@/container/confManage/confContrl'
import GeneralAdminSubLayout from '@/route/layouts/GeneralAdminSubLayout'
import SpAdminSubLayout from '@/route/layouts/SpAdminSubLayout'

const App = props => (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Switch>
            <UnauthorizedRoute path="/auth" component={UnauthorizedLayout} />
            <Route path="/user/confContrl/:confID" component={ConfContrl}/>
            <AuthorizedUserRoute path="/app" component={ConferenceSubLayout} />
            <AuthorizedDefaultAdminRoute path="/admin" component={AdminSubLayout}/>
            <AuthorizedGeneralAdminRoute path="/generaladmin" component={GeneralAdminSubLayout}/>
            <AuthorizedSpAdminRoute path="/spadmin" component={SpAdminSubLayout}/>                        
            <Redirect to="/auth" />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  )
  
  ReactDOM.render(<App />, document.getElementById('root'))