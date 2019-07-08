/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
const initialState = {
    pending: true,
    success: false
  }
  
  const forgetReducer = (state = initialState, action) => {
    
    if (action.type === 'SET_USER_FORGET') {
      return Object.assign({}, state, {
        pending: false,
        success: action.success
      })
    }
    
    return state
  }
  
  export default forgetReducer