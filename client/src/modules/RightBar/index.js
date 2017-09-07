/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import CharRecord from './ChatRecord'
import UserSend from './UserSend'
import UserTitle from './UserTitle'
import './rigthBar.css'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {activeWindow, chat_info, friends_info} from '../../actions/status'

class RightBar extends Component {
  setActiveWindow = (action) => {
    this.props.activeWindow({windowType: action});
  };

  render() {
    const content = this.props.content;
    let chat = {'chat-info fc-fx fc-ud': true,none:true},
      friends = {'friends-info': true,none:true};
    switch (content.windowType) {
      case chat_info:
        Object.assign(chat, {none: false});
        break;
      case friends_info:
        Object.assign(friends, {none: false});
        break;
    }
    return (
      <div className="right-bar fc-fx fc-at">
        <section className={classNames(chat)}>
          <UserTitle/>
          <CharRecord/>
          <UserSend/>
        </section>
        <section className={classNames(friends)}>
          <div className="name">wjk开发团</div>
          <div className="date"><span className="tip">创建日期</span>2017-5-8</div>
          <div className="master"><span className="tip">管理员</span>微机课</div>
          <div className="title"><span className="tip">介绍</span>算啦空间的开发绿色记得了</div>
          <div className="buttons fc-fx fc-lr">
            <div className="app-button button fc-nu fc-ct" onClick={this.setActiveWindow.bind(this,chat_info)}>
              <i className="fa fa-commenting-o"></i>
            </div>
            <div className="app-button button fc-nu fc-ct" style={{marginLeft: '10px'}}><i className="fa fa-cogs"></i>
            </div>
            <div className="fc-at"></div>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = function (state, ownProps) {
  return {
    content: state.activeWindow,
  }
};

export default connect(mapStateToProps, {
  activeWindow
})(RightBar);