import React from 'react'
import {render}  from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import AppReducers from './reducers'
import App from './modules/Home'
import 'normalize.css'
import './index.css'

const store = createStore(AppReducers);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementsByTagName('body')[0]
);