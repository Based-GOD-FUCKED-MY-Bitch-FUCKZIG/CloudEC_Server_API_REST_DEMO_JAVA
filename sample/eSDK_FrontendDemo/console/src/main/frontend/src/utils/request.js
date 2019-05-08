/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import {logout} from '@/utils/xhr'
import history from '@/component/custom/CustomHistory'
import { message } from 'antd';
import axios from 'axios'

export default function request (method, url, body, headers, params) {
    method = method.toUpperCase();
    if (method === 'GET' || method === 'DELETE') {
      body = undefined;
    } else {
      body = body && JSON.stringify(body);
    }

    return axios({
      method: method,
      baseURL: 'https://localhost:8443/',
      url: url,
      headers: headers,
      data: body,
      params: {params}
    })
    .then((res) => {
      console.log('response from server:'+res);
      const token = res.headers['access-token'];
      if (token) {
        const tokenAndUsername = token + '|' + body.userName;
        sessionStorage.setItem('access_token', tokenAndUsername);
        console.log('token is: '+ tokenAndUsername); 
      }
      return res.data; 
    })
    .catch((error) => {
      console.log('response from server:' + error);
      if(error.response === undefined || error.response === null){
        message.info(`连接出错!`)
        return Promise.reject('Request Incorect.');
      }else if(error.response.status === 401){
        console.log('401 push login url');
        message.info("token 失效，请重新登录！")
        logout().then(
          () => {history.push('/auth');}
        );                
        return Promise.reject('Unauthorized.');
      }else if(error.response.status === 500){
        message.info("失去链接！") 
        return Promise.reject('Server Error.');
      }else if(error.response.status === 404){
        message.info("URL非法！")
        return Promise.reject('URL Incorect.'); 
      }else if(error.response.status === 400){
        message.info("Bad Request！")
        return Promise.reject('Request Incorect.');
      }else{
        message.info(`连接出错 (${error.response.status})!`)
        return Promise.reject('Request Incorect.');
      }
    })
}

export const get = (url, headers,params)=> request('GET', url, undefined, headers,params);
export const post = (url, body, headers) => request('POST', url, body, headers, undefined);
export const put = (url, body, headers) => request('PUT', url, body, headers, undefined);
export const del = (url,headers) => request('DELETE', url, undefined, headers);