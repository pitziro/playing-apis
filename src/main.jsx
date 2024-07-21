import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'

const googleClientId =
   '784179335763-377bo6t304c6tauid29723bkim1jfuci.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
   //   <React.StrictMode>
   <GoogleOAuthProvider clientId={googleClientId}>
      <UserProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </UserProvider>
   </GoogleOAuthProvider>
   //   </React.StrictMode>,
)
