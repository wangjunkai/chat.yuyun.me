/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {combineReducers} from 'redux'
import auth from './auth'
import modal from './modal'
import status from './status'
import activeWindow from './activeWindow'

const initState = {};
export default combineReducers({
  status,
  modal,
  auth,
  activeWindow
})