/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import './toolBar.css'

export default class ToolBar extends Component {
  render() {
    return (
      <section className="tool-bar">
        <div className="tool-bar-buttons">
          <i className="fa fa-commenting-o"></i>
          <i className="fa fa-users"></i>
          <i className="fa fa-bars"></i>
        </div>
      </section>
    )
  }
}