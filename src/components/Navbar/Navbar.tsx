import { useState } from 'react'
import ReactSwitch from 'react-switch'
import { useTheme } from '../../hooks/useTheme'

export default function Navbar() {
  const { setTheme } = useTheme()
  const [checked, setChecked] = useState<boolean>(false)

  const handleSwitch = () => {
    setTheme((state) => (state === 'light-mode' ? 'dark-mode' : 'light-mode'))
    setChecked(!checked)
  }
  return (
    <div>
      <ReactSwitch
        checked={checked}
        onChange={handleSwitch}
      />
    </div>
  )
}
