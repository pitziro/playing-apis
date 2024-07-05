import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/userContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId =
	'784179335763-377bo6t304c6tauid29723bkim1jfuci.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
	//   <React.StrictMode>
	<GoogleOAuthProvider clientId={googleClientId}>
		<UserProvider>
			<App />
		</UserProvider>
	</GoogleOAuthProvider>
	//   </React.StrictMode>,
);
