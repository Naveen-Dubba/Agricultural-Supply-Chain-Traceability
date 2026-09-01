import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-subtitle">Comprehensive supply chain reports and insights</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card">
          <div style={{ fontSize: '24px' }}>📊</div>
          <div className="stat-value">1,250</div>
          <div className="stat-label">Total Transactions</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px' }}>✅</div>
          <div className="stat-value">99.8%</div>
          <div className="stat-label">Delivery Success Rate</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px' }}>⏱️</div>
          <div className="stat-value">2.3</div>
          <div className="stat-label">Avg Days in Transit</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px' }}>💰</div>
          <div className="stat-value">₹45.2M</div>
          <div className="stat-label">Total Value</div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { month: 'Jan', batches: 120, deliveries: 115, quality: 98 },
            { month: 'Feb', batches: 135, deliveries: 130, quality: 99 },
            { month: 'Mar', batches: 150, deliveries: 148, quality: 98.5 },
            { month: 'Apr', batches: 165, deliveries: 162, quality: 99.2 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="batches" fill="#10b981" />
            <Bar dataKey="deliveries" fill="#3b82f6" />
            <Bar dataKey="quality" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
