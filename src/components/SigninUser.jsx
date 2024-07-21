import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import '../app.css'

const SignupSchema = Yup.object().shape({
   email: Yup.string()
      .required('Email es requerido')
      .email('Introduza un email válido'),
   password: Yup.string()
      .required('Password es requerido')
      .min(5, 'Introduza una contraseña válida (5)'),
})

const LoginForm = () => {
   return (
      <Formik
         initialValues={{
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

export default LoginForm
