import './PostQuickView.css'
import { Post } from '../../../types'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
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

  const splitedContent = splitText(cleanPostContent, 400) as string

  return (
    <article className='post-quick-view'>
      <div className="pqv-header">
        <span className='date'>Publicado el 10 de Septiembre, 2023</span>
        <span>{post.createdAt.toString()}</span>
        <h2 className='title'><Link to={`/read?post=${post._id}`}>{post.title}</Link></h2>
      </div>
      <div className='pqv-cover'>
        <img src={post.image.url} />
      </div>
      <div className='pqv-author'>
        <p>Escrito por</p>
        <div className='avatar'>
          <img src={post.author.avatar} />
        </div>
        <p className='fullname'>
          {post.author.firstname} {post.author.lastname}
        </p>
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
