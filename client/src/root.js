import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import api from './middlewares/api'
import AppReducers from './reducers'
import App from './modules/Home'
import {AppContainer} from 'react-hot-loader'
const store = createStore(AppReducers, applyMiddleware(thunk, api));

export default class Root extends Component {
  render() {
    return (
      <AppContainer>
        <Provider store={store}>
          <App/>
        </Provider>
      </AppContainer>
    )
  }
}

