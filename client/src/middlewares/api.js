/**
 * Created by wangjunkai on 2017/7/14.
 */

import * as status from '../actions/status'

const rootApi = '//localhost:12301/api/';
const initOptions = {
  url: '',
  api: false,
  method: 'GET',
  body: {},
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
};
const req = options => {
  const {url, method, headers, body} = Object.assign({}, initOptions, options);
  return fetch(rootApi + url, {method, headers, body})
};
const ajaxState = action => {
  let actionNew = [];
  let actions = action.actions;
  actionNew[0] = actions[0] ? actions[0] : status.ajaxStart;
  actionNew[1] = actions[1] ? actions[1] : status.ajaxSuccess;
  actionNew[2] = actions[2] ? actions[2] : status.createError;
  return actionNew;
};
let ajaxNum = 0;
let time;
export default store => next => action => {
  if (!action[status.API]) {
    return next(action);
  }
  const [ajaxStart, ajaxSuccess, ajaxError] = ajaxState(action);
  const id = ajaxNum++;
  next(ajaxStart({id,message: '加载中...'}));
  next(action);
  return req(action)
    .then(res => {
      if (res.status != 200) {
        return Promise.reject({id,state: false, message: res.statusText})
      }
      res.json().then(function (json) {
        if (!res.ok) {
          return Promise.reject({id,...json})
        } else {
          return Object.assign({}, action, {id,...json});
        }
      })
    })
    .then(
      res => {
        next(ajaxSuccess(res))
      },
      err => {
        next(ajaxError(err));
      }
    );
};