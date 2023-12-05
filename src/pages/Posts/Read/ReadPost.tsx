import './ReadPost.css'
import { useEffect, useState } from 'react'
import { Post } from '../../../types'
import { useLocation } from 'react-router-dom'
import Container from '../../../components/Container/Container'
import PostFullView from '../../../components/Posts/FullView/PostFullView'
import { getPostById } from '../../../services/posts'
import CommentsView from '../../../components/Comment/CommentsView'
import PostFullViewSkeleton from '../../../components/Posts/FullView/PostFullViewSkeleton'
import SubContainer from '../../../components/SubContainer/SubContainer'

export default function ReadPost() {
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { search } = useLocation()

  const id = search.split('=')[1]

  const getPost = async (query: string) => {
    const id = query.split('=')[1]

    getPostById(id)
      .then(response => {
        setPost(response.data.post)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (search !== null && search !== undefined) {
      getPost(search)
    }
  }, [search])

  return (
    <Container className='readpost'>
      <SubContainer className='readpost-container'>
        {isLoading && <PostFullViewSkeleton />}
        {post && <PostFullView post={post} />}
        <CommentsView postId={id} />
      </SubContainer>
    </Container>
  )
}
