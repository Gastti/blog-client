import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Post() {
  const {id} = useParams()
  const [data, setData] = useState([])
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/find/${id}`)

      if (response.ok) {
        const data = await response.json()
        setData(data.data)
        setPost(data.post)
        setLoading(false)
        console.log(data)
      } else {
        const data = await response.json()
        console.log("ERROR", data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(post)

  return (
    <div>
      {
        (post !== null && !loading) && (
          <div>
            <div>FUNCIONA</div>
            <span>{post.createdAt}</span>
            <h1><a href={`http://localhost:5173/post/${post._id}`}>{post.title}</a></h1>
            <div className='tags'>{post.tags.map((tag) => <span>{tag}</span>)}</div>
            <p>{post.content}</p>
            <div>
              <img src={post.author.avatar}/>
              <h2>{post.author.firstname} {post.author.lastname}</h2>
            </div>
          </div>
        )
      }
    </div>
    )
}
