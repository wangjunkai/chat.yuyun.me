/**
 * Created by wangjunkai on 2017/9/18.
 */
import React, {Component} from 'react'
import classNames from 'classnames'

export default class userInfoModal extends Component {

  handleCloseModal = () => {
    const action = this.props.actions;
    action.clearModal();
  }

  handleLogout = () => {
    const action = this.props.actions;
    action.clearModal();
    action.logout();
  }


  render() {
    const auth = this.props.auth;
    const disable = auth.type === 'tourists';
    const saveClass = classNames({
      'no-event': disable,
      'save-button fc-nu fc-ct': true
    });
    return (
      <div className="user-modal">
        <div className="title fc-nu fc-ct">
          <div>个人资料</div>
        </div>
        {disable ? (<div className="user-modal-hint">
            <i className="fa fa-exclamation-circle" style={{marginRight: '2px'}}></i>
            您当前是游客登入，无法修改个人信息，请正常登录或注册
          </div>) : ''}
        <div className="user-modal-form fc-at fc-ud">
          <div className="fc-fx fc-lr">
            <div className="form-input">
              <div>账号</div>
              <input type="text" value={auth.name}/>
            </div>
            <div className="form-input">
              <div>密码</div>
              <input type="text" value={auth.password}/>
            </div>
          </div>
          <div className="fc-at">
            <div className="form-input">
              <div>邮箱</div>
              <input type="text" value={auth.mail}/>
            </div>
          </div>
        </div>
        <div className="bottom fc-nu">
          <div className="app-button logout-button fc-nu fc-ct" onClick={this.handleLogout}>注销</div>
          <div className="fc-at"></div>
          <div className="close-button fc-nu fc-ct" onClick={this.handleCloseModal}>关闭</div>
          <div className={saveClass}>保存</div>
        </div>
      </div>
    )
  }
}
