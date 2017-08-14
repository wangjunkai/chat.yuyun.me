/**
 * Created by wangjunkai on 2017/8/10.
 */
import React, {Component} from 'react'
import CharRecord from './ChatRecord'
import UserSend from './UserSend'
import UserTitle from './UserTitle'
import './rigthBar.css'

export default class RightBar extends Component {
  render() {
    return (
      <section className="right-bar">
        <UserTitle/>
        <CharRecord/>
        <UserSend/>
      </section>
    )
  }
}