import './MePage.css'
import { useEffect, useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Container from '../../../components/Container/Container'
import { useSession } from '../../../hooks/useSession'
import { Post } from '../../../types'
import { getPostsByAuthor } from '../../../services/posts'
import PostQuickView from '../../../components/Posts/QuickView/PostQuickView'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined'

export default function MePage() {
  const { user } = useSession()
  const [posts, setPosts] = useState<Array<Post>>([] as Post[])
  const [activeView, setActiveView] = useState('posts')
  const [memberSince, setMemberSince] = useState('1 Mes')

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
        <div className='personal-info'>
          <div className='user-avatar'>
            <img src={user?.avatar}></img>
          </div>
          <div>
            <div>
              <p className="me-username">{user?.username}</p>
            </div>
            <div className='personal-awards'>
              <div className='award'>
                <AccessTimeOutlinedIcon sx={{ fontSize: 40 }} />
                <div className='award-info'>
                  <p className='award-value'>{memberSince}</p>
                  <p className='award-label'>Antigüedad</p>
                </div>
              </div>
              <div className='award'>
                <HistoryEduOutlinedIcon sx={{ fontSize: 40 }} />
                <div className='award-info'>
                  <p className='award-value'>10</p>
                  <p className='award-label'>Publicaciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='user-data'>
          <p className='fullname'>{user?.firstname} {user?.lastname}</p>
          <p className='biography'>{user?.biography !== undefined ? user?.biography : 'No existe una biografia...'}</p>
          <div className='contact'>
            <a href={user?.contactUrl} target='_blank'>Instagram</a>
            <a href={user?.contactUrl} target='_blank'>Twitter</a>
            <a href={user?.contactUrl} target='_blank'>Facebook</a>
          </div>
        </div>

        <div className='personal-posts'>
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
          {(activeView === 'posts') && posts?.map(post => (
            <PostQuickView post={post} />
          ))}
        </div>
      </div>
    </Container>
  )
}
