/**
 * Created by wangjunkai on 2017/7/13.
 */
import React from 'react'
import TopBar from '../TopBar'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'

//app模板
const App = (data) => (
  <div className="container">
    <TopBar />
    <div className="content-container">
      <LeftBar/>
      <RightBar/>
    </div>
  </div>
);

export default App