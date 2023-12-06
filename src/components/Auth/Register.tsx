import './Auth.css'
import { useState } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { register } from '../../services/auth';
import { RegisterValues } from '../../types';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import AuthWelcome from '../AuthWelcome/AuthWelcome';
import CustomLoader from '../CustomLoader/CustomLoader';
import { useAlert } from '../../hooks/useAlert';
import Button from '../Button/Button';

const RegisterValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Debe tener al menos 3 carácteres.')
    .max(35, 'No debe tener más de 35 caracteres.')
    .required('El nombre de usuario es obligatorio.'),
  firstname: Yup.string()
    .min(3, 'Debe tener al menos 3 carácteres.')
    .max(35, 'No debe tener más de 35 caracteres.')
    .required('El nombre es obligatorio.'),
  lastname: Yup.string()
    .min(3, 'Debe tener al menos 3 carácteres.')
    .max(35, 'No debe tener más de 35 caracteres.')
    .required('El apellido es obligatorio.'),
  email: Yup.string()
    .email('Debe ser un email válido.')
    .min(8, 'Debe tener al menos 3 carácteres.')
    .max(50, 'No debe tener más de 35 caracteres.')
    .required('El email es obligatorio.'),
  password: Yup.string()
    .min(8, 'Debe tener al menos 8 carácteres.')
    .max(30, 'No debe tener más de 30 caracteres.')
    .required('La contraseña es obligatoria.'),
});

const errors: { [key: number]: string } = {
  400: 'Ha ocurrido un error. Vuelve a intentarlo.',
  409: 'Ya existe una cuenta con el correo/usuario que has escogido.',
  500: 'Estamos teniendo problemas en el servidor. Intentalo mas tarde.'
}

export default function Register() {
  const { createToast } = useAlert()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [responseError, setResponseError] = useState<string | null>(null)

  const initialValues: RegisterValues = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }

  const renderError = (msg: string) => {
    return (
      <span><ErrorOutlineOutlinedIcon sx={{ fontSize: 16 }} />{msg}</span>
    )
  }

  return (
    <div className='auth'>
      <AuthWelcome />
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={(values) => {
          setIsSubmitting(true)
          register(values)
            .then(() => {
              setSubmitted(true)
              setIsSubmitting(false)
              createToast({ children: 'Tu cuenta ha sido registrada.', variant: 'success' })
              navigate('/auth/login')
            })
            .catch(error => {
              setIsSubmitting(false)
              const errorStatus: number = error.response?.status || 500
              setResponseError(errors[errorStatus])

              if (errorStatus === 500) {
                createToast({ children: errors['500'], variant: 'danger' })
              }
            })
        }}
      >
        {({ handleSubmit }) => (
          <div className='auth-form-container'>
            <div className='auth-form-content'>
              {(isSubmitting && !submitted) && <CustomLoader />}
              {
                (submitted) &&
                <p className='welcome-message'>
                  Tu cuenta ha sido registrada con exito, esperamos que disfrutes de <b>Blog</b><span>.</span>
                </p>
              }
              <Form
                method='POST'
                onSubmit={handleSubmit}
              >
                <p className='form-title'>Regístrate para ver publicaciones de tus escritores favoritos.</p>
                <Field name="username" placeholder='Nombre de usuario' />
                <ErrorMessage name="username" render={renderError} />
                <Field name="firstname" placeholder='Nombre' />
                <ErrorMessage name="firstname" render={renderError} />
                <Field name="lastname" placeholder='Apellido' />
                <ErrorMessage name="lastname" render={renderError} />
                <Field name="email" placeholder='Correo electronico' />
                <ErrorMessage name="email" render={renderError} />
                <Field name="password" placeholder='Contraseña' type='password' />
                <ErrorMessage name="password" render={renderError} />

                <p className='policy-agreement'>Al registrarte, aceptas nuestras Condiciones, nuestra Política de privacidad y nuestra Política de cookies.</p>

                <Button type='submit' variant='primary' disabled={isSubmitting}>Crear cuenta</Button>

                {responseError && <span style={{ margin: '0 auto' }}>{responseError}</span>}
              </Form>
            </div>
            <div className='auth-footer'>
              <p>¿Tienes cuenta? <Link to='/auth/login'>Entrar</Link></p>
            </div>
          </div>
        )}
      </ Formik >
    </div>
  );
}