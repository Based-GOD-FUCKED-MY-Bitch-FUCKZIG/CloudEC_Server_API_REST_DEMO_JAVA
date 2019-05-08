/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import store from '@/stores/store'

export const getLoggedUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'GET_LOGGED_USER',
        logged: sessionStorage.getItem('access_token'),
      })
    resolve()
    }, 500)
  })
}

export const login = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: sessionStorage.getItem('access_token'),
      })
      resolve()
    }, 500)
  })
}

export const logout = () => {
  sessionStorage.removeItem('access_token');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: false
      })
      resolve()
    }, 500)
  })
}