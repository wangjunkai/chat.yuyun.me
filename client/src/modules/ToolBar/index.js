/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import classNames from 'classnames'
import './toolBar.css'
import {NEWS_LOAD} from '../../actions'
import * as messageActions from '../../actions/message'
import * as contentActions from '../../actions/content'


class ToolBar extends Component {
  componentWillMount() {
    this.props.actions.activeChat();
  }

  setActiveContent = (action) => {
    const pro = this.props;
    if (action === pro.content.type) return;
    /*
        pro.createMessage({message: '请等待...', class: NEWS_LOAD});
    */
    pro.actions.activeContent({type: action});
  };

  render() {
    const content = this.props.content;
    let comment = {'fa fa-commenting-o': true},
      user = {'fa fa-users': true};
    switch (content.type) {
      case contentActions.ACTIVE_CHAT:
        Object.assign(comment, {active: true});
        break;
      case contentActions.ACTIVE_FRIEND:
        Object.assign(user, {active: true});
        break;
      default:
        break;
    }
    return (
      <section className="tool-bar">
        <div className="tool-bar-buttons">
          <i className={classNames(comment)} onClick={this.setActiveContent.bind(this, contentActions.ACTIVE_CHAT)}></i>
          <i className={classNames(user)} onClick={this.setActiveContent.bind(this, contentActions.ACTIVE_FRIEND)}></i>
          <i className="fa fa-bars"></i>
        </div>
        <div className="add-user" onClick={this.setActiveContent.bind(this, contentActions.ACTIVE_NEW)}>
          <div className="button app-button fc-at fc-ct">
            <i className="fa fa-plus"></i>
          </div>
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
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, contentActions, messageActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);