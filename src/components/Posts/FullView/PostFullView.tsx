import React from 'react'
import { Post } from '../../../types'

export default function PostFullView({ post }: { post: Post }) {

  return (
    <article className='article' key={post._id}>
      <div className='article-author'>
        <div className='author-avatar'>
          <img src={post.author.avatar} />
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
        <img src={post.image.url} />
      </div>
      <div className='article-tags'>
        {post.tags.map(tag => <span>{tag}</span>)}
      </div>
      <div className='article-content'>
        {post.content}
      </div>
    </article>
  )
}
