/**
 *
 * Created by wangjunkai on 2017/8/1.
 */
import {combineReducers} from 'redux'
import auth from './auth'
import modal from './modal'
import message from './message'
import content from './content'

const initState = {};
export default combineReducers({
  message,
  modal,
  auth,
  content
})