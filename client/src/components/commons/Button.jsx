import React from 'react'

const Button = ({body, onSubmit, disabled}) => {
  return (
    <button disabled={disabled||false} onSubmit={onSubmit||''}>{body}</button>
  )
}

export default Button