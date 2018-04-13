/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  ACTIVE_NEW, ACTIVE_CHAT, ACTIVE_FRIEND, initContentData, SET_ACTIVE
} from '../actions/content'

export default function content(preState = initContentData, action) {
  let newState, list = [];
  switch (action.type) {
    case ACTIVE_NEW:
      newState = Object.assign({}, preState, {type: action.type});
      newState[action.type].list = action.list;
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
      const fl = action.ship_list
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
      newState[action.type].active = ''
      newState[action.type].list = list;
      return newState;
    default:
      return preState
  }
}