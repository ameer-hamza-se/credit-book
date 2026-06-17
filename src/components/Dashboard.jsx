import React from 'react';

export default function Dashboard({ stats }) {
  const formatCurrency = (amount) => `$${Number(amount).toLocaleString()}`;

  return (
    <section className="dashboard-cards">
      <div className="card border-blue">
        <p className="card-label">TOTAL AMOUNT GIVEN</p>
        <h2>{formatCurrency(stats.totalGiven)}</h2>
        <p className="card-sub">{stats.totalEntries} entries total</p>
      </div>
      <div className="card border-orange">
        <p className="card-label">TOTAL REMAINING</p>
        <h2 className="text-orange">{formatCurrency(stats.totalRemaining)}</h2>
        <p className="card-sub">Outstanding balance</p>
      </div>
      <div className="card border-green">
        <p className="card-label">TOTAL RECOVERED</p>
        <h2 className="text-green">{formatCurrency(stats.totalRecovered)}</h2>
        <p className="card-sub">Amount returned</p>
      </div>
      <div className="card border-red">
        <p className="card-label">OVERDUE ENTRIES</p>
        <h2 className="text-red">{stats.overdueCount}</h2>
        <p className="card-sub">Need attention</p>
      </div>
    </section>
  );
}