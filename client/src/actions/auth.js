/**
 *
 * Created by wangjunkai on 2017/7/14.
 */
import React from 'react'
import ReactDOM, {render} from 'react-dom'
import Root from '../root'

import * as messageAction from './message'
import * as modalAction from './modal'
import * as contentAction from './content'
import * as userAction from './user'

import * as constant from './index'

export const INITAUTH = 'initAuth';
export const TOURISTS = 'tourists';//游客登陆
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'register';


export const initUser = {
  _id: '',
  type: '',
  isLogin: false,
  isAutoLogin: false,
  name: '',
  email: '',
  password: ''
};
export const initAuth = (user) => {
  if (!user) {
    return {type: INITAUTH}
  } else {
    return {
      type: INITAUTH,
      promise: {
        sock: (socket) => socket.emit('initAuth', user)
      }
    }
  }
};

export const tourists = (user) => ({
  type: TOURISTS,
  promise: (socket) => socket.emit('login', user)
});
export const login = (user) => ({
  type: LOGIN,
  promise: {
    sock: (socket) => socket.emit('login', user)
  }
});
export const register = (user) => ({
  type: REGISTER,
  promise: {
    sock: (socket) => socket.emit('register', user),
    after: (dispatch) => {
      dispatch(messageAction.createMessage({message: '注册成功!', class: constant.NEWS_OK, delay: 2000}))
    }
  }
});
export const logout = () => ({
  type: LOGOUT,
  promise: {
    sock: (socket) => socket.emit('logout'),
    after: (dispatch) => {
      ReactDOM.unmountComponentAtNode(document.getElementsByClassName('root')[0]);
      setTimeout(() => {
        window.location.reload()
      }, 0)
    }
  }
});