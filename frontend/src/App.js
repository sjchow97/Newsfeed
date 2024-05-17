import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <Post />
        </div>
      </div>
    </div>
  );
}

export default App;
