import './Home.css'
import { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import { Post } from '../../types'
import axios from 'axios'
import PostFullView from '../../components/Posts/FullView/PostFullView'

export default function Search() {
  const [posts, setPosts] = useState<Array<Post>>([])

  const getPosts = async () => {
    const API_URL = 'https://blog-api-nqc2.onrender.com/api/v1'
    const API_ENDPOINT = '/posts'
    axios.get(`${API_URL}${API_ENDPOINT}`)
      .then(response => {
        setPosts(response.data.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container className='home'>
      <div className='posts-container'>
        {posts.map(post => (
          <PostFullView key={post._id} post={post} />
        ))}
      </div>
    </Container>
  )
}