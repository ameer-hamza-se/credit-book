import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const hasText = searchTerm.trim().length > 0;

  return (
    <div
      style={{
        marginBottom: '12px',
        borderRadius: '12px',
        padding: hasText ? '1px' : '0px',
        background: hasText
          ? 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #22c55e)'
          : 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: hasText
          ? '0 0 0 1px rgba(96, 165, 250, 0.15), 0 0 12px rgba(96, 165, 250, 0.18)'
          : 'none'
      }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
        className="search-input"
        style={{
          width: '100%',
          maxWidth: '100%',
          padding: '12px 14px',
          border: hasText ? 'none' : '1px solid #dbeafe',
          borderRadius: hasText ? '11px' : '10px',
          fontSize: '14px',
          outline: 'none',
          background: '#fff'
        }}
      />
    </div>
  );
}