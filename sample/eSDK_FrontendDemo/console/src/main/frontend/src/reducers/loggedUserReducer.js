/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
const initialState = {
    pending: true,
    logged: false,
}
  
const loggedUserReducer = (state = initialState, action) => {
    
    if (action.type === 'GET_LOGGED_USER') {
      return Object.assign({}, state, {
        pending: false,
        logged: action.logged,
        adminType: action.adminType,
      })
    }
    
    if (action.type === 'SET_LOGGED_USER') {
      return Object.assign({}, state, {
        pending: false,
        logged: action.logged,
        adminType: action.adminType,
      })
    }
    
    return state
  }
  
  export default loggedUserReducer