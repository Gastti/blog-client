import './CreatePost.css'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';

interface IPost {
  title: string,
  category: string,
  content: string,
  tags: Array<string>,
  image: File | null;
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNkNDc2NGI3NDNiYzAyYmRiMzBiNDIiLCJ1c2VyUm9sZSI6IndyaXRlciIsImlhdCI6MTY5NDI4NTA4OSwiZXhwIjoxNjk0Mjg4Njg5fQ.fo9D0CwI7XXWiNbWz2qozzloFdXjnKM3eBUeSVyt_OQ'

export default function CreatePost() {
  const [post, setPost] = useState<IPost>({
    title: '',
    category: '',
    content: '',
    tags: ['asd', 'dsa', 'sda'],
    image: null
  })

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0] as File;
      setPost({ ...post, image: selectedFile });
    }
  }

  const handleFieldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    console.log(post)

    if (post.title !== null) {
      formData.append('title', post.title)
    }

    if (post.content !== null) {
      formData.append('content', post.content)
    }

    if (post.category !== null) {
      formData.append('category', post.category)
    }

    if (post.tags !== null) {
      const joinedTags = post.tags.join(',')
      formData.append('tags', JSON.stringify(joinedTags))
    }

    if (post.image !== null) {
      formData.append('image', post.image)
    }

    const response = await axios.post('http://localhost:3000/api/v1/posts', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })

    console.log(response)
  }

  return (
    <Container>
      <h2>Create Post Route</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Titulo'
          type='text'
          name='title'
          onChange={handleFieldOnChange}
        />

        <Input
          placeholder='Categoria'
          type='text'
          name='category'
          onChange={handleFieldOnChange}
        />

        {/* <label>Contenido</label>
        <textarea
          name='content'
          onChange={(e) => {
            setPost({ ...post, content: e.target.value })
          }}
        ></textarea> */}

        {/* <label>Tags</label>
        <input type='text' name='tags'
          onChange={handleFieldOnChange}
        /> */}

        <label>Portada</label>
        <input type='file' name='image'
          onChange={handleFileOnChange}
        />

        <button type='submit'>Publicar</button>
      </form>
      <ReactQuill theme="snow" value={post.content} onChange={(content) => setPost({ ...post, content })} />
    </Container>
  )
}
