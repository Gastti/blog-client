import './PostSmallView.css'
import { Post } from '../../../types'
import { useNavigate } from 'react-router-dom'
import { splitText } from '../../../utils/splitText'

export default function PostSmallView({ post }: { post: Post }) {
  const navigate = useNavigate()
  const postContentSumary = splitText(post.content, 150) as string

  return (
    <article className='post-small-view'>
      <div className='psv-content-container'>
        {/* <div className='psv-cover'>
          <img src={post.image.url} />
        </div> */}
        <a
          className='psv-title'
          onClick={() => navigate(`/read?post=${post._id}`)}
        >
          {post.title}
        </a>
        <p
          dangerouslySetInnerHTML={{ __html: postContentSumary }}
        >

        </p>
      </div>
    </article>
  )
}
