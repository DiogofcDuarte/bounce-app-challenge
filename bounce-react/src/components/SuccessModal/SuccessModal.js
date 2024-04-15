import React from 'react';
import './styles.css';

const Modal = ({ isOpen, onClose, text }) => {
  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="success-modal-text">{text}</div>
      </div>
    </div>
  );
};

export default Modal;
