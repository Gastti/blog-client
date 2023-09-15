import './Navbar.css'
import './Navbar.Responsive.css'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useTheme } from '../../hooks/useTheme'
import Modal from '../Modal/Modal'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { NavLink } from 'react-router-dom'
import LogoNarrowWhite from '../../assets/images/logo-narrow-white.png'
import LogoNarrowDark from '../../assets/images/logo-narrow-black.png'
import { useSession } from '../../hooks/useSession'
import Logout from '../Logout/Logout'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState<boolean>(false)
  const { user, isLogged, isWriter, isAdmin } = useSession()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const isNarrowScreen = useMediaQuery({ query: '(max-width: 1264px)' })

  const routes = [
    {
      label: 'Inicio',
      href: '/',
      private: false,
      hideForUsers: false,
      onlyWriter: false,
      icon: <HomeIcon sx={{ fontSize: 28 }} />
    },
    {
      label: 'Redactar',
      href: '/posts/create',
      private: true,
      hideForUsers: false,
      onlyWriter: true,
      icon: <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: 28 }} />
    },
    {
      label: 'Busqueda',
      href: '/search',
      private: false,
      hideForUsers: false,
      onlyWriter: false,
      icon: <SearchIcon sx={{ fontSize: 28 }} />
    },
    // {
    //   label: 'Explorar',
    //   href: '/explore',
    //   private: false,
    //   hideForUsers: false,
    //   onlyWriter: false,
    //   icon: <ExploreOutlinedIcon sx={{ fontSize: 28 }} />
    // },
    {
      label: 'Iniciar sesión',
      href: '/auth/login',
      private: false,
      hideForUsers: true,
      onlyWriter: false,
      icon: <LoginOutlinedIcon sx={{ fontSize: 28 }} />
    },
    {
      label: 'Perfil',
      href: '/users/me',
      private: true,
      hideForUsers: false,
      onlyWriter: false,
      icon: <div><img src={user?.avatar} /></div>
    }
  ]

  const handleSwitch = () => {
    setTheme((state) => (state === 'light-mode' ? 'dark-mode' : 'light-mode'))
    setChecked(!checked)
  }

  const renderRoutes = () => {
    return routes.map(route => {
      if (route.private && !isLogged) return null
      if (route.onlyWriter && !isWriter && !isAdmin) return null
      if (route.hideForUsers && isLogged) return null
      return (
        <NavLink
          to={route.href}
          key={route.href}
          className={({ isActive }) => isActive ? "active" : ""}
        >
          {route.icon}
          <span>{route.label}</span>
        </NavLink>
      )
    })
  }

  return (
    <div className={`navbar-container ${theme}`}>
      <div className={`navbar ${theme}`}>
        <a href='#' className='logo'>Blog<span>.</span></a>
        {
          isNarrowScreen &&
          <a href='#' className='logo-narrow'>
            <img src={theme === 'dark-mode' ? LogoNarrowWhite : LogoNarrowDark} />
          </a>
        }
        <div className='navbar-links'>
          {renderRoutes()}

          {/*Logout Button*/}
          {isLogged && (
            <a
              onClick={() => setOpenModal(true)}
            >
              <LogoutOutlinedIcon sx={{ fontSize: 28 }} />
              <span>Cerrar sesión</span>
            </a>
          )}

          {/*Switch Theme Button*/}
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
      {/*Logout Modal*/}
      <Modal
        open={openModal}
        setOpen={setOpenModal}
      >
        <Logout setOpenModal={setOpenModal} />
      </Modal>
    </div>
  )
}
