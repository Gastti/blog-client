import './Form.css'
import React from 'react'

export interface FormProps {
  children: React.ReactNode
  method:   string
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export default function Form({ children, method, onSubmit }: FormProps) {
  return (
    <form
      method={method}
      onSubmit={onSubmit}
      className='form-container'
    >
      {children}
    </form>
  )
}
