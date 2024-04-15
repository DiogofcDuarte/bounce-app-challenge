import React from 'react';
import './styles.css';

const Modal = ({ isOpen, onClose, text }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-text">{text}</div>
      </div>
    </div>
  );
};

export default Modal;
