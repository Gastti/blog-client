import './CreatePostPage.css'
import 'react-quill/dist/quill.snow.css'
import Container from '../../../components/Container/Container'
import CreatePost from '../../../components/CreatePost/CreatePost'

export default function CreatePostPage() {
  return (
    <Container className='create-post-container'>
      <CreatePost />
    </Container>
  )
}
