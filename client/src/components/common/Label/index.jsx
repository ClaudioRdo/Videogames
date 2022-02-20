import React from 'react'

const Label = ({value, htmlFor}) => {
  return (
    <label htmlFor={htmlFor}>{value}</label>
  )
}

export default Label