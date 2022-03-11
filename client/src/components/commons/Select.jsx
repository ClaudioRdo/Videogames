import React from 'react'

const Select = ({options, name, id, onChange, valueDefault}) => {
  return (
    <select name={name} id={id} onChange={onChange} defaultValue={valueDefault||''}>
        {options.map(opt=>(
            <option value={opt} key={opt}>{opt}</option>
        ))}
    </select>
  )
}

export default Select