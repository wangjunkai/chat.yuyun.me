/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {combineReducers} from 'redux'
import auth from './auth'
import status from './status'

const initState = {};
export default combineReducers({
  status,
  auth
})