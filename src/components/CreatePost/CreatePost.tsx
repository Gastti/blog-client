import { ErrorMessage, Field, Formik } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Form from '../Form/Form'
import SubContainer from '../SubContainer/SubContainer'
import './CreatePost.css'
import Loader from '../Loader/Loader'
import { PostEntry } from '../../types'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { useNavigate } from 'react-router-dom'
import { methods } from '../../enums'
import useAxios from '../../hooks/useAxios'
import PostEditor from '../Posts/Editor/PostEditor'
import { useAlert } from '../../hooks/useAlert'

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
  const api = useAxios()
  const navigate = useNavigate()
  const { createToast } = useAlert()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [content, setContent] = useState<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat est velit egestas dui id ornare arcu odio ut. Feugiat vivamus at augue eget arcu dictum varius duis. Auctor eu augue ut lectus arcu bibendum. Quam vulputate dignissim suspendisse in est ante in nibh mauris. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Facilisis gravida neque convallis a cras. Congue mauris rhoncus aenean vel. Quis auctor elit sed vulputate mi sit. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Id consectetur purus ut faucibus pulvinar elementum. Integer feugiat scelerisque varius morbi enim nunc faucibus. Amet venenatis urna cursus eget nunc scelerisque. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Suspendisse sed nisi lacus sed viverra tellus in hac. Neque sodales ut etiam sit amet nisl purus. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Volutpat blandit aliquam etiam erat velit. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Ullamcorper velit sed ullamcorper morbi. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Consectetur a erat nam at lectus urna duis convallis. Dignissim cras tincidunt lobortis feugiat vivamus. Integer enim neque volutpat ac.")
  const [postId, setPostId] = useState<string>('')

  const initialValues: PostEntry = {
    title: 'Publicación de prueba',
    content: '',
    category: 'Testing',
    image: undefined,
    tags: ''
  }

  const renderError = (msg: string) => {
    return (
      <span><ErrorOutlineOutlinedIcon sx={{ fontSize: 16 }} />{msg}</span>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    console.log(content);
  };

  const onSubmit = async (values: PostEntry) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', content);
    formData.append('category', values.category);
    formData.append('tags', values.tags);

    if (values.image) {
      formData.append('image', values.image);
    }

    const response = await api.post('/posts', formData)
    if (response.status === 200) {
      setSubmitted(true)
      setPostId(response.data.data._id)
      createToast({ children: 'Publicado con exito.', variant: 'success' })
    } else {
      createToast({ children: 'No se ha podido publicar. Intenta mas tarde.', variant: 'danger' })
    }
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

                <PostEditor
                  onChange={handleChange}
                  value={content}
                />
              </Form>
            )}
          </>
        )}
      </ Formik >

    </SubContainer>
  )
}
