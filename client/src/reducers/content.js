/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  ACTIVE_NEW, ACTIVE_CHAT, ACTIVE_FRIEND, initContentData,
} from '../actions/content'

export default function content(preState = initContentData, action) {
  let newState, list;
  newState = Object.assign({}, preState, {type: action.type});
  switch (action.type) {
    case ACTIVE_NEW:
      list = [
        {id: '1', time: '10:22', name: 'wjk', message: '123'},
        {id: '2', time: '10:22', name: 'sdfsdsf', message: '历史课角度来看时间到了分解落实'},
        {id: '3', time: '10:22', name: 'sdfxc', message: '历史课角度来看时间到了分解落实'},
        {id: '4', time: '10:22', name: 'sdfxcasaaaa', message: '历史课角度来看时间到了分解落实'}
      ];
      newState[action.type] = list;
      return newState;
    case ACTIVE_CHAT:
      list = [
        {id: '1', time: '10:22', name: 'wjk', message: 'fdfg'},
        {id: '2', time: '10:22', name: 'sdfsdsf', message: '121212'},
      ];
      newState[action.type] = list;
      return newState;
    case ACTIVE_FRIEND:
      list = [
        {id: '1', time: '10:22', name: 'wjk', message: 'fdfg'},
        {id: '2', time: '10:22', name: 'sdfsdsf', message: '121212'},
        {id: '3', time: '10:22', name: 'sdfxc', message: 'asaaaa'},
      ];
      newState[action.type] = list;
      return newState;
    default:
      return preState
  }
}