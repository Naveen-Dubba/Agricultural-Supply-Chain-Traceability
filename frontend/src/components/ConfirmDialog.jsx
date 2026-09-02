import React from 'react';
import { AlertCircle } from 'lucide-react';
import Modal from './Modal';
import './ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, onClose, title, message, onConfirm, loading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="confirm-dialog">
        <div className="confirm-icon">
          <AlertCircle size={48} color="#ef4444" />
        </div>
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button className="confirm-btn-cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="confirm-btn-confirm" onClick={onConfirm} disabled={loading}>
            {loading ? 'Confirming...' : 'Confirm'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
