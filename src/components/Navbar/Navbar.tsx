import './Navbar.css'
import './Navbar.Responsive.css'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useTheme } from '../../hooks/useTheme'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { NavLink } from 'react-router-dom'
import LogoNarrowWhite from '../../assets/images/logo-narrow-white.png'
import LogoNarrowDark from '../../assets/images/logo-narrow-black.png'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState<boolean>(false)

  const isNarrowScreen = useMediaQuery({ query: '(max-width: 1264px)' })

  const routes = [
    { label: 'Inicio', href: '/', icon: <HomeIcon sx={{ fontSize: 28 }} /> },
    { label: 'Redactar', href: '/posts/create', icon: <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: 28 }} /> },
    { label: 'Busqueda', href: '/search', icon: <SearchIcon sx={{ fontSize: 28 }} /> },
    { label: 'Explorar', href: '/explore', icon: <ExploreOutlinedIcon sx={{ fontSize: 28 }} /> }
  ]

  const handleSwitch = () => {
    setTheme((state) => (state === 'light-mode' ? 'dark-mode' : 'light-mode'))
    setChecked(!checked)
  }

  return (
    <div className={`navbar-container ${theme}`}>
      <div className={`navbar ${theme}`}>
        <a href='#' className='logo'>Blog</a>
        {
          isNarrowScreen &&
          <a href='#' className='logo-narrow'>
            <img src={theme === 'dark-mode' ? LogoNarrowWhite : LogoNarrowDark} />
          </a>
        }
        <div className='navbar-links'>
          {
            routes.map(route => (
              <NavLink
                to={route.href}
                key={route.href}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {route.icon}
                <span>{route.label}</span>
              </NavLink>
            ))
          }
          <a
            onClick={handleSwitch}
          >
            {theme === 'dark-mode'
              ? <DarkModeOutlinedIcon sx={{ fontSize: 28 }} />
              : <LightModeOutlinedIcon sx={{ fontSize: 28 }} />}
            <span>Cambiar aspecto</span>
          </a>
        </div>
      </div>
    </div>
  )
}
