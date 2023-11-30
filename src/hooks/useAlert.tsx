import { useContext } from 'react'
import { AlertContext } from '../context/AlertContext'

const useAlert = () => {
  const context = useContext(AlertContext)
  return context
}

export { useAlert }