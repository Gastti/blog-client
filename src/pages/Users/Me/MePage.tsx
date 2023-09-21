import './MePage.css'
import React, { useEffect, useState } from 'react'
import Container from '../../../components/Container/Container'
import SubContainer from '../../../components/SubContainer/SubContainer'
import { useSession } from '../../../hooks/useSession'
import { Post } from '../../../types'
import { getPostsByAuthor } from '../../../services/posts'
import PostQuickView from '../../../components/Posts/QuickView/PostQuickView'

export default function MePage() {
  const { user } = useSession()
  const [posts, setPosts] = useState<Array<Post>>([] as Post[])

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
          <div className='user-data'>
            <p className='fullname'>{user?.firstname} {user?.lastname}</p>
            <p className='username'>{user?.username}</p>
            <p className='biography'>{user?.biography !== undefined ? user?.biography : 'No existe una biografia...'}</p>
          </div>
        </div>
        {/* <div className='personal-posts'>
          {posts?.map(post => (
            <PostQuickView post={post} />
          ))}
        </div> */}
      </div>
    </Container>
  )
}
