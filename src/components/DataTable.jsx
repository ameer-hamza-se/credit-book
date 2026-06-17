import React from 'react';

export default function DataTable({ entries, onEdit, onDelete }) {
  const formatCurrency = (amount) => `$${Number(amount).toLocaleString()}`;
  
  const getDaysOverdue = (dateString) => {
    const diffTime = new Date() - new Date(dateString);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="table-container card">
      <table className="data-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>TOTAL LENT</th>
            <th>PAID BACK</th>
            <th>REMAINING</th>
            <th>DUE DATE</th>
            <th>PRIORITY</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => {
            const remaining = entry.lent - entry.returned;
            const progress = entry.lent > 0 ? Math.min(100, (entry.returned / entry.lent) * 100) : 0;
            const isCleared = remaining <= 0;
            const overdueDays = getDaysOverdue(entry.dueDate);
            const isOverdue = overdueDays > 0 && !isCleared;

            const entryId = entry._id || entry.id;

            return (
              <tr key={entryId} className={isOverdue ? 'row-overdue' : ''}>
                <td>
                  <div className="user-info">
                    <div className="avatar">{getInitials(entry.name)}</div>
                    <div>
                      <strong>{entry.name}</strong>
                      <div className="meta-text">Limit: {formatCurrency(entry.limit)}</div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{formatCurrency(entry.lent)}</td>
                <td>
                  <div className="progress-cell">
                    <span className={isCleared ? 'text-green' : 'text-orange'}>{formatCurrency(entry.returned)}</span>
                    <div className="progress-bar-bg">
                      <div className={`progress-bar-fill ${isCleared ? 'bg-green' : 'bg-orange'}`} style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="meta-text">{Math.round(progress)}%</span>
                  </div>
                </td>
                <td className="font-semibold text-red">
                  {isCleared ? <span className="badge-cleared">Cleared</span> : formatCurrency(remaining)}
                </td>
                <td>{isOverdue ? <span className="badge-danger">{overdueDays}d overdue</span> : entry.dueDate}</td>
                <td>
                  <span className={`priority-dot dot-${entry.priority.toLowerCase()}`}></span>
                  {entry.priority}
                </td>
                <td>
                  {isCleared ? <span className="status-badge status-paid">✓ Paid</span> : 
                   entry.returned > 0 ? <span className="status-badge status-partial">◐ Partial</span> : 
                   <span className="status-badge status-unpaid">✗ Unpaid</span>}
                </td>
                <td>
                  <div className="actions">
                    <button onClick={() => onEdit(entry)} className="icon-btn edit-btn">✏️</button>
                    <button onClick={() => onDelete(entryId)} className="icon-btn delete-btn">🗑️</button>
                  </div>
                </td>
              </tr>
            );
          })}
          {entries.length === 0 && (
            <tr><td colSpan="8" className="empty-state">No entries found. Add a new entry to get started.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}