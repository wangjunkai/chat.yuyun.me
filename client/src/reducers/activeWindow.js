/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  ACTIVE_WINDOW, friends_info, chat_info,initWindowData,
} from '../actions/status'

export default function activeWindow(preState = initWindowData, action) {
  switch (action.type) {
    case ACTIVE_WINDOW:
      return Object.assign({}, preState, {...action});
      break;
    default:
      return preState
  }
}