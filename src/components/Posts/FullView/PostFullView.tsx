import './PostFullView.css'
import { Post } from '../../../types'
import DOMPurify from 'dompurify'
import { useSession } from '../../../hooks/useSession'
import { Link } from 'react-router-dom'
import { format, parseISO, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

export default function PostFullView({ post }: { post: Post }) {
  const cleanPostContent = DOMPurify.sanitize(post.content)
  const { user } = useSession()
  const isAuthor = post.author.username === user?.username

  const parsedDate = parseISO(post.createdAt.toString());
  const publishedToday = isToday(parsedDate)
  const formatedDate = format(parsedDate, "dd 'de' MMMM 'del' yyyy", { locale: es });
  const publishAt = publishedToday ? 'Hoy' : 'el ' + formatedDate

  return (
    <article className='post-full-view'>
      {isAuthor && <Link to={`/edit?=${post._id}`}>Editar</Link>}
      <div className="pfv-header">
        <span className='date'>Publicado {publishAt}</span>
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
