import React from 'react';

export default function Header({ currentView, onNavigate }) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  return (
    <header className="app-header">
      <div className="logo-section">
        <div className="logo-icon">₹</div>
        <div>
          <h1>Udhaar Book</h1>
          <p className="subtitle">Credit Ledger</p>
        </div>
      </div>

      {/* Naya Navigation Menu */}
      <nav className="header-nav">
        <button 
          className={`nav-btn ${currentView === 'ledger' ? 'active' : ''}`}
          onClick={() => onNavigate('ledger')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-btn ${currentView === 'about' ? 'active' : ''}`}
          onClick={() => onNavigate('about')}
        >
          About
        </button>
      </nav>

      <div className="date-section">{today}</div>
    </header>
  );
}