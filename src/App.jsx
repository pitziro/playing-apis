import { useState } from 'react';
import CalendlyEmbed from './Calendly';

function App() {
	const [isScheduled, setIsScheduled] = useState(false);

	const userName = 'Manuel Sarmiento';
	const userEmail = 'pitziro@gmail.com';

	const handleSchedule = () => {
		setshowBooking((prev) => !prev);

		setTimeout(() => {
			setIsScheduled(true);
		}, 7000);
	};

	return (
		<div>
			<h1>Reserva tu cita</h1>
			{!isScheduled ? (
				<CalendlyEmbed
					userName={userName}
					userEmail={userEmail}
					onEventScheduled={handleSchedule}
				/>
			) : (
				<div>
					<h2>¡Reserva completada con éxito!</h2>
					<p>Gracias por agendar tu cita.</p>
					<button type='button' onClick={() => setIsScheduled(false)}>
						Volver a la aplicación
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
