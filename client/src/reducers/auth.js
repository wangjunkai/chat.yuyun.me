/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {INITAUTH, LOGIN, LOGOUT, REGISTER,initUser} from '../actions/auth'

export default function auth(preState = initUser, action) {
  switch (action.type) {
    case INITAUTH:
      return preState;
      break;
    case LOGIN:
      return Object.assign({}, preState, {...action});
      return preState;
      break;
    case LOGOUT:
      break;
    case REGISTER:
      break;
    default:
      return preState
  }
}