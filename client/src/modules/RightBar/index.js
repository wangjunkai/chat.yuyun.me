/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
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
      return (
        <div className="info-detail">
          <div className="name">wjk开发团</div>
          <div className="date"><span className="tip">创建日期</span>2017-5-8</div>
          <div className="master"><span className="tip">管理员</span>微机课</div>
          <div className="title"><span className="tip">介绍</span>算啦空间的开发绿色记得了</div>
          <div className="buttons fc-fx fc-lr">
            <div className="app-button button fc-nu fc-ct"
                 onClick={this.setActiveWindow.bind(this, contentActions.ACTIVE_CHAT)}>
              <i className="fa fa-commenting-o"></i>
            </div>
            <div className="app-button button fc-nu fc-ct" style={{marginLeft: '10px'}}><i className="fa fa-cogs"></i>
            </div>
            <div className="fc-at"></div>
          </div>
        </div>
      )
    };
    let newsDetail = () => {
      const data = content[content.type].active;
      if (!data) {
        return ''
      }
      return (
        <div className="info-detail">
          <div className="name">{data.name}</div>
          <div className="date"><span className="tip">创建日期</span>{data.joinDate}</div>
          <div className="title"><span className="tip">介绍</span>算啦空间的开发绿色记得了</div>
          <div className="buttons fc-fx fc-lr">
            <div className="app-button button fc-nu fc-ct"
                 onClick={this.setActiveWindow.bind(this, contentActions.ACTIVE_CHAT)}>
              <i className="fa fa-commenting-o"></i>
            </div>
            <div className="app-button button fc-nu fc-ct" style={{marginLeft: '10px'}}><i className="fa fa-cogs"></i>
            </div>
            <div className="fc-at"></div>
          </div>
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