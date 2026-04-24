import React from 'react';
import './Navbar.css';

const Navbar = ({ onLogout, setPage, currentPage }) => {
  return (
    <nav className="main-nav">
      {/* 🚀 FIX: Made Logo Clickable to go back to Landing Page */}
      <div 
        className="nav-logo" 
        onClick={onLogout} 
        style={{ cursor: 'pointer' }}
        title="Go to Landing Page"
      >
        CloudLearn <span style={{color: '#3b82f6'}}>Hub</span>
      </div>

      <div className="nav-menu">
        <button 
          className={currentPage === 'dashboard' ? 'active' : ''} 
          onClick={() => setPage('dashboard')}
        >
          Download Notes
        </button>
        <button 
          className={currentPage === 'upload' ? 'active' : ''} 
          onClick={() => setPage('upload')}
        >
          Upload Notes
        </button>
        <button className="logout-link" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;