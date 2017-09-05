/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {
  CREATE_MODAL, CLEAR_MODAL, initModalData,
} from '../actions/status'

export default function modal(preState = initModalData, action) {
  switch (action.type) {
    case CREATE_MODAL:
      return Object.assign({}, preState, {type: CREATE_MODAL, show: true, ...action});
      break;
    case CLEAR_MODAL:
      return Object.assign({}, preState, {type: CLEAR_MODAL, show: false});
      break;
    default:
      return preState
  }
}