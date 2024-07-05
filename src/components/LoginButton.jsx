import { useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const Login = () => {
	const { setUser } = useContext(UserContext);

	const login = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			try {
				const userInfo = await axios.get(
					'https://www.googleapis.com/oauth2/v3/userinfo',
					{
						headers: { Authorization: `Bearer ${codeResponse.access_token}` },
					}
				);

				const userData = {
					email: userInfo.data.email,
					access_token: codeResponse.access_token,
				};

				setUser(userData);
				localStorage.setItem('user', JSON.stringify(userData));
				console.log('User data saved:', userData);
			} catch (error) {
				console.error('Error fetching user info:', error);
			}
		},
		scope:
			'email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email',
	});

	return (
		<button type='button' onClick={() => login()}>
			Sign in with Google
		</button>
	);
};

export default Login;
