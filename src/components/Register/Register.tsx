import './Register.css'
import { useState } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { register } from '../../services/auth';
import SubContainer from '../SubContainer/SubContainer';
import { RegisterValues } from '../../types';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Form from '../Form/Form';

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

export default function Register() {
  const [submitted, setSubmitted] = useState<boolean>(false)
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
    <SubContainer className='register'>
      <div className='about-message'>
        <h2>Blog<span>.</span></h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={(values) => {
          console.log('Submit')
          register(values)
            .then(response => {
              console.log(response)
              setSubmitted(true)
            })
            .catch(error => {
              console.log(error)
            })
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div className='register-form-container'>
            <div className='register-form-content'>
              {(isSubmitting && !submitted) && <Loader />}
              {
                (submitted) &&
                <p className='welcome-message'>
                  Tu cuenta ha sido registrada con exito, esperamos que disfrutes de <b>Blog</b><span>.</span>
                </p>
              }
              {(!isSubmitting) && (
                <Form
                  method='POST'
                  onSubmit={handleSubmit}
                >
                  <p className='register-message'>Regístrate para ver publicaciones de tus escritores favoritos.</p>
                  <Field name="username" className='custom-input' placeholder='Nombre de usuario' />
                  <ErrorMessage name="username" render={renderError} />
                  <Field name="firstname" className='custom-input' placeholder='Nombre' />
                  <ErrorMessage name="firstname" render={renderError} />
                  <Field name="lastname" className='custom-input' placeholder='Apellido' />
                  <ErrorMessage name="lastname" render={renderError} />
                  <Field name="email" className='custom-input' placeholder='Correo electronico' />
                  <ErrorMessage name="email" render={renderError} />
                  <Field name="password" className='custom-input' placeholder='Contraseña' type='password' />
                  <ErrorMessage name="password" render={renderError} />
                  <p className='policy-agreement'>Al registrarte, aceptas nuestras Condiciones, nuestra Política de privacidad y nuestra Política de cookies.</p>
                  <button type='submit' className='btn-auth-submit' disabled={isSubmitting}>Registrarse</button>
                </Form>
              )}
            </div>
            <div className='login-message'>
              <p>¿Tienes cuenta? <Link to='/auth/login'>Entrar</Link></p>
            </div>
          </div>
        )}
      </ Formik >
    </SubContainer>
  );
}