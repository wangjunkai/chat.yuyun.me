/**
 * Created by wangjunkai on 2017/7/14.
 */

//窗口切换状态
export const ACTIVE_CONTENT = 'ACTIVE_CONTENT';
export const CHAT = 'chatList';
export const FRIENDS = 'friendList';
export const NEWS = 'newList';
export const ACTIVE_CHAT = 'ACTIVE_CHAT';
export const ACTIVE_FRIEND = 'ACTIVE_FRIEND';
export const ACTIVE_NEW = 'ACTIVE_NEW';


export const initContentData = {
  type: ACTIVE_CHAT,
  [ACTIVE_CHAT]: [],
  [ACTIVE_FRIEND]: [],
  [ACTIVE_NEW]: [],
  activeChat: '',
  activeFriend: '',
};


//活动窗口
export const activeContent = param => {
  return {
    ...param
  };
};
export const activeChat = param => {
  return {
    type: ACTIVE_CHAT,
    ...param
  };
};
export const activeNew = param => {
  return {
    type: ACTIVE_NEW,
    ...param
  };
};
export const activeFriend = param => {
  return {
    type: ACTIVE_FRIEND,
    ...param
  };
};