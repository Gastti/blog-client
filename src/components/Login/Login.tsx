import './Login.css'
import { useEffect, useState } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { login } from '../../services/auth';
import SubContainer from '../SubContainer/SubContainer';
import { LoginValues } from '../../types';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Form from '../Form/Form';
// import { getMyUser } from '../../services/user';
import { useSession } from '../../hooks/useSession';
import { handleLocalStorageTokens } from '../../utils/tokenUtils';

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

export default function Register() {
  const { setIsLogged } = useSession()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState<boolean>(false)
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
    login(values)
      .then(response => {
        const { data } = response
        handleLocalStorageTokens(data.access, data.refresh)
        setSubmitted(true)
        setIsLogged(true)
        navigate('/')
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (submitted) {
      navigate('/')
      window.location.reload()
    }
  }, [submitted, navigate])

  return (
    <SubContainer className='register'>
      <div className='about-message'>
        <h2>Blog<span>.</span></h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div className='register-form-container'>
            <div className='register-form-content'>
              {(isSubmitting && !submitted) && <Loader />}

              {(!isSubmitting) && (
                <Form
                  method='POST'
                  onSubmit={handleSubmit}
                >
                  <p className='form-title'>Inicia sesión para una experiencia completa.</p>
                  <Field name="email" placeholder='Correo electronico' />
                  <ErrorMessage name="email" render={renderError} />
                  <Field name="password" placeholder='Contraseña' type='password' />
                  <ErrorMessage name="password" render={renderError} />
                  <button type='submit' className='form-btn-submit' disabled={isSubmitting}>Iniciar sesion</button>
                </Form>
              )}
            </div>
            <div className='login-message'>
              <p>¿No tienes cuenta? <Link to='/auth/register'>Registrarse</Link></p>
            </div>
          </div>
        )}
      </ Formik >
    </SubContainer>
  );
}