import React from 'react';
import { Plus } from 'lucide-react';
import './EmptyState.css';

const EmptyState = ({ message, actionText, onAction, icon: Icon }) => {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon size={48} />
        </div>
      )}
      <p className="empty-state-message">{message}</p>
      {actionText && onAction && (
        <button className="empty-state-button" onClick={onAction}>
          <Plus size={20} />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
