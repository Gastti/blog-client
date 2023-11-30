import './OptionsMenu.css'
import { useState, useEffect } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useMediaQuery } from 'react-responsive'
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../hooks/useAlert';

interface Option {
  label: string;
  icon: JSX.Element;
  author: boolean;
  admin: boolean;
  onClick: () => void;
}

interface MenuOptions {
  main: Option[];
  deleteConfirmation: Option[];
}

export default function OptionsMenu({ isAuthor, postId }: { isAuthor: boolean, postId: string }) {
  const api = useAxios()
  const navigate = useNavigate()
  const { createToast } = useAlert()
  const [isActive, setIsActive] = useState<boolean>(false)
  const [currentMenu, setCurrentMenu] = useState<string>('main')
  const isDesktop = useMediaQuery({
    query: '(min-width: 840px)'
  })

  const onClickDelete = () => {
    setCurrentMenu('deleteConfirmation')
    setActiveOptions(postMenuOptions.deleteConfirmation)
  }

  const toggleMenu = () => {
    setIsActive(prevState => !prevState)
    setCurrentMenu('main')
    console.log('toggleMenu clicked')
  }

  const onDeleteConfirm = async () => {
    await api.delete(`/posts/${postId}`)
      .then(() => {
        navigate('/')
        createToast({ children: 'Se ha eliminado la publicación.', variant: 'success' })
      })
      .catch(() => {
        createToast({ children: 'No se ha podido eliminar. Intenta mas tarde.', variant: 'danger' })
      })
    toggleMenu()
    setCurrentMenu('main')
    setActiveOptions(postMenuOptions.main)
  }

  const onCancel = () => {
    setActiveOptions(postMenuOptions.main)
    setCurrentMenu('main')
  }

  const postMenuOptions: MenuOptions = {
    main: [
      { label: 'Eliminar', icon: <DeleteIcon />, author: true, admin: true, onClick: onClickDelete },
      { label: 'Editar', icon: <EditIcon />, author: true, admin: true, onClick: () => { } },
      { label: 'Compartir a otros', icon: <ShareIcon />, author: false, admin: false, onClick: () => { } },
      { label: 'Denunciar publicación', icon: <ReportProblemIcon />, author: false, admin: false, onClick: () => { } },
      { label: 'Cerrar', icon: <CloseIcon />, author: false, admin: false, onClick: toggleMenu }
    ],
    deleteConfirmation: [
      { label: 'Confirmar', icon: <CheckIcon />, author: true, admin: true, onClick: onDeleteConfirm },
      { label: 'Cancelar', icon: <CloseIcon />, author: true, admin: true, onClick: onCancel },
    ]
  }

  const [activeOptions, setActiveOptions] = useState(postMenuOptions.main)

  useEffect(() => {
    setIsActive(false);
    setActiveOptions(postMenuOptions.main)
  }, [postId]);

  return (
    <div className='optionsmenu-layout'>

      <button
        className='optionsmenu-btn'
        onClick={toggleMenu}
      >
        {isDesktop ? <MoreHorizIcon /> : <MoreVertIcon />}
      </button>
      {isActive && (
        <div className={`optionsmenu-content${isActive ? ' active' : ''}`}>
          {currentMenu === 'deleteConfirmation' && <h4>¿Desea eliminar esta publicación?</h4>}
          <ul>
            {activeOptions.map(option => {
              if (option.author && isAuthor) return (
                <li
                  key={option.label}
                  onClick={option.onClick}
                  className={option.label == 'Eliminar' || option.label == 'Confirmar' ? 'warn' : ''}
                >
                  {option.icon}{option.label}
                </li>
              )
              if (!option.author) return (
                <li
                  key={option.label}
                  onClick={option.onClick}
                >
                  {option.icon}{option.label}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
