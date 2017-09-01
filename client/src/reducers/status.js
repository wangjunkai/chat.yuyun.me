/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  CREATE_MESSAGE, CLEAR_MESSAGE, initState,
} from '../actions/status'


export default function status(preState = initState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return Object.assign({}, preState, {type: CREATE_MESSAGE, show: true, ...action});
      break;
    case CLEAR_MESSAGE:
      return Object.assign({}, preState, {type: CLEAR_MESSAGE, show: false, ...action});
      break;
    default:
      return preState
  }
}