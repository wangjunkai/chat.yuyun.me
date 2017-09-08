/**
 * Created by wangjunkai on 2017/7/14.
 */

import {NEWS_LOAD} from './index'
//创建消息状态
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const initState = {
  type: '',
  show: false,
  delay: '',
  class: NEWS_LOAD,
  date: '',
  message: ''
};

//消息提示框
export const createMessage = messageData => ({
  type: CREATE_MESSAGE,
  date: new Date().getTime(),
  ...messageData
});
export const clearMessage = () => ({
  type: CLEAR_MESSAGE
});
