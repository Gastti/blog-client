import './Navbar.css'
import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import Container from '../Container/Container'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState<boolean>(false)

  const routes = [
    {label: 'Inicio', href: '/', icon: <HomeIcon sx={{ fontSize: 28 }}/>},
    {label: 'Busqueda', href: '/search', icon: <SearchIcon sx={{ fontSize: 28 }}/>},
    {label: 'Explorar', href: '/explore', icon: <ExploreOutlinedIcon sx={{ fontSize: 28 }}/>}
  ]

  const handleSwitch = () => {
    setTheme((state) => (state === 'light-mode' ? 'dark-mode' : 'light-mode'))
    setChecked(!checked)
  }

  return (
    <Container className={`navbar`}>
      <a href='#' className='logo'>Blog</a>
      <div className='navbar-links'>
        {
          routes.map(route => (
            <NavLink 
            to={route.href} 
            key={route.href}
            className={({ isActive }) => isActive ? "active" : ""}
            >
              {route.icon}
              {route.label}
              </NavLink>
          ))
        }
        <button
          onClick={handleSwitch}
        >
          {theme === 'dark-mode' 
          ? <DarkModeOutlinedIcon sx={{ fontSize: 28 }}/> 
          : <LightModeOutlinedIcon sx={{ fontSize: 28 }}/> }
          Cambiar aspecto
        </button>
      </div>
    </Container>
  )
}
