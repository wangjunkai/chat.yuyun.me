/**
 * Created by wangjunkai on 2017/7/13.
 */
import React, {Component}from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//app模板
export default class Tourists extends Component {
  state = {
    formNo: false
  };
  handleClick = () => {
    const that = this;
    const auth = that.props.auth;
    if (!auth.name.trim()) {
      const ti = setTimeout(() => {
        that.setState({formNo: false})
      }, 3000);
      if (that.state.formNo) {
        clearTimeout(ti);
      }
      that.setState({formNo: true});
    } else {
      that.props.actions.login(auth)
    }
  };
  handleChange = (e) => {
    this.props.auth[e.target.name] = e.target.value;
  };

  render() {
    const touristsClass = classNames({
      tourists: true,
      form: true,
      no: this.state.formNo
    });
    return (
      <div className={touristsClass}>
        <div className="form_group">
          <input type="text" className="form_input" name="name" onChange={this.handleChange.bind(this)}
                 placeholder="输入昵称"/>
        </div>
        <div className="form-group">
          <button onClick={this.handleClick.bind(this)} className="form_button">登入</button>
        </div>
      </div>
    )
  }
}