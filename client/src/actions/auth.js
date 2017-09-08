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
  isLogin: false,
  isAutoLogin: false
};
export const initAuth = login => ({type: INITAUTH});
export const tourists = (data) => {
  const REQUEST = _.assign({}, initUser, data.REQUEST);
  data.REQUEST = REQUEST;
  data.type = TOURISTS;
  return data;
};
export const login = (data) => {
  const user = _.assign({}, initUser, data);
  user.type = LOGIN;
  return user;
};
export const logout = () => ({
  type: LOGOUT
});