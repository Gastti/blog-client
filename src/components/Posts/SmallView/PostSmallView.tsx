import './PostSmallView.css'
import { Post } from '../../../types'
import { useNavigate } from 'react-router-dom'
import { splitText } from '../../../utils/splitText'
import Markdown from 'react-markdown'

export default function PostSmallView({ post }: { post: Post }) {
  const navigate = useNavigate()
  const postContentSumary = splitText(post.content, 250) as string

  return (
    <article
      className='post-small-view'
      onClick={() => navigate(`/read?post=${post._id}`)}
    >

      <div className='psv-cover'>
        <img src={post.image.url} />
      </div>

      <div className='psv-content'>
        <h3 className='psv-title'>
          {post.title}
        </h3>
        <div>
          <Markdown>{postContentSumary}</Markdown>
        </div>
      </div>
    </article>
  )
}
