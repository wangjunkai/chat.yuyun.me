/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import CharRecord from './ChatRecord'
import FriendList from './friendsList'
import SearchFriends from './searchFriends'
import './rigthBar.css'
import {connect} from 'react-redux'
import * as messageActions from '../../actions/message'
import * as contentActions from '../../actions/content'
import * as userActions from '../../actions/user'


class RightBar extends Component {

  render() {
    const {content,actions} = this.props;
    let activeBox = ''
    switch (content.type) {
      case contentActions.ACTIVE_CHAT:
        activeBox = <CharRecord/>
        break;
      case contentActions.ACTIVE_FRIEND:
        activeBox = <FriendList actions={actions} content={content}/>
        break;
      case contentActions.ACTIVE_NEW:
        activeBox = <SearchFriends actions={actions} content={content}/>
        break;
      default:
        break;
    }
    return (
      <div className="right-bar fc-fx fc-at">
        {activeBox}
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