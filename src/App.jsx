import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import DataTable from './components/DataTable';
import About from './components/About';
import SearchBar from './components/SearchBar';
import './styles.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE.replace(/\/$/, '')}/api`;

export default function App() {
  const [entries, setEntries] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());
  const [currentView, setCurrentView] = useState('ledger');
  const [stats, setStats] = useState({ totalGiven: 0, totalRemaining: 0, totalRecovered: 0, overdueCount: 0, totalEntries: 0 });
  const [sortedEntries, setSortedEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function getEmptyForm() {
    return { name: '', lent: '', returned: '', limit: '', dueDate: '', priority: 'Medium', notes: '' };
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(`${API_URL}/entries`);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    let totalGiven = 0;
    let totalRecovered = 0;
    let overdueCount = 0;
    const today = new Date();

    entries.forEach(entry => {
      totalGiven += Number(entry.lent);
      totalRecovered += Number(entry.returned);
      if (new Date(entry.dueDate) < today && Number(entry.lent) > Number(entry.returned)) {
        overdueCount++;
      }
    });

    setStats({
      totalGiven,
      totalRemaining: totalGiven - totalRecovered,
      totalRecovered,
      overdueCount,
      totalEntries: entries.length
    });

    const sorted = [...entries].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      if (dateA !== dateB) return dateA - dateB;
      const priorityMap = { High: 3, Medium: 2, Low: 1 };
      return priorityMap[b.priority] - priorityMap[a.priority];
    });

    setSortedEntries(sorted);
  }, [entries]);

  const exportToCSV = () => {
    const headers = ['Name', 'Total Lent', 'Amount Returned', 'Remaining Balance', 'Due Date', 'Priority', 'Status', 'Notes'];
    const csvRows = [headers.join(',')];

    sortedEntries.forEach(entry => {
      const remaining = entry.lent - entry.returned;
      const status = remaining <= 0 ? 'Paid' : (entry.returned > 0 ? 'Partial' : 'Unpaid');

      const row = [
        `"${entry.name}"`,
        entry.lent,
        entry.returned,
        remaining,
        entry.dueDate,
        entry.priority,
        status,
        `"${entry.notes ? entry.notes.replace(/"/g, '""') : ''}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Udhaar_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      lent: Number(formData.lent) || 0,
      returned: Number(formData.returned) || 0,
      limit: Number(formData.limit) || 0,
    };

    try {
      const url = editingId ? `${API_URL}/entries/${editingId}` : `${API_URL}/entries`;
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchEntries();
        closeForm();
      }
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleEdit = (entry) => {
    setFormData({
      ...entry,
      lent: entry.lent ?? '',
      returned: entry.returned ?? '',
      limit: entry.limit ?? '',
    });
    setEditingId(entry._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`${API_URL}/entries/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          await fetchEntries();
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(getEmptyForm());
  };

  const filteredEntries = sortedEntries.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      {currentView === 'about' ? (
        <About />
      ) : (
        <>
          <Dashboard stats={stats} />
          <main className="main-content">
            <div className="section-header">
              <h3>{isFormOpen ? (editingId ? '📝 Edit Credit Entry' : '📝 Add New Entry') : '📑 Credit Entries'}</h3>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {!isFormOpen && (
                  <button className="btn btn-secondary" onClick={exportToCSV}>
                    📥 Export CSV
                  </button>
                )}

                <button 
                  className={`btn ${isFormOpen ? 'btn-secondary' : 'btn-primary'}`} 
                  onClick={() => isFormOpen ? closeForm() : setIsFormOpen(true)}
                >
                  {isFormOpen ? 'Cancel' : '+ Add New Entry'}
                </button>
              </div>
            </div>

            {isFormOpen ? (
              <EntryForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
                onClose={closeForm} 
                isEditing={!!editingId} 
              />
            ) : (
              <>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <DataTable 
                  entries={filteredEntries} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}