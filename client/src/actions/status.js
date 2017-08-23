/**
 * Created by wangjunkai on 2017/7/14.
 */

export const CREATE_ERROR = 'CREATE_ERROR';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AJAX_START = 'AJAX_START';
export const AJAX_SUCCESS = 'AJAX_SUCCESS';
export const API = 'api';
export const initState = {
  type: '',
  show: false,
  [AJAX_START]: {},
  [AJAX_SUCCESS]: {},
  [CREATE_ERROR]: {},
  [CLEAR_ERROR]:{}
};
export const ajaxStart = startData => ({
  type: AJAX_START,
  [AJAX_START]: startData
});
export const ajaxSuccess = successData => ({
  type: AJAX_SUCCESS,
  [AJAX_SUCCESS]: successData
});
export const createError = errorData => ({
  type: CREATE_ERROR,
  date: new Date().getTime(),
  [CREATE_ERROR]: errorData
});

export const showError = () => ({
  type: SHOW_ERROR
});

export const clearError = () => ({
  type: CLEAR_ERROR
});