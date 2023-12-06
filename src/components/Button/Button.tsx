import './Button.css'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  type: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  variant?: "primary" | "secondary"
  secondary?: boolean
  disabled?: boolean
}

export default function Button({
  children, type, onClick, variant = "primary", disabled
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn ${variant}`}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
