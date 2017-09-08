/**
 * Created by wangjunkai on 2017/7/14.
 */

import {API} from '../actions/ajax'
import {createMessage} from '../actions/message'
import _ from 'lodash'

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

export default store => next => action => {
  debugger
  const request = action['REQUEST'],response = action['RESPONSE'];
  if (!request) {
    return next(action);
  }
  request.beforeAction && request.beforeAction();
  return req(request)
    .then(res => {
      //if (res.status != 200) {
      return _.assign({}, response);
      //return Promise.reject({message: res.statusText, delay: 2000, class: status.NEWS_ERROR})
      //}

      res.json().then(function (json) {
        return _.assign({}, action, {response: json});
      })
    })
    .then(
      res => {
        setTimeout(() => {
          let newRes;
          if (request.afterAction) {
            newRes = request.afterAction(res);
            res = newRes ? newRes : res;
          }
          action
          next(res)
        }, 500);
      },
      err => {
        next(createMessage(err));
      }
    );
};