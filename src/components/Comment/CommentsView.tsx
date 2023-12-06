import './CommentsView.css'
import { useEffect, useState } from 'react'
import { Author } from '../../types'
import Editor from './Editor'
import { useAlert } from '../../hooks/useAlert'
import { getCommentsByPostId } from '../../services/comments'

export interface IComment {
  _id: string
  author: Author
  content: string
}

export default function CommentsView({ postId }: { postId: string }) {
  const { createToast } = useAlert()
  const [comments, setComments] = useState<Array<IComment>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchComments = async () => {
    const response = await getCommentsByPostId(postId)

    if (response.status !== 200) {
      setIsLoading(false)
      createToast({ children: 'Ha ocurrido un error al cargar los comentarios.', variant: 'danger' })
    }
    setComments(response.data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchComments()
  }, [postId])
  return (
    <>
      {!isLoading && (
        <>
          <div className='comments-header'>
            <h5>
              Comentarios
            </ h5>
          </div>
          <ul className='comments-list'>
            {!comments || comments.length == 0 && <li>No hay comentarios.</li>}
            {comments && comments.map(comment => (
              <li key={comment._id}>
                <div className='comment-author'>
                  <div className='comment-author-avatar'>
                    <img src={comment.author.avatar} />
                  </div>
                  <div>
                    <div className='comment-author-info'>
                      <h5>{comment.author.firstname} {comment.author.lastname}</h5>
                      <span>@{comment.author.username}</span>
                    </div>
                    <p>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Editor
            postId={postId}
            setComments={setComments}
          />
        </>
      )}
    </>
  )
}
