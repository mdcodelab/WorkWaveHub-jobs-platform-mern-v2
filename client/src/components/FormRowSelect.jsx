import React from 'react';

function FormRowSelect({labelText, name, list, defaultValue=""}) {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>{labelText || name}</label>
      <select className="form-select" name={name} id={name} defaultValue={defaultValue}>
        {list.map((itemValue, index) => {
          return <option key={index}>{itemValue}</option>
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;

{
  /* <div className="form-row">
  <label htmlFor="jobStatus" className="form-label">
    Job Status
  </label>
  <select
    name="jobStatus"
    defaultValue={JOB_STATUS.PENDING}
    className="form-select"
  >
    {Object.values(JOB_STATUS).map((itemValue, index) => {
      return (
        <option key={index} value={itemValue}>
          {itemValue}
        </option>
      );
    })}
  </select>
</div>; */
}