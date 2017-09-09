/**
 * Created by wangjunkai on 2017/7/14.
 */

//创建modal的状态
export const CREATE_MODAL = 'CREATE_MODAL';
export const CLEAR_MODAL = 'CLEAR_MODAL';

export const initModalData = {
  type: '',
  show: false,
  dom: () => {
    return null
  },
  class: ''
};

//弹出模块
export const createModal = modalData => ({
  type: CREATE_MODAL,
  ...modalData
});
export const clearModal = () => ({
  type: CLEAR_MODAL
});
