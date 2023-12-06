import './Auth.css'
import { useEffect, useState } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { login } from '../../services/auth';
import { LoginValues } from '../../types';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import { useSession } from '../../hooks/useSession';
import { handleLocalStorageTokens } from '../../utils/tokenUtils';
import AuthWelcome from '../AuthWelcome/AuthWelcome';
import CustomLoader from '../CustomLoader/CustomLoader';
import { useAlert } from '../../hooks/useAlert';
import Button from '../Button/Button';

const RegisterValidationSchema = Yup.object().shape({
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
  401: 'Tu contraseña no es correcta. Vuelve a intentarlo.',
  404: 'No existe una cuenta asociada al correo/usuario que has introducido.',
  500: 'Estamos teniendo problemas en el servidor. Intentalo mas tarde.'
}

export default function Register() {
  const { setIsLogged } = useSession()
  const { createToast } = useAlert()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [responseError, setResponseError] = useState<string | null>(null)
  const initialValues: LoginValues = {
    email: '',
    password: ''
  }

  const renderError = (msg: string) => {
    return (
      <span><ErrorOutlineOutlinedIcon sx={{ fontSize: 16 }} />{msg}</span>
    )
  }

  const onSubmit = (values: LoginValues) => {
    setIsSubmitting(true)
    login(values)
      .then(response => {
        setIsSubmitting(false)
        const { data } = response
        handleLocalStorageTokens(data.access, data.refresh)
        setSubmitted(true)
        setIsLogged(true)
        createToast({ children: 'Haz iniciado sesión.', variant: 'success' })
        navigate('/')
      })
      .catch(error => {
        setIsSubmitting(false)
        const errorStatus: number = error.response?.status || 500
        setResponseError(errors[errorStatus])

        if (errorStatus === 500) {
          createToast({ children: errors['500'], variant: 'danger' })
        }
      })
  }

  useEffect(() => {
    if (submitted) {
      navigate('/')
      window.location.reload()
    }
  }, [submitted, navigate])

  return (
    <div className='auth'>
      <AuthWelcome />
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <div className='auth-form-container'>
            <div className='auth-form-content'>
              {(isSubmitting && !submitted) && <CustomLoader />}
              <Form
                method='POST'
                onSubmit={handleSubmit}
              >
                <p className='form-title'>Inicia sesión para una experiencia completa.</p>
                <Field name="email" placeholder='Correo electronico' />
                <ErrorMessage name="email" render={renderError} />
                <Field name="password" placeholder='Contraseña' type='password' />
                <ErrorMessage name="password" render={renderError} />
                <Button type='submit' variant='primary' disabled={isSubmitting}>Iniciar sesión</Button>
                {responseError && <span style={{ margin: '0 auto' }}>{responseError}</span>}
              </Form>

            </div>
            <div className='auth-footer'>
              <p>¿No tienes cuenta? <Link to='/auth/register'>Registrarse</Link></p>
            </div>
          </div>
        )}
      </ Formik >
    </div>
  );
}