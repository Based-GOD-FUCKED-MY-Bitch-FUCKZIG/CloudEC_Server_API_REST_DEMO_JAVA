/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import { createStore, combineReducers } from 'redux'
import loggedUserReducer from '@/reducers/loggedUserReducer'

const reducers = combineReducers({
  loggedUserState: loggedUserReducer,
})

const store = createStore(reducers)

export default store