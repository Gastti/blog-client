import { useEffect, useState } from 'react'
import { Post } from '../../../types'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Container from '../../../components/Container/Container'
import PostFullView from '../../../components/Posts/FullView/PostFullView'
import Loader from '../../../components/Loader/Loader'

export default function ReadPost() {
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { search } = useLocation()

  const getPost = async (query: string) => {
    const id = query.split('=')[1]
    const API_URL = 'https://blog-api-nqc2.onrender.com/api/v1'
    const API_ENDPOINT = '/posts/find/'
    axios.get(`${API_URL}${API_ENDPOINT}${id}`)
      .then(response => {
        console.log(response.data.post)
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
  }, [search])

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
