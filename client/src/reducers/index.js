/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
const initState = {users: []};
export default function userApp(preState = initState, action) {
  switch (action.type) {
    case 'addUser':
      return Object.assign({}, preState, {
        users: [
          ...preState.users,
          {
            name: action.name
          }]
      });
      break;
    default:
      return preState
  }
}