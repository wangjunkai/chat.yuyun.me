/**
 * Created by wangjunkai on 2017/7/14.
 */

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const NEWS_OK = 'NEWS_OK';
export const NEWS_LOAD = 'NEWS_LOAD';
export const NEWS_ERROR = 'NEWS_ERROR';

export const API = 'api';
export const initState = {
  type: '',
  show: false,
  delay: '',
  class: NEWS_LOAD,
  date:'',
  message: ''
};
export const createMessage = messageData => ({
  type: CREATE_MESSAGE,
  date: new Date().getTime(),
  ...messageData
});
export const clearMessage = () => ({
  type: CLEAR_MESSAGE
});