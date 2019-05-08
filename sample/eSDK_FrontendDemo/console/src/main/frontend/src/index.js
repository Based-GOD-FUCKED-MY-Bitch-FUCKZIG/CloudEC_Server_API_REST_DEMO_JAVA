/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import AuthorizedRoute from '@/route/AuthorizedRoute'
import store from '@/stores/store'
import UnauthorizedLayout from '@/route/layouts/UnauthorizedLayout'
import ConferenceSubLayout from '@/route/layouts/ConferenceSubLayout'

const App = props => (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Switch>
            <Route path="/auth" component={UnauthorizedLayout} />
            <AuthorizedRoute path="/app" component={ConferenceSubLayout} />
            <Redirect to="/auth" />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  )
  
  ReactDOM.render(<App />, document.getElementById('root'))