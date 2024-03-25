import React from 'react';

function FormRow({type, name, labelText, defaultValue, onChange}) {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">{labelText || name}</label>
      <input type={type} name={name} id={name} className="form-input" 
      defaultValue={defaultValue} onChange={onChange} required></input>
    </div>
  );
}

export default FormRow;
