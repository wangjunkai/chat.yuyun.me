/**
 * Created by wangjunkai on 2017/9/18.
 */
import React, {Component} from 'react'
import classNames from 'classnames'

export default class addUserModal extends Component {

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

    return (
      <div className="add-user-modal">
        <div className="title fc-nu fc-ct">
          <div className="button">添加好友</div>
        </div>
        <div className="content">
          <div>

          </div>
        </div>
        <div className="bottom fc-nu">
          <div className="fc-at"></div>
          <div className="close-button fc-nu fc-ct" onClick={this.handleCloseModal}>关闭</div>
        </div>
      </div>
    )
  }
}
