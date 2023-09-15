import './CreatePost.css'
import 'react-quill/dist/quill.snow.css'
import Editor from '../../../components/Editor/Editor'
import Container from '../../../components/Container/Container'
import { methods } from '../../../enums'

export default function CreatePost() {
  return (
    <Container className='create-post-container'>
      <Editor method={methods.POST} />
    </Container>
  )
}
