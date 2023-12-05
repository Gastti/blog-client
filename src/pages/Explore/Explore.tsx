import './Explore.css'
import { useState, ChangeEvent, useEffect } from 'react'
import Container from '../../components/Container/Container'
import { useAlert } from '../../hooks/useAlert'
import Form from '../../components/Form/Form'
import SubContainer from '../../components/SubContainer/SubContainer'
import PostSmallView from '../../components/Posts/SmallView/PostSmallView'
import { Post } from '../../types'
import { findPostByTitle, getAllPosts } from '../../services/posts'

export default function Explore() {
  const [searchParam, setSearchParam] = useState('')
  const [results, setResults] = useState<Array<Post>>([])
  const { createToast } = useAlert()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value)
  }

  const handleSubmit = async () => {
    const response = await findPostByTitle(searchParam)

    if (response.status !== 200) {
      createToast({ children: 'Ha ocurrido un problema en el servidor. Intenta otra vez.', variant: 'danger' })
      return
    }

    setResults(response.data.data)
  }

  const getLatestPosts = async () => {
    const response = await getAllPosts()

    if (response.status !== 200) {
      createToast({ children: 'Ha ocurrido un problema en el servidor. Intenta otra vez.', variant: 'danger' })
    }

    setResults(response.data.data)
  }

  useEffect(() => {
    getLatestPosts()
  }, [])

  return (
    <Container>
      <SubContainer className='explore-view'>
        <Form method='GET' onSubmit={handleSubmit}>
          <input type='text' value={searchParam} onChange={handleChange} placeholder='Explorar...'/>
        </Form>
        <div className='explore-view-results'>
          {results && results.length > 0 && results.map((post) => (
            <PostSmallView key={post._id} post={post} />
          ))}
        </div>
      </SubContainer>
    </Container>
  )
}