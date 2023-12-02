import './CommentsView.css'
import { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { Author } from '../../types'
import Editor from './Editor'

export interface IComment {
  _id: string
  author: Author
  content: string
}

export default function CommentsView({ postId }: { postId: string }) {
  const api = useAxios()
  const [comments, setComments] = useState<Array<IComment>>([])

  const fetchComments = async () => {
    const response = await api.get(`/comments/${postId}`)
    setComments(response.data.data)
  }

  useEffect(() => {
    fetchComments()
  }, [postId])
  return (
    <>
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
                  <h4>{comment.author.firstname} {comment.author.lastname}</h4>
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
  )
}
