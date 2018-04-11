/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  ACTIVE_NEW, ACTIVE_CHAT, ACTIVE_FRIEND, initContentData, SET_ACTIVE
} from '../actions/content'

export default function content(preState = initContentData, action) {
  let newState, list;
  switch (action.type) {
    case ACTIVE_NEW:
      newState = Object.assign({}, preState, {type: action.type});
      return newState;
    case ACTIVE_CHAT:
      newState = Object.assign({}, preState, {type: action.type});
      list = [
        {_id: '1', time: '10:22', name: 'wjk', message: 'fdfg'},
        {_id: '2', time: '10:22', name: 'sdfsdsf', message: '121212'},
      ];
      newState[action.type].list = list;
      return newState;
    case SET_ACTIVE:
      newState = Object.assign({}, preState);
      newState[preState.type].active = action.active;
      return newState;
    case ACTIVE_FRIEND:
      newState = Object.assign({}, preState, {type: action.type});
      list = [
        {_id: '1', time: '10:22', name: 'wjk', message: '123'},
        {_id: '2', time: '10:22', name: 'sdfsdsf', message: '历史课角度来看时间到了分解落实'},
        {_id: '3', time: '10:22', name: 'sdfxc', message: '历史课角度来看时间到了分解落实'},
        {_id: '4', time: '10:22', name: 'sdfxcasaaaa', message: '历史课角度来看时间到了分解落实'}
      ];
      newState[action.type].list = list;
      return newState;
    default:
      return preState
  }
}