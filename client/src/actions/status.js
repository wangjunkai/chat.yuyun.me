/**
 * Created by wangjunkai on 2017/7/14.
 */

//创建消息状态
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

//提示消息状态
export const NEWS_OK = 'NEWS_OK';
export const NEWS_LOAD = 'NEWS_LOAD';
export const NEWS_ERROR = 'NEWS_ERROR';

//创建modal的状态
export const CREATE_MODAL = 'CREATE_MODAL';
export const CLEAR_MODAL = 'CLEAR_MODAL';

//窗口切换状态
export const ACTIVE_WINDOW = 'ACTIVE_WINDOW';
export const chat_info = 'chat_info';
export const friends_info = 'friends_info';
export const ACTIVE_CHAT = 'ACTIVE_CHAT';
export const ACTIVE_FRIEND = 'ACTIVE_FRIEND';


export const API = 'api';
export const initState = {
  type: '',
  show: false,
  delay: '',
  class: NEWS_LOAD,
  date: '',
  message: ''
};
export const initModalData = {
  type: '',
  show: false,
  dom: () => {
    return null
  },
  class: ''
};
export const initWindowData = {
  type: '',
  windowType: chat_info,
  chatId:'',
  friendId:'',
  url: '',
  method: 'GET',
  [API]: true,
};
export const createMessage = messageData => ({
  type: CREATE_MESSAGE,
  date: new Date().getTime(),
  ...messageData
});
export const clearMessage = () => ({
  type: CLEAR_MESSAGE
});

export const createModal = modalData => ({
  type: CREATE_MODAL,
  ...modalData
});
export const clearModal = () => ({
  type: CLEAR_MODAL
});

export const activeWindow = windowData => ({
  type: ACTIVE_WINDOW,
  ...windowData
});
export const activeChat = chatData => ({
  type: ACTIVE_CHAT,
  ...chatData
});
export const activeFriend = friendData => ({
  type: ACTIVE_FRIEND,
  ...friendData
});