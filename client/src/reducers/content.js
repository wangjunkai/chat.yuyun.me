/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  ACTIVE_NEW, ACTIVE_CHAT, ACTIVE_FRIEND, initContentData, SET_SEARCH_ACTIVE
} from '../actions/content'

export default function content(preState = initContentData, action) {
  let newState, list = [];
  let _type = action.type
  let _action = action['_result'] === undefined ? action : action['_result']
  switch (_type) {
    case ACTIVE_NEW:
      newState = Object.assign({}, preState, {type: _type});
      newState[_type].list = _action.list;
      return newState;
    case ACTIVE_CHAT:
      newState = Object.assign({}, preState, {type: _type});
      list = [
        {_id: '1', time: '10:22', name: 'wjk', message: 'fdfg'},
        {_id: '2', time: '10:22', name: 'sdfsdsf', message: '121212'},
      ];
      newState[_type].list = list;
      return newState;
    case SET_SEARCH_ACTIVE:
      newState = Object.assign({}, preState);
      newState[preState.type].active = _action;
      return newState;
    case ACTIVE_FRIEND:
      newState = Object.assign({}, preState, {type: _type});
      const fl = _action.ship_list
      let requestList = [], shipList = []
      for (const l in fl) {
        if (fl[l].status === 2) {
          requestList.push(fl[l])
        } else {
          shipList.push(fl[l])
        }
      }
      requestList.sort((a, b) => {
        return new Date(b.requestDate) - new Date(a.requestDate)
      })
      list = requestList.concat(shipList)
      newState[_type].active = ''
      newState[_type].list = list;
      return newState;
    default:
      return preState
  }
}