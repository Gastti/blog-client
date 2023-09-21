import './PostFullView.css'
import { Post } from '../../../types'
import DOMPurify from 'dompurify'
import { useSession } from '../../../hooks/useSession'
import { Link } from 'react-router-dom'

export default function PostFullView({ post }: { post: Post }) {
  const cleanPostContent = DOMPurify.sanitize(post.content)
  const { user } = useSession()
  const isAuthor = post.author.username === user?.username

  return (
    <article className='post-full-view'>
      {isAuthor && <Link to={`/edit?=${post._id}`}>Editar</Link>}
      <div className="pfv-header">
        <span className='date'>Publicado el 10 de Septiembre, 2023</span>
        <span>{post.createdAt.toString()}</span>
        <h2 className='title'>{post.title}</h2>
      </div>
      <div className='pfv-cover'>
        <img src={post.image.url} />
      </div>
      <div className='pfv-content' dangerouslySetInnerHTML={{ __html: cleanPostContent }}></div>
      <div className='pfv-tags'>
        {post.tags.map(tag => <span key={post._id + tag}>{tag}</span>)}
      </div>
      <div className='pfv-author'>
        <div className='avatar'>
          <img src={post.author.avatar} />
        </div>
        <div className='names'>
          <p className='fullname'>
            {post.author.firstname} {post.author.lastname}
          </p>
          <p className='username'>
            {post.author.username}
          </p>
        </div>
      </div>
    </article>
  )
}
