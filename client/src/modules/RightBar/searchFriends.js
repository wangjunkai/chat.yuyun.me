/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import _format from 'dateFormat'
import {NEWS_LOAD} from '../../actions/index'
import * as contentActions from '../../actions/content'


export default class searchFriends extends Component {
  state = {
    search: {
      type: 'user',
      value: ''
    }
  };
  searchFriend = () => {
    const {actions} = this.props;
    actions.createMessage({message: '请等待...', class: NEWS_LOAD});
    actions.searchFriends(this.state.search);
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
  askFriends = () => {
    const {content, actions} = this.props;
    actions.createMessage({message: '请等待...', class: NEWS_LOAD});
    actions.askFriends(content[content.type].active)
  };

  render() {
    const {content} = this.props

    let newsDetail = () => {
      const data = content[content.type].active;
      if (!data) {
        return ''
      }
      let buttons = '', tip = ''
      if (data.status === 1) {
        tip = (
          <span className="tip-isFriends">已经是您的好友了，开始聊天吧！</span>
        )
        buttons = (
          <div className="buttons fc-fx fc-lr">
            <div className="app-button button fc-nu fc-ct">
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
          <div className="date"><span className="tip">创建日期</span>{_format(data.joinDate, 'yyyy-mm-dd HH:MM:ss')}</div>
          <div className="title"><span className="tip">介绍</span>算啦空间的开发绿色记得了</div>
          {buttons}
        </div>
      )
    };
    return (
      <section className="news-info">
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
    )
  }
}