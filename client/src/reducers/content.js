/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  ACTIVE_WINDOW, ACTIVE_CHAT, ACTIVE_FRIEND, FRIENDS, CHAT, initContentData,
} from '../actions/content'

export default function content(preState = initContentData, action) {
  switch (action.type) {
    case ACTIVE_WINDOW:
      return Object.assign({}, preState, {...action});
      break;
    case ACTIVE_CHAT:
    case ACTIVE_FRIEND:
    default:
      return preState
  }
}