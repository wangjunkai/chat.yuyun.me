/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {AJAX_START, AJAX_SUCCESS, CREATE_ERROR,CLEAR_ERROR,initState} from '../actions/status'


export default function status(preState = initState, action) {
  switch (action.type) {
    case AJAX_START:
      return Object.assign({}, preState, {type: AJAX_START, show: true, [AJAX_START]: action[AJAX_START]});
      break;
    case AJAX_SUCCESS:
      return Object.assign({}, preState, {type: AJAX_SUCCESS, show: false, [AJAX_SUCCESS]: action[AJAX_SUCCESS]});
      break;
    case CREATE_ERROR:
      return Object.assign({}, preState, {type: CREATE_ERROR, show: true, [CREATE_ERROR]: action[CREATE_ERROR]});
      break;
    case CLEAR_ERROR:
      return Object.assign({}, preState, {type: CLEAR_ERROR, show: false});
      break;
    default:
      return preState
  }
}