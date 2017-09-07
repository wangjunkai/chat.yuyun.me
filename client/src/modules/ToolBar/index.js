/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import './toolBar.css'
import {activeWindow, chat_info, friends_info} from '../../actions/status'


class ToolBar extends Component {

  setActiveWindow = (action) => {
    this.props.activeWindow({windowType: action});
  };

  render() {
    const content = this.props.content;
    let comment = {'fa fa-commenting-o': true},
      user = {'fa fa-users': true};
    switch (content.windowType) {
      case chat_info:
        Object.assign(comment, {active: true});
        break;
      case friends_info:
        Object.assign(user, {active: true});
        break;
    }
    return (
      <section className="tool-bar">
        <div className="tool-bar-buttons">
          <i className={classNames(comment)} onClick={this.setActiveWindow.bind(this, chat_info)}></i>
          <i className={classNames(user)} onClick={this.setActiveWindow.bind(this, friends_info)}></i>
          <i className="fa fa-bars"></i>
        </div>
      </section>
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
})(ToolBar);