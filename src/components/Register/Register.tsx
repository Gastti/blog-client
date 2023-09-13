import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
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

export default function RegisterPage() {
  // const formik = useFormik({
  //   initialValues: {
  //     username: '',
  //     firstname: '',
  //     lastname: '',
  //     email: '',
  //     password: ''
  //   },
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // })

  return (
    <Formik
      initialValues={{
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }}
      validationSchema={RegisterSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {() => (
        <form>
          <Field name="username" className='custom-input' placeholder='Nombre de usuario' />
          <ErrorMessage name="username" />
          <Field name="firstname" className='custom-input' placeholder='Nombre' />
          <ErrorMessage name="firstname" />
          <Field name="lastname" className='custom-input' placeholder='Apellido' />
          <ErrorMessage name="lastname" />
          <Field name="email" className='custom-input' placeholder='Correo electronico' />
          <ErrorMessage name="email" />
          <Field name="password" className='custom-input' placeholder='Contraseña' type='password' />
          <ErrorMessage name="password" />
          <button type='submit'>Registrarse</button>
        </form>
      )}
      {/* <form onSubmit={formik.handleSubmit}>
        <Input
          id="username"
          name="username"
          placeholder='Nombre de usuario'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <Input
          id="firstname"
          name="firstName"
          placeholder='Nombre'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstname}
        />

        <Input
          id="lastname"
          name="lastName"
          placeholder='Apellido'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastname}
        />

        <Input
          id="email"
          name="email"
          placeholder='Correo electronico'
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <Input
          id="password"
          name="password"
          placeholder='Contraseña'
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form> */}
    </ Formik >
  );
}