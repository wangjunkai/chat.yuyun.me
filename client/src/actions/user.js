/**
 * Created by wangjunkai on 2017/7/14.
 */
import * as messageAction from './message'
import * as contentAction from './content'
import * as constant from './index'


export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';
export const ADD_FRIENDS = 'ADD_FRIENDS';
export const ASK_FRIENDS = 'ASK_FRIENDS';
export const REMOVE_FRIENDS = 'REMOVE_FRIENDS'


//初始化搜索好友信息
export const initSearchFriendsData = {
  list: [],
  value: '',
  type: ''
};

//搜索好友
export const searchFriends = (modalData) => (dispatch, getState) => {
  const state = getState()
  modalData._id = state.auth._id
  dispatch({
    type: SEARCH_FRIENDS,
    promise: {
      sock: (socket) => socket.emit('searchFriends', modalData),
      after: (dispatch, {_result}) => {
        dispatch(contentAction.activeNew({list: _result.list}));
        dispatch(messageAction.clearMessage())
      }
    }
  })
};

//请求好友
export const askFriends = (modalData) => (dispatch, getState) => {
  const state = getState()
  modalData._sign = state.auth._id
  dispatch({
    type: ASK_FRIENDS,
    promise: {
      sock: (socket) => socket.emit('askFriends', modalData),
      after: (dispatch) => {
        dispatch(messageAction.createMessage({message: '添加好友请求已发送!', class: constant.NEWS_OK, delay: 2000}))
      }
    }
  })
}
//请求好友
export const addFriends = (modalData) => (dispatch, getState) => {
  const state = getState()
  modalData._sign = state.auth._id
  dispatch({
    type: ADD_FRIENDS,
    promise: {
      sock: (socket) => socket.emit('addFriends', modalData),
      after: (dispatch, {_result}) => {
        dispatch(contentAction.activeContent({type: contentAction.ACTIVE_FRIEND, ..._result}));
        dispatch(messageAction.createMessage({message: '添加成功!', class: constant.NEWS_OK, delay: 2000}))
      }
    }
  })
}
//请求好友
export const removeFriends = (modalData) => (dispatch, getState) => {
  const state = getState()
  modalData._sign = state.auth._id
  dispatch({
    type: REMOVE_FRIENDS,
    promise: {
      sock: (socket) => socket.emit('removeFriends', modalData),
      after: (dispatch, {_result}) => {
        dispatch(contentAction.activeContent({type: contentAction.ACTIVE_FRIEND, ..._result}));
      }
    }
  })
}