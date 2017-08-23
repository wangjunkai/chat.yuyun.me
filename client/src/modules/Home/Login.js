/**
 * Created by wangjunkai on 2017/7/13.
 */
import React from 'react'

//app模板
const App = (data) => (
  <div className="container">
    <TopBar />
    <div className="content-container">
      <ToolBar/>
      <LeftBar/>
      <RightBar/>
    </div>
  </div>
);

export default App