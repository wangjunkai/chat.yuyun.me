/**
 * Created by wangjunkai on 2017/7/14.
 */

import * as status from './status'
import _ from 'lodash'

export const INITAUTH = 'initAuth';
export const TOURISTS = 'tourists';//游客登陆
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'register';

export const storageId = 'chat.yuyun.me.auth';
export const initUser = {
  [status.API]: true,
  isLogin: false,
  isAutoLogin: false,
  url: '',
  method: 'POST',
  body: {
    name: '',
    mail: '',
    password: ''
  },
  type: '',
  actions: [],
  response: {
    status: false,
    json: {},
    message: ''
  }
};
export const initAuth = login => ({type: INITAUTH});
export const tourists = (data) => {
  const user = _.assign({}, initUser, data);
  user.url = 'tourists';
  user.type = TOURISTS;
  return user;
};
export const login = (data) => {
  const user = _.assign({}, initUser, data);
  user.url = 'login';
  user.type = LOGIN;
  return user;
};
export const logout = () => ({
  type: LOGOUT
});