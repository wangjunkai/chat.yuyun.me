/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {INITAUTH, TOURISTS, LOGIN, LOGOUT, REGISTER, initUser, storageId} from '../actions/auth'
import _ from 'lodash'
export default function auth(preState = initUser, action) {
  switch (action.type) {
    case INITAUTH:
      const newAction = sessionStorage.getItem(storageId);
      let returnAction;
      if (newAction) {
        returnAction = {...JSON.parse(newAction), isLogin: true, isAutoLogin: true}
      } else {
        returnAction = {...action}
      }
      return _.assign({}, preState, returnAction);
      break;
    case TOURISTS:
    case LOGIN:
      sessionStorage.setItem(storageId, JSON.stringify(action));
      return _.assign({}, preState, {...action, isLogin: true});
      break;
    case LOGOUT:
      sessionStorage.removeItem(storageId);
      return _.assign({}, preState, {isLogin: false});
      break;
    case REGISTER:
      break;
    default:
      return preState
  }
}