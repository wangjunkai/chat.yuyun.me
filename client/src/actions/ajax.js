/**
 * Created by wangjunkai on 2017/9/8.
 */

export const API = 'API';
export const NEXT = 'next';
export const REQUEST = {
  url: '',
  method: 'GET',
  [NEXT]: ''
};
export const RESPONSE = {
  status: false,
  json: {},
  message: ''
};
//创建ajax行为
export const createAjax = param => (dispatch, getState) => {
  debugger
  const REQUEST = Object.assign({}, REQUEST, param);
  delete REQUEST['type'];
  return dispatch(param.next({REQUEST, RESPONSE}))
};
