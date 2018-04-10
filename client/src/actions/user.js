/**
 * Created by wangjunkai on 2017/7/14.
 */

export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';


//搜索好友
export const searchFriends = modalData => ({
  type: SEARCH_FRIENDS,
  ...modalData
});

