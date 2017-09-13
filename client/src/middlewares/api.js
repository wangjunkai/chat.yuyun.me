/**
 * Created by wangjunkai on 2017/7/14.
 */

import {createMessage} from '../actions/message'
import _ from 'lodash'


const req = ({url, method, headers,body}) => {
  return fetch(url, {method, headers, body})
};

export default store => next => param => {
  const {nextAction,beforeAction, afterAction} = param;
  if (!nextAction) {
    return next(param);
  }
  beforeAction && beforeAction();
  return req(param)
    .then(res => {
      //if (res.status != 200) {
      return _.assign({}, param);
      //return Promise.reject({message: res.statusText, delay: 2000, class: status.NEWS_ERROR})
      //}

/*      res.json().then(function (json) {
        return _.assign({}, param, {response: json});
      })*/
    })
    .then(
      res => {
        setTimeout(() => {
          afterAction&&afterAction();
          next(res)
        }, 500);
      },
      err => {
        next(createMessage(err));
      }
    );
};