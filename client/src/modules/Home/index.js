/**
 * Created by wangjunkai on 2017/7/13.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import _ from 'lodash'


import TopBar from '../TopBar'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ToolBar from '../ToolBar'
import * as constant from '../../actions'
import * as ajaxActions from '../../actions/ajax'
import * as authActions from '../../actions/auth'
import * as modalActions from '../../actions/modal'
import * as messageActions from '../../actions/message'

const session = JSON.parse(sessionStorage.getItem(constant.STORAGE_ID));

//app模板
class AuthTmp extends Component {

  //表单状态
  state = {
    formNo: false,//是否通过验证
    formType: authActions.LOGIN,
    formBody: {
      name: '',
      mail: '',
      password: ''
    }
  };

//登陆注册
  handleClick = () => {
    const {state, refs, props} = this;
    const {actions} = props;
    if (!refs.name.value.trim()) {
      const ti = setTimeout(() => {
        this.setState({formNo: false})
      }, 3000);
      if (state.formNo) {
        clearTimeout(ti);
      }
      this.setState({formNo: true});
    } else {
      actions.createMessage({message: '请等待...', class: constant.NEWS_LOAD});
      actions[state.formType](state.formBody);
    }
  };
//表单处理
  handleChange = (e) => {
    const formBody = Object.assign({}, this.state.formBody, {[e.target.name]: e.target.value});
    this.setState(Object.assign({}, this.state, {formBody}));
  };
//设置表单类型
  handleFormType = (type) => {
    if (this.state.formType === type) {
      return false;
    } else {
      //初始化状态
      _.each(this.refs, (tag) => tag.value = '');
      this.setState({formNo: false, formType: type})
    }
  };
  componentWillMount = () => {
    const {actions} = this.props;
    actions.initAuth(session)
  };
  componentWillReceiveProps = (nextProps) => {
    const {actions, auth} = nextProps;
    if (auth.isLogin && !auth.isAutoLogin && auth.isLogin !== this.props.auth.isLogin) {
      if (auth.isLogin && !auth.isAutoLogin) {
        actions.createMessage({message: '登入成功', delay: 2000, class: constant.NEWS_OK});
        return false;
      }
    }
  };

  render() {
    const {auth} = this.props;
    if (session || auth.isLogin) {
      return null;
    }
    const touristsClass = classNames({
      form: true,
      no: this.state.formNo
    });
    let AuthForm;
    switch (this.state.formType) {
      case authActions.LOGIN:
        AuthForm = (
          <div className={touristsClass}>
            <div className="form_group">
              <input type="text" className="form_input" name="name" ref="name"
                     onChange={this.handleChange.bind(this)}
                     placeholder="输入账号"/>
            </div>
            <div className="form_group">
              <input type="password" className="form_input" name="password" ref="password"
                     onChange={this.handleChange.bind(this)}
                     placeholder="输入密码"/>
            </div>
            <div className="form-group">
              <button onClick={this.handleClick.bind(this)} className="form_button">登入</button>
            </div>
          </div>
        );
        break;
      case authActions.REGISTER:
        AuthForm = (
          <div className={touristsClass}>
            <div className="form_group">
              <input type="text" className="form_input" name="name" ref="name"
                     onChange={this.handleChange.bind(this)}
                     placeholder="输入账号"/>
            </div>
            <div className="form_group">
              <input type="password" className="form_input" name="password" ref="password"
                     onChange={this.handleChange.bind(this)}
                     placeholder="输入密码"/>
            </div>
            <div className="form_group">
              <input type="password" className="form_input" name="againPassword" ref="againPassword"
                     onChange={this.handleChange.bind(this)}
                     placeholder="再次输入密码"/>
            </div>
            <div className="form-group">
              <button onClick={this.handleClick.bind(this)} className="form_button">注册</button>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
    return (
      <div className="popup-container auth-bg">
        <div className="auth">
          <span className="auth-logo">Free Chat</span>

          <p className="auth-subtitle">一个畅聊的地方</p>
          <div className="auth-content">
            {AuthForm}
          </div>
          <div className="auth-title">
            以 <span onClick={this.handleFormType.bind(this, authActions.LOGIN)}>账号登陆</span>，
            还没账号? <span onClick={this.handleFormType.bind(this, authActions.REGISTER)}>注册</span></div>
        </div>
      </div>
    )
  }
}

//loading
class Loading extends Component {
  componentDidUpdate() {
    const prop = this.props;
    if (prop.message.show && prop.message.delay) {
      setTimeout(() => {
        prop.actions.clearMessage();
      }, prop.message.delay)
    }
  }

  initClass = () => {
    const message = this.props.message;
    let c = {'fa': true};
    switch (message.class) {
      case constant.NEWS_LOAD:
        _.assign(c, {'fa-spinner': true, 'fa-spin': true});
        break;
      case constant.NEWS_OK:
        _.assign(c, {'fa-check': true});
        break;
      case constant.NEWS_ERROR:
        _.assign(c, {'fa-times': true});
        break;
      default:
        break;
    }
    return c;
  };

  render() {
    const message = this.props.message;
    const popClass = classNames({
      'popup-container popup-bg': true,
      none: !message.show
    });
    const newsTypeClass = classNames(this.initClass());
    return (
      <div className={popClass}>
        <div className="popup">
          <i className={newsTypeClass}></i>
          <span style={{marginLeft: '5px'}}>{message.message}</span>
        </div>
      </div>
    )
  }
}

//弹出框
class Modal extends Component {
  state = {
    show: false,
    class: '',
    bgClass: ''
  };

  componentDidUpdate(pre) {
    const that = this;
    const modal = this.props.modal;
    //跟新modal的动画流程
    if (modal.class !== pre.modal.class || modal.show !== pre.modal.show) {
      if (modal.show) {
        setTimeout(() => {
          that.setState({show: true});
          setTimeout(() => (
            that.setState({class: modal.class, bgClass: 'transition-opacity'})
          ), 100)
        }, 0)
      } else {
        setTimeout(() => {
          that.setState({class: '', bgClass: ''});
          setTimeout(() => (
            that.setState({show: false})
          ), 600)
        }, 0)
      }
    }
  }

  render() {
    const modal = this.props.modal;
    const containerClass = classNames({
      'popup-container popup-deep-bg': true,
      'none': !this.state.show,
      [this.state.bgClass]: true
    });
    const modalClass = classNames({
      'modal fc-fx fc-ud': true,
      [this.state.class]: true
    });
    return (
      <div className={containerClass}>
        <div className={modalClass}>
          {modal.dom}
        </div>
      </div>
    );
  }
}

//APP
class App extends Component {
  render() {
    const {actions, auth, modal, message} = this.props;
    return (
      <div className="app">
        <div className="container">
          <TopBar actions={actions} auth={auth}/>
          <div className="content-container">
            <ToolBar/>
            <LeftBar/>
            <RightBar/>
          </div>
        </div>
        <AuthTmp actions={actions} auth={auth}/>
        <Loading actions={actions} message={message}/>
        <Modal modal={modal}/>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
    modal: state.modal,
    message: state.message,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(_.assign({}, ajaxActions, authActions, modalActions, messageActions), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);



