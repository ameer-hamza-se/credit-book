import React from 'react';

export default function EntryForm({ formData, setFormData, onSubmit, onClose, isEditing }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (amount) => `$${Number(amount).toLocaleString()}`;
  const remaining = Math.max(0, Number(formData.lent) - Number(formData.returned));
  const isCleared = Number(formData.lent) - Number(formData.returned) <= 0 && formData.lent;

  return (
    <form className="entry-form card" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Person's Name *</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Ameer Hamza" />
        </div>
        <div className="form-group">
          <label>Total Amount Lent ($) *</label>
          <input required type="number" name="lent" value={formData.lent} onChange={handleChange} min="0" />
        </div>
        <div className="form-group">
          <label>Amount Returned ($)</label>
          <input type="number" name="returned" value={formData.returned} onChange={handleChange} min="0" />
        </div>
        <div className="form-group">
          <label>Remaining Balance (Auto)</label>
          <div className={`calculated-box ${isCleared ? 'bg-success' : 'bg-warning'}`}>
            {formatCurrency(remaining)} {isCleared ? ' ✓ Cleared' : ''}
          </div>
        </div>
        <div className="form-group">
          <label>Credit Limit ($)</label>
          <input type="number" name="limit" value={formData.limit} onChange={handleChange} min="0" />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        <div className="form-group">
          <label>Attach Receipt</label>
          <input type="file" className="file-input" />
        </div>
      </div>
      <div className="form-group full-width">
        <label>Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Add context, payment terms..." rows="3"></textarea>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{isEditing ? 'Update Entry' : '+ Add Entry'}</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}