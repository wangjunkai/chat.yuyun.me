/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import './topBar.css'

export default class TopBar extends Component {
  handleLogout(){
    const action = this.props.actions;
    action.logout();
  }
  render() {
    return (
      <section className="top-bar">
        <div className="site-name">Chat</div>
        <div className="logout" onClick={this.handleLogout.bind(this)}>注销</div>
      </section>
    )
  }
}