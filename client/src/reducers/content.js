/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  ACTIVE_CONTENT, ACTIVE_CHAT, ACTIVE_FRIEND, CHAT, initContentData,
} from '../actions/content'

export default function content(preState = initContentData, action) {
  let newState;
  switch (action.type) {
    case ACTIVE_CONTENT:
      if (action.contentType === CHAT) {
        const list = [
          {id: '1', time: '10:22', name: 'wjk', message: 'fdfg'},
          {id: '2', time: '10:22', name: 'sdfsdsf', message: '121212'},
          {id: '3', time: '10:22', name: 'sdfxc', message: 'asaaaa'},
        ]
        action.chatList = list;
        action.friendList = preState.friendList
      } else {
        action.friendList = [
          {id: '1', time: '10:22', name: 'wjk', message: '123'},
          {id: '2', time: '10:22', name: 'sdfsdsf', message: '历史课角度来看时间到了分解落实'},
          {id: '3', time: '10:22', name: 'sdfxc', message: '历史课角度来看时间到了分解落实'},
          {id: '4', time: '10:22', name: 'sdfxcasaaaa', message: '历史课角度来看时间到了分解落实'}
        ]
        action.chatList =  preState.chatList;
      }
      newState = Object.assign({}, preState, {
        chatList: action.chatList,
        friendList: action.friendList,
        contentType:action.contentType
      });
      return newState;
    case ACTIVE_CHAT:
      preState[CHAT].map((c) => {
        if (c.id === action.activeChat) {
          return c.comments = {}
        }
        return false;
      });
      newState = Object.assign({}, preState, {activeChat: action.activeChat});
      return newState;
    case ACTIVE_FRIEND:
    default:
      return preState
  }
}