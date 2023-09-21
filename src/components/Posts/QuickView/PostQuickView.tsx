import './PostQuickView.css'
import { Post } from '../../../types'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { format, parseISO, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

export default function PostQuickView({ post }: { post: Post }) {
  const cleanPostContent = DOMPurify.sanitize(post.content)

  const splitText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      const splitedText = text.substring(0, maxLength);
      const matchClosedTag = splitedText.match(/<\s*\/\s*[^>]*\s*>$/);

      if (matchClosedTag) {
        const closedTagIndex = matchClosedTag.index;
        if (closedTagIndex !== undefined) {
          return splitedText.substring(0, closedTagIndex + matchClosedTag[0].length);
        }
      } else {
        return splitedText;
      }
    } else {
      return text;
    }
  }

  const parsedDate = parseISO(post.createdAt.toString());
  const publishedToday = isToday(parsedDate)
  const formatedDate = format(parsedDate, "dd 'de' MMMM 'del' yyyy", { locale: es });
  const publishAt = publishedToday ? 'Hoy' : formatedDate

  const splitedContent = splitText(cleanPostContent, 400) as string

  return (
    <article className='post-quick-view'>
      <div className='pqv-cover'>
        <img src={post.image.url} />
      </div>

      <div className='pqv-author'>
        <div className='pqv-author-info'>
          <div className='avatar'>
            <img src={post.author.avatar} />
          </div>
          <p className='fullname'>
            {post.author.firstname} {post.author.lastname}
          </p>
        </div>
        <span>{publishAt}</span>
      </div>

      <div className="pqv-header">
        <h2 className='title'><Link to={`/read?post=${post._id}`}>{post.title}</Link></h2>
      </div>
      
      <div className='pqv-content' dangerouslySetInnerHTML={{ __html: splitedContent + '...' }}>
      </div>
      <Link className='btn-readpost' to={`/read?post=${post._id}`}>
        Leer
        <KeyboardArrowRightOutlinedIcon />
      </Link>
    </article>
  )
}
