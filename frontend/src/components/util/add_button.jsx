import React from 'react';

const AddButton = ({ handleClick }) => {
  return (
    <div className="add-btn" onClick={handleClick}><span>&#x2b;</span></div>
  )
}; 

export default AddButton; 