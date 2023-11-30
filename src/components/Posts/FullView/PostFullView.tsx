import './PostFullView.css'
import { Post } from '../../../types'
import { useSession } from '../../../hooks/useSession'
import { format, parseISO, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import Markdown from 'react-markdown'
import OptionsMenu from '../../OptionsMenu/OptionsMenu';

export default function PostFullView({ post }: { post: Post }) {
  const { user } = useSession()
  const isAuthor = post.author.username === user?.username

  const parsedDate = parseISO(post.createdAt.toString());
  const publishedToday = isToday(parsedDate)
  const formatedDate = format(parsedDate, "dd 'de' MMMM 'del' yyyy", { locale: es });
  const publishAt = publishedToday ? 'Hoy' : 'el ' + formatedDate

  return (
    <article className='post-full-view'>
      <div className='pfv-options'>
        <OptionsMenu isAuthor={isAuthor} postId={post._id} />
      </div>
      <div className="pfv-header">
        <h2 className='title'>{post.title}</h2>
        <span className='date'>Publicado {publishAt}</span>
      </div>
      <div className='pfv-cover'>
        <img src={post.image.url} />
      </div>
      <div className='pfv-tags'>
        {post.tags.map(tag => <span key={post._id + tag}>{tag}</span>)}
      </div>

      <div className='pfv-content'>
        <Markdown>{post.content}</Markdown>
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
