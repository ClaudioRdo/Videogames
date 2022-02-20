import React from 'react'

const InputText = ({placeholder,onChange, id}) => {
  return (
    <input type="text" 
    autoComplete='false'
    placeholder={placeholder?placeholder:''}
    onChange = {onChange}
    id={id}
    />
  )
}

export default InputText