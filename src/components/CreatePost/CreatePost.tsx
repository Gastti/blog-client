import { ErrorMessage, Field, Formik } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Form from '../Form/Form'
import SubContainer from '../SubContainer/SubContainer'
import './CreatePost.css'
import Loader from '../Loader/Loader'
import { PostEntry } from '../../types'
import { sendNewPost } from '../../services/posts'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'
import { methods } from '../../enums'
import { refreshToken } from '../../utils/tokenUtils'

const PostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Debe tener al menos 4 carácteres.')
    .max(55, 'No debe tener más de 55 caracteres.')
    .required('El titulo es obligatorio.'),
  category: Yup.string()
    .min(3, 'Debe tener al menos 3 carácteres.')
    .max(20, 'No debe tener más de 20 caracteres.')
    .required('La categoria es obligatoria.'),
  tags: Yup.string()
    .min(3, 'Debe tener al menos 3 carácteres.')
    .max(55, 'No debe tener más de 55 caracteres.')
    .required('El titulo es obligatorio.'),
  image: Yup.string()
    .required('Sube una imagen para la portada de tu publicación.'),
});

export default function CreatePost() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [postId, setPostId] = useState<string>('')
  const [error, setError] = useState('')

  const initialValues: PostEntry = {
    title: '',
    content: '',
    category: '',
    image: undefined,
    tags: ''
  }

  const renderError = (msg: string) => {
    return (
      <span><ErrorOutlineOutlinedIcon sx={{ fontSize: 16 }} />{msg}</span>
    )
  }

  const onSubmit = async (values: PostEntry) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', content);
    formData.append('category', values.category);
    formData.append('tags', values.tags);
    if (values.image) {
      formData.append('image', values.image);
    }

    sendNewPost(formData, localStorage.access)
      .then((response) => {
        setSubmitted(true)
        setPostId(response.data.data._id)
      })
      .catch((error) => {
        if (error.response.status === 401) refreshToken()
        setError('Error al enviar el nuevo post, intenta de nuevo.')
      })
  }

  useEffect(() => {
    if (submitted) navigate(`/read?post=${postId}`)
  }, [submitted, navigate, postId])

  return (
    <SubContainer className='editor-container'>
      <Formik
        initialValues={initialValues}
        validationSchema={PostValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isSubmitting, setFieldValue }) => (
          <>
            {error && <p>{error}</p>}
            {(isSubmitting && !submitted) && <Loader />}
            {(!isSubmitting) && (
              <Form
                method={methods.POST}
                onSubmit={handleSubmit}
              >
                <div className='post-actions'>
                  <span>Redactar publicación</span>
                  <button className='btn-post-submit' type='submit' disabled={isSubmitting}>
                    Publicar
                    <KeyboardArrowRightOutlinedIcon />
                  </button>
                </div>
                <Field name="title" placeholder='Escribe el titulo' />
                <ErrorMessage name="title" render={renderError} />
                <Field name="category" placeholder='Escribe la categoria' />
                <ErrorMessage name="category" render={renderError} />
                <Field name="tags" placeholder='Escribe los tags asi: taguno,tagdos,tagtres' />
                <ErrorMessage name="tags" render={renderError} />
                <input
                  name="image"
                  type="file"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files) {
                      setFieldValue("image", event.target.files[0])
                    }
                  }}
                />
                <ErrorMessage name="image" render={renderError} />
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  placeholder='Escribe el contenido de tu publicación' />
              </Form>
            )}
          </>
        )}
      </ Formik >

    </SubContainer>
  )
}