import React from 'react'

const InputText = ({name, value, placeholder, onChange, id}) => {
  return (
    <input type="text"
    name={name} 
    value={value}
    autoComplete='false'
    placeholder={placeholder?placeholder:''}
    onChange = {onChange}
    id={id}
    />
  )
}

export default InputText