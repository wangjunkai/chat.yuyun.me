/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import _ from 'lodash'
import './leftBar.css'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {NEWS_LOAD} from '../../actions'
import {createAjax} from '../../actions/ajax'
import {createMessage, clearMessage} from '../../actions/message'
import {activeContent,activeChat} from '../../actions/content'

class LeftBar extends Component {

  setActiveChat = (e, chat) => {
    const pro = this.props;
    const {chatList} = pro.content;
    const matchCache = _.findIndex(chatList,(c)=>{
      if(c.id==chat.id){
        return c['comments']
      }
    });
    const param = {
      url: '/comments/' + chat.id,
      beforeAction: () => {
        pro.createMessage({message: '请等待...', class: NEWS_LOAD})
      },
      afterAction: () => {
        pro.clearMessage();
      },
      nextAction: pro.activeChat,
      activeChat: chat.id
    };
    if (matchCache>=0) {
      pro.activeChat({activeChat: chat.id})
    } else {
      pro.createAjax(param);
    }
  };

  render() {
    let content = this.props.content;
    return (
      <section className="left-bar">
        <div className="chat-list">
          {
            content[content.contentType].map((chat) => {
              const chatClass = classNames({
                'chat': true,
                'active': content.activeChat === chat.id
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
  activeChat,
  createMessage,
  clearMessage
})(LeftBar);