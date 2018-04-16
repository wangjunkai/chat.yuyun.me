/**
 * Created by wangjunkai on 2017/7/14.
 */

//窗口切换状态
export const ACTIVE_CONTENT = 'ACTIVE_CONTENT';
export const ACTIVE_CHAT = 'ACTIVE_CHAT';
export const ACTIVE_FRIEND = 'ACTIVE_FRIEND';
export const ACTIVE_NEW = 'ACTIVE_NEW';
export const SET_SEARCH_ACTIVE = 'SET_SEARCH_ACTIVE'


export const initContentData = {
  type: ACTIVE_CHAT,
  [ACTIVE_CHAT]: {
    active: '',
    list: []
  },
  [ACTIVE_FRIEND]: {
    active: '',
    list: []
  },
  [ACTIVE_NEW]: {
    active: '',
    list: []
  }
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
export const activeFriend = (modalData) => (dispatch, getState) => {
  const state = getState()
  dispatch({
    type: ACTIVE_FRIEND,
    promise: {
      sock: (socket) => socket.emit('getShip', state.auth._id)
    }
  })
}

export const setSearchFriendsActive = (modalData) => (dispatch, getState) => {
  const state = getState()
  modalData._sign = state.auth._id
  dispatch({
    type: SET_SEARCH_ACTIVE,
    promise: {
      sock: (socket) => socket.emit('getShip_OneById', modalData)
    }
  })
}