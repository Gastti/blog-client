import './PostQuickView.css'
import { Post } from '../../../types'
import { Link, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { parseISO, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

export default function PostQuickView({ post }: { post: Post }) {
  const cleanPostContent = DOMPurify.sanitize(post.content)
  const navigate = useNavigate()

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
  const currentDate = new Date()
  const publishAt = formatDistance(currentDate, parsedDate, {
    addSuffix: false,
    includeSeconds: true,
    locale: es
  });


  const splitedContent = splitText(cleanPostContent, 200) as string

  return (
    <article className='post-quick-view'>
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

      <div className='pqv-cover'>
        <img src={post.image.url} />
      </div>

      {/* <div className="pqv-header">
        <h2 className='title'><Link to={`/read?post=${post._id}`}>{post.title}</Link></h2>
      </div> */}

      <div 
      className='pqv-content-container'
      onClick={() => navigate(`/read?post=${post._id}`)}>
        <h2 className='pqv-title'>{post.title}</h2>
        <div
          className='pqv-content'
          dangerouslySetInnerHTML={{ __html: splitedContent }}
        />
        <div className='pqv-footer'>
          <span className='pqv-publishat'>Hace {publishAt}.</span>
          <Link className='btn-readpost' to={`/read?post=${post._id}`}>
            Leer
            <KeyboardArrowRightOutlinedIcon />
          </Link>
        </div>
      </div>
    </article>
  )
}
