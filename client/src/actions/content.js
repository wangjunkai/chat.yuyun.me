/**
 * Created by wangjunkai on 2017/7/14.
 */

//窗口切换状态
export const ACTIVE_WINDOW = 'ACTIVE_WINDOW';
export const CHAT = 'CHAT';
export const FRIENDS = 'FRIENDS';
export const ACTIVE_CHAT = 'ACTIVE_CHAT';
export const ACTIVE_FRIEND = 'ACTIVE_FRIEND';


export const initContentData = {
  type: '',
  contentType: CHAT,
  chatList: [],
  friendList: [],
  activeChat: {},
  activeFriend: {},
};


//活动窗口
export const activeContent = contentData => {
  const w = Object.assign({}, initContentData, contentData);
  w.type = ACTIVE_WINDOW;
  return w;
};
export const activeChat = chatData => {
  const w = Object.assign({}, initContentData, chatData);
  w.type = ACTIVE_CHAT;
  return w;
};
export const activeFriend = friendData => {
  const w = Object.assign({}, initContentData, friendData);
  w.type = ACTIVE_FRIEND;
  return w;
};