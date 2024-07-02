import { useEffect } from 'react';
import { PopupButton } from 'react-calendly';

const CALENDLY_URL = 'https://calendly.com/perspectivascap/agendarcita';

const CalendlyEmbed = ({ userName, userEmail, onEventScheduled }) => {
	useEffect(() => {
		window.addEventListener('message', (e) => {
			if (
				e.origin === 'https://calendly.com' &&
				e.data.event &&
				e.data.event.indexOf('calendly.event_scheduled') === 0
			) {
				onEventScheduled();
			}
		});
		return () => {
			window.removeEventListener('message', null);
		};
	}, [onEventScheduled]);

	return (
		<div className='App'>
			<PopupButton
				url={CALENDLY_URL}
				rootElement={document.getElementById('root')}
				text='Click here to schedule!'
				textColor='#ffffff'
				color='#00a2ff'
				prefill={{ name: userName, email: userEmail }}
			/>
		</div>
	);
};

export default CalendlyEmbed;
