import './Container.css'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'

interface ContainerProps {
  children: React.ReactNode,
  className?: string
}

export default function Container({ children, className }: ContainerProps): React.ReactElement {
  const { theme } = useTheme()
  return (
    <div className={`container ${className ? className : ""}${theme}`}>{children}</div>
  )
}
