import './Editor.css'
import { useState } from 'react'
import NorthIcon from '@mui/icons-material/North';
import useAxios from '../../hooks/useAxios';
import { IComment } from './CommentsView';
import { useAlert } from '../../hooks/useAlert';
import CustomLoader from '../CustomLoader/CustomLoader';
import Button from '../Button/Button';

interface EditorProps {
  postId: string
  setComments: React.Dispatch<React.SetStateAction<Array<IComment>>>;
}

export default function Editor({ postId, setComments }: EditorProps) {
  const api = useAxios()
  const { createToast } = useAlert()
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('content', comment)
    setIsSubmitting(true)
    const response = await api.post(`/comments/${postId}`, formData)
    if (response.status === 200) {
      const response = await api.get(`/comments/${postId}`)
      setComments(response.data.data)
      createToast({ children: 'Comentario enviado.', variant: 'success' })
      setComment('')
    }
    setIsSubmitting(false)
    console.log('COMMENT RESPONSE: ', response)
  }
  return (
    <form className='comment-editor' onSubmit={onSubmit}>
      {isSubmitting && <CustomLoader />}
      <input placeholder='Escribir un comentario...' type='text' value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
        disabled={isSubmitting}
      />
      <Button type='submit' disabled={comment.length <= 0}>
        <span>Publicar</span>
        <NorthIcon />
      </Button>
    </form>
  )
}
