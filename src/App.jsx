import Reserva from './pages/Reserva';

import Calendar from './components/Calendar';
import LoginButton from './components/LoginButton';
import { UserContext } from './context/userContext';
import { useContext } from 'react';

const docEmail = 'santiagosarmiento92@gmail.com';
function App() {
	const { user } = useContext(UserContext);

	return (
		<>
			<Reserva />
			<hr />
			{!user && <LoginButton />}

			<Calendar doctorEmail={docEmail} />
		</>
	);
}

export default App;
