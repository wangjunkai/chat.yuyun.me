/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import './leftBar.css'
import {connect} from 'react-redux'
import classNames from 'classnames'
import _ from 'lodash'
import {NEWS_LOAD} from '../../actions'
import {API, createAjax} from '../../actions/ajax'
import {createMessage, clearMessage} from '../../actions/message'
import {activeContent} from '../../actions/content'

class LeftBar extends Component {

  setActiveChat = (e, chat) => {
    const pro = this.props;
    const chatCache = pro.contentWindow.activeChat;
    const matchCache = !_.has(chatCache, chat.id);
    const param = {
      beforeAction: () => {
        pro.createMessage({message: '请等待...', class: NEWS_LOAD})
      },
      afterAction: (res) => {
        pro.clearMessage();
        const o = _.assign({}, chatCache, {[chat.id]: chat});
      },
      activeChatId: chat.id,
      [API]: matchCache
    };
    pro.activeWindow(param);

  };

  render() {
    let content = this.props.content;
    const list = [
      {id: '1', time: '10:22', name: 'wjk', message: '历史课角度来看时间到了分解落实'},
      {id: '2', time: '10:22', name: 'sdfsdsf', message: '历史课角度来看时间到了分解落实'},
      {id: '3', time: '10:22', name: 'sdfxc', message: '历史课角度来看时间到了分解落实'}
    ];
    return (
      <section className="left-bar">
        <div className="chat-list">
          {
            list.map((chat) => {
              const chatClass = classNames({
                'chat': true,
                'active': content.activeChatId === chat.id
              });
              return (
                <div className={chatClass} key={chat.id} onClick={(e) => this.setActiveChat(e, chat)}>
                  <div className="icon fc-fx">
                    <i className="fa fa-user fc-at"></i>
                    <span className="fc-nu">{chat.time}</span>
                  </div>
                  <p className="name">{chat.name}</p>
                  <p>{chat.message}</p>
                </div>
              )
            })
          }
        </div>
      </section>
    )
  }
}
const mapStateToProps = function (state) {
  return {
    content: state.content,
  }
};

export default connect(mapStateToProps, {
  createAjax,
  activeContent,
  createMessage,
  clearMessage
})(LeftBar);