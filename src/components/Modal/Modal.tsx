import './Modal.css'
import React from 'react'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ children, open, setOpen }: ModalProps) {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {
        open && (
          <div
            className='modal-container'
            onClick={() => setOpen(!open)}
          >
            <div
              className='modal-content'
              onClick={handleModalClick}
            >
              {children}
            </div>
          </div>
        )
      }</>
  )
}
