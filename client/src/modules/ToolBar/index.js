/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import './toolBar.css'
import {NEWS_LOAD} from '../../actions'
import {createAjax} from '../../actions/ajax'
import {createMessage, clearMessage} from '../../actions/message'
import {activeContent, CHAT, FRIENDS} from '../../actions/content'


class ToolBar extends Component {
  componentWillMount() {
    this.props.activeContent({contentType: CHAT});
  }

  setActiveWindow = (action) => {
    const pro = this.props;
    const param = {
      url: '/chat',
      beforeAction: () => {
        pro.createMessage({message: '请等待...', class: NEWS_LOAD})
      },
      afterAction: () => {
        pro.clearMessage();
      },
      nextAction: pro.activeContent,
      contentType: action
    };
    pro.createAjax(param);
  };

  render() {
    const content = this.props.content;
    let comment = {'fa fa-commenting-o': true},
      user = {'fa fa-users': true};
    switch (content.contentType) {
      case CHAT:
        Object.assign(comment, {active: true});
        break;
      case FRIENDS:
        Object.assign(user, {active: true});
        break;
    }
    return (
      <section className="tool-bar">
        <div className="tool-bar-buttons">
          <i className={classNames(comment)} onClick={this.setActiveWindow.bind(this, CHAT)}></i>
          <i className={classNames(user)} onClick={this.setActiveWindow.bind(this, FRIENDS)}></i>
          <i className="fa fa-bars"></i>
        </div>
      </section>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    content: state.content,
  }
};

export default connect(mapStateToProps, {
  createAjax,
  activeContent,
  createMessage,
  clearMessage
})(ToolBar);