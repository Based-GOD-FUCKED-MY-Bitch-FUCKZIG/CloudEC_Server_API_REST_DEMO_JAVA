/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
const initialState = {
    pending: true,
    logged: false
  }
  
  const loggedUserReducer = (state = initialState, action) => {
    
    if (action.type === 'GET_LOGGED_USER') {
      console.log('reducer log station:'+action.logged)
      return Object.assign({}, state, {
        pending: false,
        logged: action.logged
      })
    }
    
    if (action.type === 'SET_LOGGED_USER') {
      return Object.assign({}, state, {
        pending: false,
        logged: action.logged
      })
    }
    
    return state
  }
  
  export default loggedUserReducer