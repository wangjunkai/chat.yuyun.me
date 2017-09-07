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
import * as AuthActions from '../../actions/auth'
import * as StatusActions from '../../actions/status'
//app模板
class AuthTmp extends Component {

  //表单状态
  state = {
    formNo: false,//是否通过验证
    formType: AuthActions.TOURISTS,
    formBody: {
      name: '',
      mail: '',
      password: ''
    }
  };

//登陆注册
  handleClick = () => {
    const that = this;
    const auth = _.assign({}, that.props.auth, {body: this.state.formBody});
    if (!that.refs.name.value.trim()) {
      const ti = setTimeout(() => {
        that.setState({formNo: false})
      }, 3000);
      if (that.state.formNo) {
        clearTimeout(ti);
      }
      that.setState({formNo: true});
    } else {
      that.props.actions.createMessage({message: '请等待...', class: StatusActions.NEWS_LOAD});
      that.props.actions[this.state.formType](auth)
    }
  };
//表单处理
  handleChange = (e) => {
    this.state.formBody[e.target.name] = e.target.value;
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
    actions.initAuth()
  };
  componentWillReceiveProps = (nextProps) => {
    const {actions, auth} = nextProps;
    if (auth.isLogin && !auth.isAutoLogin && auth.isLogin != this.props.auth.isLogin) {
      if (auth.isLogin && !auth.isAutoLogin) {
        actions.createMessage({message: '登入成功', delay: 2000, class: StatusActions.NEWS_OK});
        return false;
      }
    }
  };

  render() {
    debugger
    const {actions, auth} = this.props;
    if (auth.isLogin) {
      return null;
    }
    const touristsClass = classNames({
      form: true,
      no: this.state.formNo
    });
    let AuthForm;
    switch (this.state.formType) {
      case AuthActions.TOURISTS:
        AuthForm = (
          <div className={touristsClass}>
            <div className="form_group">
              <input type="text" className="form_input" name="name" ref="name"
                     onChange={this.handleChange.bind(this)}
                     placeholder="输入昵称"/>
            </div>
            <div className="form-group">
              <button onClick={this.handleClick.bind(this)} className="form_button">登入</button>
            </div>
          </div>
        );
        break;
      case AuthActions.LOGIN:
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
      case AuthActions.REGISTER:
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
    }
    return (
      <div className="popup-container auth-bg">
        <div className="auth">
          <span className="auth-logo">Free Chat</span>

          <p className="auth-subtitle">一个畅聊的地方</p>
          <div className="auth-content">
            {AuthForm}
            {/*<Tourists actions={actions} auth={auth}/>*/}
          </div>
          <div className="auth-title">
            以 <span onClick={this.handleFormType.bind(this, AuthActions.TOURISTS)}>游客身份登录</span>，
            以 <span onClick={this.handleFormType.bind(this, AuthActions.LOGIN)}>账号登陆</span>，
            还没账号? <span onClick={this.handleFormType.bind(this, AuthActions.REGISTER)}>注册</span></div>
        </div>
      </div>
    )
  }
}

//loading
class Loading extends Component {
  componentDidUpdate() {
    const prop = this.props;
    if (prop.status.show && prop.status.delay) {
      setTimeout(() => {
        prop.actions.clearMessage();
      }, prop.status.delay)
    }
  }

  initClass() {
    const status = this.props.status;
    let c = {'fa': true};
    switch (status.class) {
      case StatusActions.NEWS_LOAD:
        _.assign(c, {'fa-spinner': true, 'fa-spin': true});
        break;
      case StatusActions.NEWS_OK:
        _.assign(c, {'fa-check': true});
        break;
      case StatusActions.NEWS_ERROR:
        _.assign(c, {'fa-times': true});
        break;
    }
    return c;
  }

  render() {
    const status = this.props.status;
    const popClass = classNames({
      'popup-container popup-bg': true,
      none: !status.show
    });
    const newsTypeClass = classNames(this.initClass());
    return (
      <div className={popClass}>
        <div className="popup">
          <i className={newsTypeClass}></i>
          <span style={{marginLeft: '5px'}}>{status.message}</span>
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
    const ModalDom = modal.dom.bind(this);
    const containerClass = classNames({
      'popup-container popup-deep-bg': true,
      'none': !this.state.show,
      [this.state.bgClass]: true
    });
    const modalClass = classNames({
      'modal user-modal fc-fx fc-ud': true,
      [this.state.class]: true
    });
    return (
      <div className={containerClass}>
        <div className={modalClass}>
          <ModalDom/>
        </div>
      </div>
    );
  }
}

//APP
const App = ({actions, auth, modal, status}) => (
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
    <Loading actions={actions} status={status}/>
    <Modal modal={modal}/>

  </div>
);
const mapStateToProps = function (state, ownProps) {
  return {
    auth: state.auth,
    modal: state.modal,
    status: state.status,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(_.assign({}, AuthActions, StatusActions), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);