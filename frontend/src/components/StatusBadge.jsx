import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    if (!status) return 'status-default';
    
    const statusLower = status.toLowerCase();
    
    // Green statuses
    if (['verified', 'approved', 'delivered', 'active', 'in stock'].includes(statusLower)) {
      return 'status-success';
    }
    
    // Blue statuses
    if (['processing', 'in transit', 'pending'].includes(statusLower)) {
      return 'status-info';
    }
    
    // Yellow/Orange statuses
    if (['scheduled', 'delayed', 'conditional approval'].includes(statusLower)) {
      return 'status-warning';
    }
    
    // Red statuses
    if (['rejected', 'failed', 'cancelled', 'disposed'].includes(statusLower)) {
      return 'status-error';
    }
    
    return 'status-default';
  };

  return <span className={`status-badge ${getStatusClass()}`}>{status}</span>;
};

export default StatusBadge;
