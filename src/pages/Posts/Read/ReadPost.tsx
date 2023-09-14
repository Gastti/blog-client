import { useEffect, useState } from 'react'
import { Post } from '../../../types'
import { useLocation } from 'react-router-dom'
import Container from '../../../components/Container/Container'
import PostFullView from '../../../components/Posts/FullView/PostFullView'
import Loader from '../../../components/Loader/Loader'
import { getPostById } from '../../../services/posts'

export default function ReadPost() {
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { search } = useLocation()

  const getPost = async (query: string) => {
    const id = query.split('=')[1]

    getPostById(id)
      .then(response => {
        setPost(response.data.post)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  console.log(search)

  useEffect(() => {
    if (search !== null && search !== undefined) {
      getPost(search)
    }
  }, [])

  return (
    <Container className='readpost'>
      {isLoading && <Loader />}
      {post && <PostFullView post={post} />}
      <br></br>
      <br></br>
      <br></br>
    </Container>
  )
}
