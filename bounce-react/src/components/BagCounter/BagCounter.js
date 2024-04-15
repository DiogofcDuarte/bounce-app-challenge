import React from 'react';

const BagCounter = ({ itemQuantity, handleMinusClick, handlePlusClick }) => {
  return (
    <div className="input-group" style={{ zIndex: 0 }}>
      <span className="input-group-text">Number of bags:</span>
      <button className="btn btn-outline-secondary" onClick={handleMinusClick}>-</button>
      <span className="input-group-text">{itemQuantity}</span>
      <button className="btn btn-outline-secondary" onClick={handlePlusClick}>+</button>
    </div>
  );
};

export default BagCounter;
