/**
 * Created by wangjunkai on 2017/7/14.
 */

//窗口切换状态
export const ACTIVE_CONTENT = 'ACTIVE_CONTENT';
export const CHAT = 'chatList';
export const FRIENDS = 'friendList';
export const ACTIVE_CHAT = 'ACTIVE_CHAT';
export const ACTIVE_FRIEND = 'ACTIVE_FRIEND';


export const initContentData = {
  type: '',
  contentType: CHAT,
  [CHAT]: {},
  [FRIENDS]: {},
  activeChat: '',
  activeFriend: '',
};


//活动窗口
export const activeContent = param => {
  return {
    type: ACTIVE_CONTENT,
    ...param
  };
};
export const activeChat = param => {
  return {
    type: ACTIVE_CHAT,
    ...param
  };
};
export const activeFriend = friendData => {
  const w = Object.assign({}, initContentData, friendData);
  w.type = ACTIVE_FRIEND;
  return w;
};