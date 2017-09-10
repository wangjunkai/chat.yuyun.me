/**
 * Created by wangjunkai on 2017/9/8.
 */
const rootApi = '//localhost:12301/api/';

export const API = 'API';
export const NEXT = 'next';

export const REQUEST = {
  url: '',
  method: 'GET',
  body: {},
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  status: false,
  json: {},
  message: ''
};

//创建ajax行为
export const createAjax = param => (dispatch, getState) => {
  const ajaxData = Object.assign({}, REQUEST, param);
  ajaxData.url = rootApi + ajaxData.url;
  return param.nextAction(ajaxData)
};
