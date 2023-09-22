import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Words from './pages/Words'
import Idiom from './pages/Idiom'
import Transition from './pages/Transition'
import styles from './App.module.css';

function App() {

  useEffect(() => {
  })

  return (
    <Router>
      <div className={styles.App}>
        {/* 配置菜单 */}
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/Words">两字词语</Link></li>
          <li><Link to="/Idiom">四字成语</Link></li>
          <li><Link to="/Transition">过度动画</Link></li>
        </ul>
        {/* 配置路由 */}
        <Routes path='/'>
          <Route path='/words' element={<Words />} />
          <Route path='/idiom' element={<Idiom />} />
          <Route path='/Transition' element={<Transition />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
