import './Input.css'
import { useTheme } from '../../hooks/useTheme'

interface InputProps {
  type: string
  name: string
  placeholder: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function Input({ type, name, placeholder, onChange }: InputProps) {
  const { theme } = useTheme()

  return (
    <input
      className={`input ${theme}`}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
