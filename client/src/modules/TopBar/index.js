/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom'
import classNames from 'classnames'


import './topBar.css'


export default class TopBar extends Component {

  UserInfoModal = (arg) => {
    debugger
    const auth = this.props.auth;
    const modalClass = classNames({
      'modal user-modal fc-fx fc-ud':true
    });
    return (
      <div className="popup-container popup-deep-bg">
        <div className={modalClass}>
          <div className="title fc-nu fc-ct">
            <div>个人资料</div>
          </div>
          <div className="user-modal-form fc-at fc-ud">
            <div className="fc-fx fc-lr">
              <div className="form-input">
                <div>账号</div>
                <input type="text" value={auth.body.name}/>
              </div>
              <div className="form-input">
                <div>密码</div>
                <input type="text" value={auth.body.password}/>
              </div>
            </div>
            <div className="fc-at">
              <div className="form-input">
                <div>邮箱</div>
                <input type="text" value={auth.body.mail}/>
              </div>
            </div>
          </div>
          <div className="bottom fc-nu">
            <div className="logout-button fc-nu fc-ct" onClick={this.handleLogout.bind(this)}>注销</div>
            <div className="fc-at"></div>
            <div className="close-button fc-nu fc-ct" onClick={this.handleCloseModal.bind(this)}>关闭</div>
            <div className="save-button fc-nu fc-ct">保存</div>
          </div>
        </div>
      </div>
    )
  };

  handleCloseModal() {
    const action = this.props.actions;
    action.clearModal();
  }

  handleLogout() {
    const action = this.props.actions;
    action.clearModal();
    action.logout();
  }

  handleShowModal() {
    const action = this.props.actions;
    action.createModal({dom: this.UserInfoModal,class:'animation-z'})
  }

  render() {
    const auth = this.props.auth;
    return (
      <section className="top-bar auth-bg fc-fx">
        <div className="fc-nu site-name">
          <div className="logo">Free Chat</div>
          <div className="name">{auth.body.name}</div>
        </div>
        <div className="fc-at fc-ct search-input">
          <div className="search">
            <i className="fa fa-search"></i>
            <div className="input">
              <input type="text" placeholder="搜索的内容..."/>
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="fc-fx fc-at fc-ct user-info">
          <div className="fc-at"></div>
          <div className="fc-nu fc-ct name-button fa fa-user" onClick={this.handleShowModal.bind(this)}></div>
        </div>

      </section>
    )
  }
}