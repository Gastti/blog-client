import './Home.css'
import { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import { Post } from '../../types'
import axios from 'axios'
import PostFullView from '../../components/Posts/FullView/PostFullView'

export default function Search() {
  const [posts, setPosts] = useState<Array<Post>>([])

  const getPosts = async () => {
    const API_URL = 'http://localhost:3000/api/v1'
    const API_ENDPOINT = '/posts'
    axios.get(`${API_URL}${API_ENDPOINT}`)
    .then(response => {
      setPosts(response.data.data)
      console.log(response)
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container className='home'>
      {posts.map(post => (
        <PostFullView post={post}/>
      ))}
    </Container>
  )
}