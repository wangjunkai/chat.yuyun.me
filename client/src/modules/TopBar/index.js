/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {render}  from 'react-dom'

import './topBar.css'


export default class TopBar extends Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  UserInfoModal = () => {
    const auth = this.props.auth;
    return (
      <div className="popup-container popup-deep-bg">
        <div className="user-modal fc-fx fc-ud">
          <div className="title fc-nu">
            <div><i className="fa fa-user"></i>个人资料</div>
          </div>
          <div className="user-modal-form fc-at fc-ud">
            <div className="fc-at fc-ct">账号 <input type="text" value={auth.body.name}/></div>
            <div className="fc-at fc-ct">邮箱 <input type="text" value={auth.body.mail}/></div>
            <div className="fc-at fc-ct">密码 <input type="text" value={auth.body.password}/></div>
            <div className="logout fc-at" onClick={this.handleLogout}>注销</div>
          </div>
          <div className="bottom fc-nu">
            <div className="fc-at"></div>
            <div className="close-button fc-nu fc-ct" onClick={this.handleCloseModal}>关闭</div>
            <div className="save-button fc-nu fc-ct">保存</div>
          </div>
        </div>
      </div>
    )
  };
  handleCloseModal(){
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
    action.createModal({dom: this.UserInfoModal})
  }

  render() {
    const auth = this.props.auth;
    return (
      <section className="top-bar fc-fx">
        <div className="fc-nu site-name">
          <div>Free Chat</div>
          <div className="name">{auth.body.name}</div>
        </div>
        <div className="fc-fx fc-at fc-ct user-info">
          <div className="fc-at"></div>
          <div className="fc-nu fc-ct name-button fa fa-user" onClick={this.handleShowModal}></div>
        </div>

      </section>
    )
  }
}