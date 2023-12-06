import './Home.css'
import { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import { Post } from '../../types'
import PostQuickView from '../../components/Posts/QuickView/PostQuickView'
import { getAllPosts } from '../../services/posts'
import PostQuickViewSkeleton from '../../components/Posts/QuickView/PostQuickViewSkeleton'
import SubContainer from '../../components/SubContainer/SubContainer'

export default function Home() {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getPosts = async () => {
    getAllPosts()
      .then(response => {
        setPosts(response.data.data)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container className='home'>
      <SubContainer className='posts-container'>
        {isLoading && (<>
          <PostQuickViewSkeleton />
          <PostQuickViewSkeleton />
          <PostQuickViewSkeleton />
          <PostQuickViewSkeleton />
        </>)}
        {posts.map(post => (
          <PostQuickView key={post._id} post={post} />
        ))}
      </SubContainer>
    </Container>
  )
}