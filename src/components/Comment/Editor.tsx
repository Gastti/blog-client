import './Editor.css'
import React, { useState } from 'react'
import NorthIcon from '@mui/icons-material/North';
import useAxios from '../../hooks/useAxios';

export default function Editor() {
  const api = useAxios()
  const [comment, setComment] = useState('')

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('content', comment)
    const response = await api.post(`/comments/650df73cee230be718cc53d4`, formData)
    if (response.status === 200) {
      console.log('Enviado')
    }
    console.log('COMMENT RESPONSE: ', response)
  }
  return (
    <form className='comment-editor' onSubmit={onSubmit}>
      <input placeholder='Escribir un comentario...' type='text' value={comment}
        onChange={(e) => {
          e.preventDefault()
          setComment(e.target.value)
        }}
      />
      <button type='submit'>
        <span>Publicar</span>
        <NorthIcon />
      </button>
    </form>
  )
}
