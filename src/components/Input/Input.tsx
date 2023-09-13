import './Input.css'
import { useTheme } from '../../hooks/useTheme'

interface InputProps {
  id?: string
  type: string
  name: string
  placeholder: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
}

export default function Input({ id, type, name, placeholder, value, onChange }: InputProps) {
  const { theme } = useTheme()

  return (
    <input
      id={id}
      className={`input ${theme}`}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
