/**
 * Created by wangjunkai on 2017/7/14.
 */

import {API} from './ajax'
import _ from 'lodash'

export const INITAUTH = 'initAuth';
export const TOURISTS = 'tourists';//游客登陆
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'register';


export const initUser = {
  type: '',
  isLogin: false,
  isAutoLogin: false,
  info: {
    name: '',
    email: '',
    password: ''
  }
};
export const initAuth = login => ({type: INITAUTH});
export const tourists = (param) => {
  return {
    type: TOURISTS,
    ...param
  };
};
export const login = (param) => {
  return {
    type: LOGIN,
    ...param
  };
};
export const logout = () => ({
  type: LOGOUT
});