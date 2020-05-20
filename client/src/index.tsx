import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Footer from './components/Main/Footer';
import Header from './components/Main/Header';
import './index.css'
import UserName from './components/Main/UserName';

ReactDOM.render(
  <React.StrictMode>
    <Header>
      <UserName />
    </Header>
      <App/>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);