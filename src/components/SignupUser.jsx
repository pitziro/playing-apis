import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import '../app.css'

const regexPhone = /^(9)[0-9]{8}$/

const SignupSchema = Yup.object().shape({
   nombres: Yup.string()
      .required('Nombres es requerido')
      .min(4, 'Introduza un nombre válido(4)'),
   apellidos: Yup.string()
      .required('Apellidos es requerido')
      .min(4, 'Introduza un nombre válido (4)'),
   movil: Yup.string()
      .matches(
         regexPhone,
         'El número de teléfono debe empezar por 9 y tener 9 dígitos'
      )
      .required('Movil es requerido'),
   email: Yup.string()
      .required('Email es requerido')
      .email('Introduza un email válido'),
   password: Yup.string()
      .required('Password es requerido')
      .min(5, 'Introduza una contraseña válida (5)'),
})

const SignUpForm = () => {
   return (
      <Formik
         initialValues={{
            nombres: '',
            apellidos: '',
            movil: '',
            email: '',
            password: '',
         }}
         validationSchema={SignupSchema}
         onSubmit={values => {
            console.log('Formulario enviado')
            console.log(values)
         }}
      >
         {({ errors, touched, isSubmitting }) => (
            <Form className="formulario">
               <Field
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  className={
                     touched.nombres && errors.nombres ? 'inputError' : ''
                  }
               />
               {touched.nombres && errors.nombres && (
                  <span className="errorDetail">{errors.nombres}</span>
               )}
               <Field
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  className={
                     touched.apellidos && errors.apellidos ? 'inputError' : ''
                  }
               />
               {touched.apellidos && errors.apellidos && (
                  <span className="errorDetail">{errors.apellidos}</span>
               )}
               <Field
                  type="text"
                  name="movil"
                  placeholder="Celular"
                  className={touched.movil && errors.movil ? 'inputError' : ''}
               />
               {touched.movil && errors.movil && (
                  <span className="errorDetail">{errors.movil}</span>
               )}
               <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={touched.email && errors.email ? 'inputError' : ''}
               />
               {touched.email && errors.email && (
                  <span className="errorDetail">{errors.email}</span>
               )}
               <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={
                     touched.password && errors.password ? 'inputError' : ''
                  }
               />
               {touched.password && errors.password && (
                  <span className="errorDetail">{errors.password}</span>
               )}

               <button disabled={isSubmitting} type="submit">
                  Registrarme
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default SignUpForm
