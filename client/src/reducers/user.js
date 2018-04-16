/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  SEARCH_FRIENDS, initSearchFriendsData
} from '../actions/user'

function search(preState = initSearchFriendsData, action) {
  let _type = action.type
  let _action = action['_result'] === undefined ? action : action['_result']
  switch (_type) {
    case SEARCH_FRIENDS:
      return Object.assign({}, preState, {..._action});
    default:
      return preState
  }
}

export default {
  search
}
