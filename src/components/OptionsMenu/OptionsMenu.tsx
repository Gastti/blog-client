import './OptionsMenu.css'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useMediaQuery } from 'react-responsive'

export default function OptionsMenu({ isAuthor }: { isAuthor: boolean }) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const isDesktop = useMediaQuery({
    query: '(min-width: 840px)'
  })

  const options = [
    { label: 'Editar', icon: <EditIcon />, author: true, admin: true },
    { label: 'Eliminar', icon: <DeleteIcon />, author: true, admin: true },
    { label: 'Compartir a otros', icon: <ShareIcon />, author: false, admin: false },
    { label: 'Denunciar publicación', icon: <ReportProblemIcon />, author: false, admin: false },
  ]

  const onClickDelete = () => {
    /* need logic */
  }

  return (
    <div className='optionsmenu-layout'>
      <button
        className='optionsmenu-btn'
        onClick={() => setIsActive(!isActive)}
      >
        {isDesktop ? <MoreHorizIcon /> : <MoreVertIcon />}
      </button>
      <div className={`optionsmenu-content${isActive ? ' active' : ''}`}>
        <ul>
          {options.map(option => {
            if (option.author && isAuthor) return <li>{option.icon}{option.label}</li>
            if (!option.author) return <li>{option.icon}{option.label}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
