import './PostQuickView.css'
import { Post } from '../../../types'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { parseISO, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { splitText } from '../../../utils/splitText';
import Markdown from 'react-markdown';

export default function PostQuickView({ post }: { post: Post }) {
  const cleanPostContent = DOMPurify.sanitize(post.content)
  const navigate = useNavigate()

  const parsedDate = parseISO(post.createdAt.toString());
  const currentDate = new Date()
  const publishAt = formatDistance(currentDate, parsedDate, {
    addSuffix: false,
    includeSeconds: true,
    locale: es
  });

  const splitedContent = splitText(cleanPostContent, 260) as string

  return (
    <article
      className='post-quick-view'
      onClick={() => navigate(`/read?post=${post._id}`)}
    >

      <div className='pqv-cover'>
        <img src={post.image.url} />
      </div>

      <div className='pqv-content'>
        <h3>
          {post.title}
        </h3>

        <div className='pqv-article'>
          <Markdown>{splitedContent}</Markdown>
        </div>
      </div>

      <div className='pqv-footer'>
        <span className='pqv-publishat'>Publicado hace {publishAt} por</span>
        <div className='pqv-author'>
          <div className='pqv-author-info'>
            <div className='avatar'>
              <img src={post.author.avatar} />
            </div>
            <p className='fullname'>
              {post.author.firstname} {post.author.lastname}
            </p>
          </div>
        </div>
      </div>

    </article>
  )
}
