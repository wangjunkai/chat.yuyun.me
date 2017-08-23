import React from 'react'
import {render}  from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import api from './middlewares/api'
import AppReducers from './reducers'
import App from './modules/Home'
import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'

const store = createStore(AppReducers, applyMiddleware(thunk, api));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementsByTagName('body')[0]
);