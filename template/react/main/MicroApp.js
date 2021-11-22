import { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import microAppList from './microAppList';

import './micro.css';

const style = {
  marginRight: '20px',
};

const App = () => {
  const [activeNav, setActiveNav] = useState(window.location.pathname);
  return (
    <div className="basic-container">
      <Router>
        <div className="nav-list">
          <Link to="/micro/" style={style}>
            我是基座导航
          </Link>
          {microAppList.map((item) => {
            return (
              <Link
                onClick={() => {
                  setActiveNav(item.activeRule);
                }}
                className={item.activeRule === activeNav ? 'nav-active' : ''}
                to={`${item.activeRule}${window.location.search}`}
                key={item.name}
                style={style}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </Router>
      <header className="basic-app-header">
        <div>基座内容+业务公共区</div>
        <div style={{ fontSize: '16px' }}>
          恭喜💐你！已经成功将您的工程改造成微前端基座项目
        </div>
        <div style={{ fontSize: '14px' }}>
          后续开发中您只需要在microAppList.js文件中修改您的子应用配置，即可将巨石应用改造为微前端应用了
          <a
            href="https://qiankun.umijs.org/zh/guide/getting-started#%E4%B8%BB%E5%BA%94%E7%94%A8"
            target="_blank"
          >
            更多内容请查看qiankun文档
          </a>
        </div>
      </header>
      <div id="subapp" style={{ height: 'calc(100% - 15vh)' }}>
        这里是子应用内容区
      </div>
    </div>
  );
};

export default App;
