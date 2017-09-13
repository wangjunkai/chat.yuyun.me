import React from 'react'
import {render}  from 'react-dom'
import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'
import Root from './root'

const renderApp = Com => {
  render(
    <Com />,
    document.getElementsByClassName('root')[0]
  );
};

renderApp(Root);
if (module.hot) {
  module.hot.accept('./root', () => {
    renderApp(Root)
  })
}



