import React from 'react';

export default function About() {
  return (
    <div className="about-container card">
      <div className="about-header">
        <h2>About Udhaar Book</h2>
        <span className="version-badge">v1.0.0</span>
      </div>
      
      <div className="about-content">
        <p>
          Udhaar Book is a fast, intuitive, and modern credit ledger application designed specifically for keeping track of money lent to others, tracking repayments, and monitoring outstanding balances.
        </p>

        <h3>Core Features</h3>
        <ul>
          <li><strong>Real-time Dashboard:</strong> Track total money given, recovered, and remaining balances instantly.</li>
          <li><strong>Smart Sorting:</strong> Overdue and high-priority entries are automatically pushed to the top.</li>
          <li><strong>Visual Indicators:</strong> Easy-to-read progress bars and status badges (Paid, Partial, Unpaid).</li>
        </ul>

        <div className="developer-credits">
          <h3>Developer Info</h3>
          <p>
            Designed and developed by <strong>Ameer Hamza</strong>. Built entirely using React functional components, hooks, and clean vanilla CSS.
          </p>
        </div>
      </div>
    </div>
  );
}