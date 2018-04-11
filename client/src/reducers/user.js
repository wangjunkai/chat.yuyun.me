/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  SEARCH_FRIENDS, initSearchFriendsData
} from '../actions/user'

function search(preState = initSearchFriendsData, action) {
  switch (action.type) {
    case SEARCH_FRIENDS:
      return Object.assign({}, preState, {...action});
    default:
      return preState
  }
}

export default {
  search
}
