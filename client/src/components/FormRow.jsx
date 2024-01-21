import React from 'react';

function FormRow({type, name, labelText}) {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">{labelText || name}</label>
      <input type={type} name={name} id={name} className="form-input"></input>
    </div>
  );
}

export default FormRow;
