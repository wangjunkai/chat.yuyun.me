/**
 * Created by wangjunkai on 2017/7/14.
 */
import {createMessage} from './message'
import {NEWS_LOAD} from './index'

export const INITAUTH = 'initAuth';
export const TOURISTS = 'tourists';//游客登陆
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'register';


export const initUser = {
  type: '',
  isLogin: false,
  isAutoLogin: false,
  name: '',
  email: '',
  password: ''
};
export const initAuth = login => ({type: INITAUTH});
export const tourists = (user) => {
  return {
    type: TOURISTS,
    promise: (socket) => socket.emit('login', user)
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