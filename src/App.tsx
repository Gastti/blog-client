import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/posts")

      if (response.ok) {
        const data = await response.json()
        setPosts(data.data)

        console.log(data)
      } else {
        const data = await response.json()
        console.log("ERROR", data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        posts?.map(post => (
          <div>
            <span>{post.createdAt}</span>
            <h1>{post.title}</h1>
            <div className='tags'>{post.tags.map((tag) => <span>{tag}</span>)}</div>
            <p>{post.content}</p>
            <div>
              <img src={post.author.avatar}/>
              <h2>{post.author.firstname} {post.author.lastname}</h2>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default App
