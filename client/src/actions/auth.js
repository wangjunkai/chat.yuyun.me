/**
 * Created by wangjunkai on 2017/7/14.
 */

import * as status from './status'

export const INITAUTH = 'initAuth';
export const TOURISTS = 'tourists';//游客登陆
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'register';

export const initUser = {
  [status.API]: true,
  url: '',
  method: 'POST',
  body: {
    name: '',
    mail: '',
    password: ''
  },
  type: '',
  actions: []
};
export const initAuth = login => ({type: INITAUTH, login});

export const login = (data) => {
  const user = Object.assign({}, initUser,data);
  user.url = 'login';
  user.type = LOGIN;
  return user;
};