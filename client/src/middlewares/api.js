/**
 * Created by wangjunkai on 2017/7/14.
 */

import * as status from '../actions/status'
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
  if (!action[status.API]) {
    return next(action);
  }
  return req(action)
    .then(res => {
      if (res.status != 200) {
        return _.assign({}, action, {response: {status: true}});
        //return Promise.reject({message: res.statusText, delay: 2000, class: status.NEWS_ERROR})
      }

      res.json().then(function (json) {
        return _.assign({}, action, {response: json});
      })
    })
    .then(
      res => {
        setTimeout(() => {
          next(res)
        }, 500);
      },
      err => {
        next(status.createMessage(err));
      }
    );
};