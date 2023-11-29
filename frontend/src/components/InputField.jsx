
import React from 'react';

export default function InputField({ label, id, name, value, onChange, type = 'text' }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
}
