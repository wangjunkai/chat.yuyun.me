/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import _format from 'dateFormat'
import CharRecord from './ChatRecord'
import UserSend from './UserSend'
import UserTitle from './UserTitle'
import './rigthBar.css'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {NEWS_LOAD} from '../../actions/index'
import * as messageActions from '../../actions/message'
import * as contentActions from '../../actions/content'
import * as userActions from '../../actions/user'


class RightBar extends Component {
  state = {
    search: {
      type: 'user',
      value: ''
    }
  };

  setActiveWindow = (action) => {
    this.props.activeContent({contentType: action});
  };
  askFriends = () => {
    const {content, actions} = this.props;
    actions.createMessage({message: '请等待...', class: NEWS_LOAD});
    actions.askFriends(content[content.type].active)
  };
  addFriends = () => {
    const {content, actions} = this.props;
    actions.createMessage({message: '请等待...', class: NEWS_LOAD});
    actions.addFriends(content[content.type].active)
  };
  removeFriends = () => {
    const {content, actions} = this.props;
    actions.removeFriends(content[content.type].active)
  }
  inputChange = (event) => {
    let search = this.state.search
    if (event.target.nodeName.toLowerCase() === 'select') {
      search.type = event.target.value
    } else {
      search.value = event.target.value
    }
    this.setState({search: search})
  };
  searchFriend = () => {
    const {actions} = this.props;
    actions.createMessage({message: '请等待...', class: NEWS_LOAD});
    actions.searchFriends(this.state.search);
  };

  render() {
    const content = this.props.content;
    let chat = {'chat-info fc-fx fc-ud': true, none: true},
      friends = {'friends-info': true, none: true},
      news = {'news-info': true, none: true};
    switch (content.type) {
      case contentActions.ACTIVE_CHAT:
        Object.assign(chat, {none: false});
        break;
      case contentActions.ACTIVE_FRIEND:
        Object.assign(friends, {none: false});
        break;
      case contentActions.ACTIVE_NEW:
        Object.assign(news, {none: false});
        break;
      default:
        break;
    }
    let setDetail = () => {
      const data = content[content.type].active;
      if (!data) {
        return (
          <div className="info-detail" style={{textAlign: 'center'}}>
            <img src="public/image/home-bg-4.jpg" alt=""/>
            <p>选择你喜欢的对象去交流</p>
          </div>
        )
      }
      let buttons = '', requestDate = '';
      if (data.status === 2) {
        requestDate = (
          <div className="date">
            <span className="tip">请求日期</span>{_format(data.requestDate, 'yyyy-mm-dd HH:MM:ss')}
          </div>
        )
        buttons = (
          <div className="buttons fc-fx fc-lr">
            <div className="app-button button fc-nu fc-ct"
                 onClick={this.addFriends}>
              <i className="fa fa-check"></i>
            </div>
            <div className="app-button app-button_close button fc-nu fc-ct"
                 onClick={this.removeFriends}
                 style={{marginLeft: '10px'}}>
              <i className="fa fa-times"></i>
            </div>
            <div className="fc-at"></div>
          </div>
        )
      } else {
        buttons = (
          <div className="buttons fc-fx fc-lr">
            <div className="app-button button fc-nu fc-ct"
                 onClick={this.setActiveWindow.bind(this, contentActions.ACTIVE_CHAT)}>
              <i className="fa fa-commenting-o"></i>
            </div>
            <div className="app-button button fc-nu fc-ct" style={{marginLeft: '10px'}}>
              <i className="fa fa-cogs"></i>
            </div>
            <div className="fc-at"></div>
          </div>
        )
      }
      return (
        <div className="info-detail">
          <div className="name">{data.name}</div>
          <div className="date"><span className="tip">创建日期</span>{_format(data.joinDate, 'isoDate')}</div>
          {requestDate}
          <div className="title"><span className="tip">介绍</span>算啦空间的开发绿色记得了</div>
          {buttons}
        </div>
      )
    };
    let newsDetail = () => {
      const data = content[content.type].active;
      if (!data) {
        return ''
      }
      let buttons = '',tip=''
      if (data.status === 1) {
        tip = (
          <span className="tip-isFriends">已经是您的好友了，开始聊天吧！</span>
        )
        buttons = (
          <div className="buttons fc-fx fc-lr">
            <div className="app-button button fc-nu fc-ct"
                 onClick={this.setActiveWindow.bind(this, contentActions.ACTIVE_CHAT)}>
              <i className="fa fa-commenting-o"></i>
            </div>
            <div className="app-button button fc-nu fc-ct" style={{marginLeft: '10px'}}>
              <i className="fa fa-cogs"></i>
            </div>
            <div className="fc-at"></div>
          </div>
        )
      } else {
        buttons = (
          <div className="buttons fc-fx fc-lr">
            <div className="app-button app-button_add button fc-nu fc-ct "
                 onClick={this.askFriends}>
              添加好友
            </div>
            <div className="fc-at"></div>
          </div>
        )
      }
      return (
        <div className="info-detail">
          <div className="name">{data.name}{tip}</div>
          <div className="date"><span className="tip">创建日期</span>{data.joinDate}</div>
          <div className="title"><span className="tip">介绍</span>算啦空间的开发绿色记得了</div>
          {buttons}
        </div>
      )
    };
    return (
      <div className="right-bar fc-fx fc-at">
        <section className={classNames(chat)}>
          <UserTitle/>
          <CharRecord/>
          <UserSend/>
        </section>
        <section className={classNames(friends)}>
          {setDetail()}
        </section>
        <section className={classNames(news)}>
          <div className="search">
            <div className="select">
              <select name="" id="" onChange={this.inputChange}>
                <option value="user">好友</option>
                <option value="group">圈组</option>
              </select>
            </div>
            <input type="text" onChange={this.inputChange}/>
            <i className="fa fa-search" onClick={this.searchFriend}></i>
          </div>
          {newsDetail()}
        </section>
      </div>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    content: state.content,
  }
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, messageActions, contentActions, userActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RightBar);