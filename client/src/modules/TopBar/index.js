/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import './topBar.css'
import UserInfoModal from '../../components/userInfoModal'

export default class TopBar extends Component {

  handleShowModal = () => {
    const {actions, auth} = this.props;
    actions.createModal({dom: <UserInfoModal actions={actions} auth={auth}/>, class: 'transition-top'})
  };

  render() {
    const auth = this.props.auth;
    return (
      <section className="top-bar auth-bg fc-fx">
        <div className="fc-nu site-name">
          <div className="logo">Free Chat</div>
          <div className="name">{auth.name}</div>
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
          <div className="fc-nu fc-ct name-button fa fa-user" onClick={this.handleShowModal}></div>
        </div>

      </section>
    )
  }
}