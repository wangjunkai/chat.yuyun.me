/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import _format from 'dateFormat'
import {NEWS_LOAD} from '../../actions/index'
import * as contentActions from '../../actions/content'

export default class friendsList extends Component {
  addFriends = () => {
    const {content, actions} = this.props;
    actions.createMessage({message: '请等待...', class: NEWS_LOAD});
    actions.addFriends(content[content.type].active)
  };
  removeFriends = () => {
    const {content, actions} = this.props;
    actions.removeFriends(content[content.type].active)
  }

  setActiveWindow = (action) => {
    this.props.activeContent({contentType: action});
  };

  render() {
    const {content} = this.props
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
    return (
      <section className="friends-info">
        {setDetail()}
      </section>
    )
  }
}