import './Home.css'
import { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import { Posts } from '../../types'
import axios from 'axios'

export default function Search() {
  const [posts, setPosts] = useState<Array<Posts>>([])

  const getPosts = async () => {
    const API_URL = 'http://localhost:3000/api/v1'
    const API_ENDPOINT = '/posts'
    axios.get(`${API_URL}${API_ENDPOINT}`)
    .then(response => setPosts(response.data.data))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container className='home'>
      {posts.map(post => (
        <article className='article' key={post._id}>
          <div className='article-author'>
            <div className='author-avatar'>
              <img src={post.author.avatar}/>
            </div>
            <div>
              <p className='author-fullname'>
                {post.author.firstname} {post.author.lastname}
              </p>
              <p className='author-username'>
                @{post.author.username}
              </p>
            </div>
          </div>
          <div className="article-header">
            <span>Publicado el 10 de Septiembre, 2023</span>
            <h2>{post.title}</h2>
          </div>
          <div className='article-cover'>
            <img src={post.image}/>
          </div>
          <div className='article-tags'>
            {post.tags.map(tag => <span>{tag}</span>)}
          </div>
          <div className='article-content'>
            {post.content}
          </div>
        </article>
      ))}
    </Container>
  )
}