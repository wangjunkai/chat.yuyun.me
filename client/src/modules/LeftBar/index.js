/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import _ from 'lodash'
import './leftBar.css'
import {connect} from 'react-redux'
import classNames from 'classnames'
import * as ajaxActions from '../../actions/ajax'
import * as modalActions from '../../actions/modal'
import * as messageActions from '../../actions/message'
import * as contentActions from '../../actions/content'

import AddUserModal from '../../components/addUserModal'

class LeftBar extends Component {

  setActiveChat = (chat) => {
    const {content, actions} = this.props;
    chat = chat ? chat : content[content.type].list[0];
    actions.setActive(chat)
  };
  handleShowModal = () => {
    const {actions, auth} = this.props;
    actions.createModal({dom: <AddUserModal actions={actions} auth={auth}/>, class: 'transition-top'})
  };
  componentWillMount = () => {
    this.setActiveChat()
  };

  render() {
    let {content, search} = this.props;
    const listFun = (userList) => {
      const list = userList.map((chat) => {
        const chatClass = classNames({
          'chat': true,
          'active': content[content.type].active._id === chat._id
        });
        return (
          <div className={chatClass} key={chat._id} onClick={(e) => this.setActiveChat(chat)}>
            <div className="icon fc-fx">
              <i className="fa fa-user fc-at"></i>
              <span className="fc-nu">{chat.time}</span>
            </div>
            <p className="name">{chat.name}</p>
            <p>{chat.message}</p>
          </div>
        )
      });
      if (list.length <= 0) {
        return (<div className="no-more">没有聊天联系人</div>)
      }
      return list;
    };
    const loadNews = (list) => {

    };
    const {ACTIVE_CHAT, ACTIVE_NEW, ACTIVE_FRIEND} = contentActions;
    let chat = {'chat-list': true, none: true},
      friends = {'chat-list': true, none: true},
      news = {'chat-list': true, none: true};
    let chatList, friendList, newList;
    switch (content.type) {
      case ACTIVE_CHAT:
        Object.assign(chat, {none: false});
        chatList = listFun(content[ACTIVE_CHAT].list);
        break;
      case ACTIVE_FRIEND:
        Object.assign(friends, {none: false});
        friendList = listFun(content[ACTIVE_FRIEND].list);
        break;
      case ACTIVE_NEW:
        Object.assign(news, {none: false});
        newList = listFun(search.list);
        break;
      default:
        break;
    }

    return (
      <div className="left-bar">
        <section className={classNames(chat)}>
          <div className="list">
            {chatList}
          </div>
        </section>
        <section className={classNames(friends)}>
          <div className="list">
            {friendList}
          </div>
        </section>
        <section className={classNames(news)}>
          <div className="list">
            {newList}
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
    content: state.content,
    search: state.search
  }
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(_.assign({}, ajaxActions, modalActions, messageActions, contentActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);