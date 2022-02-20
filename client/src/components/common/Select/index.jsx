import React from 'react'

let i = 0;
let opDefault;

const Select = ({ name, options, key, onChange, optionDefault }) => {

  optionDefault?opDefault=optionDefault:opDefault='Select';
  return (
    
    <select name={name} onChange={onChange}>
      
      <option value={opDefault}>{opDefault}</option>
      {
      options.map(op =>
        <option value={op} key={key ? key : i++}>{op}</option>
      )}
    </select>
  )
}

export default Select