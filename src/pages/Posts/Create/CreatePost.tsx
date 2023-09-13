import './CreatePost.css'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import Container from '../../../components/Container/Container'
import SubContainer from '../../../components/SubContainer/SubContainer'
import Input from '../../../components/Input/Input'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

interface IPost {
  title: string,
  category: string,
  content: string,
  tags: Array<string>,
  image: File | null;
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNkNDc2ZmI3NDNiYzAyYmRiMzBiNDYiLCJ1c2VyUm9sZSI6IndyaXRlciIsImlhdCI6MTY5NDU1MTQ5MywiZXhwIjoxNjk0NTU1MDkzfQ.9mROMpS-Ihe0s4PcRpqezc7BrcntUUnoj0MtC0dkF78'

export default function CreatePost() {
  const [post, setPost] = useState<IPost>({
    title: '',
    category: '',
    content: '',
    tags: ['asd', 'dsa', 'sda'],
    image: null
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true)

    await axios.post('https://blog-api-nqc2.onrender.com/api/v1/posts', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })

  }

  return (
    <Container className='create-post-container'>
      {!isLoading && (
        <SubContainer className='create-post'>
          <form onSubmit={handleSubmit}>
            <div className='post-actions'>
              <span>Redactar publicación</span>
              <button className='btn-post-submit' type='submit'>
                Publicar
                <KeyboardArrowRightOutlinedIcon />
              </button>
            </div>
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
            <Input type='file' name='image' placeholder='Portada'
              onChange={handleFileOnChange}
            />
          </form>
          <ReactQuill theme="snow" value={post.content} onChange={(content) => setPost({ ...post, content })} />
        </SubContainer>
      )}
    </Container>
  )
}
