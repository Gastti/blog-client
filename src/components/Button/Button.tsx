import './Button.css'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  type: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  primary?: boolean
  secondary?: boolean
}

export default function Button({
  children, type, onClick, primary, secondary
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn ${primary ? 'primary' : ''}${secondary ? 'secondary' : ''}`}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </button>
  )
}
