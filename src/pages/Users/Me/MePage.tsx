import './MePage.css'
import { useEffect, useState } from 'react'
import Container from '../../../components/Container/Container'
import { useSession } from '../../../hooks/useSession'
import { Post } from '../../../types'
import { getPostsByAuthor } from '../../../services/posts'
import ProfileCard from '../../../components/ProfileCard/ProfileCard'
import PostSmallView from '../../../components/Posts/SmallView/PostSmallView'


export default function MePage() {
  const { user } = useSession()
  const [posts, setPosts] = useState<Array<Post>>([] as Post[])
  const [activeView, setActiveView] = useState('posts')

  const getPosts = async (username: string) => {
    getPostsByAuthor(username)
      .then(response => {
        console.log(response.data.data)
        setPosts(response.data.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (user) {
      getPosts(user.username)
    }
  }, [user])

  return (
    <Container className='me-page-container'>
      <div className='me-page'>
        <ProfileCard user={user} />

        <div className='post-header'>
          <ul>
            <li>
              <button
                className={`post-header-btn${activeView === 'posts' ? ' active' : ''}`}
                onClick={() => setActiveView('posts')}
              >
                Publicaciones
              </button>
            </li>
            <li>
              <button
                className={`post-header-btn${activeView === 'activities' ? ' active' : ''}`}
                onClick={() => setActiveView('activities')}
              >
                Actividad
              </button>
            </li>
          </ul>
        </div>

        <div className='personal-posts'>
          {(activeView === 'posts') && posts?.map(post => (
            <PostSmallView post={post} key={post._id} />
          ))}
        </div>
      </div>
    </Container>
  )
}
