import './EditPost.css'
import 'react-quill/dist/quill.snow.css'
import Container from '../../../components/Container/Container'
// import { methods } from '../../../enums'
// import { useLocation } from 'react-router-dom'
// import { getPostById } from '../../../services/posts'
// import { useEffect, useState } from 'react'
// import { PostEntry } from '../../../types'

export default function EditPost() {
  // const [post, setPost] = useState<PostEntry>({})
  // const { search } = useLocation()

  // const getPost = async (query: string) => {
  //   const id = query.split('=')[1]

  //   getPostById(id)
  //     .then(response => {
  //       const { post } = response.data
  //       const postValues = {
  //         title: post.title,
  //         category: post.category,
  //         tags: post.tags.join(','),
  //         content: post.content
  //       }
  //       setPost(postValues)
  //     })
  //     .catch(error => console.log(error))
  // }

  // console.log(post)

  // useEffect(() => {
  //   if (search !== null && search !== undefined) {
  //     getPost(search)
  //   }
  // }, [search])

  return (
    <Container className='create-post-container'>
      {/* <Editor method={methods.PUT} post={post} /> */}
    </Container>
  )
}
