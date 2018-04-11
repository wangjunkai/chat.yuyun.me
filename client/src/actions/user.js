/**
 * Created by wangjunkai on 2017/7/14.
 */
import * as messageAction from './message'

export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';

//初始化搜索好友信息
export const initSearchFriendsData = {
  list: [],
  value:'',
  type:''
};

//搜索好友
export const searchFriends = (modalData) => (dispatch, getState) => {
  const state = getState()
  modalData._id = state.auth._id
  dispatch({
    type: SEARCH_FRIENDS,
    promise: {
      sock: (socket) => socket.emit('addFriends', modalData),
      after: (dispatch) => {
        dispatch(messageAction.clearMessage())
      }
    }
  })
};

