import './SubContainer.css'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'

interface SubContainerProps {
  children: React.ReactNode,
  className?: string
}

export default function SubContainer({ children, className }: SubContainerProps): React.ReactElement {
  const { theme } = useTheme()
  return (
    <div className={`sub-container ${className ? `${className} ` : ""}${theme}`}>{children}</div>
  )
}
