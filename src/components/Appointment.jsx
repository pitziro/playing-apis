import axios from 'axios';
import { format, addMinutes } from 'date-fns';

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

const AppointmentModal = ({
	isOpen,
	onClose,
	slot,
	doctorEmail,
	patientEmail,
	accessToken,
}) => {
	if (!isOpen || !slot) return null;

	const endTime = addMinutes(slot.start, 60);

	const handleConfirm = async () => {
		console.log(slot.start.toISOString());
		console.log(endTime.toISOString());
		try {
			await axios.post(
				`${GOOGLE_CALENDAR_API}/calendars/primary/events`,
				{
					summary: 'Psyco Appointment',
					description: `Appointment with ${patientEmail}`,
					start: {
						dateTime: slot.start.toISOString(),
						timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
					end: {
						dateTime: endTime.toISOString(),
						timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
					attendees: [{ email: patientEmail }, { email: doctorEmail }],
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('Confirming appointment:', {
				slot,
				doctorEmail,
				patientEmail,
			});
			onClose();
		} catch (error) {
			if (error.response) {
				console.error('Error response:', error.response.data);
				console.error('Error status:', error.response.status);
			} else if (error.request) {
				console.error('Error request:', error.request);
			} else {
				console.error('Error message:', error.message);
			}
			console.error('Error config:', error.config);
			alert('Error confirming appointment. Please try again.');
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className='modal'
			style={{
				display: isOpen ? 'block' : 'none',
				position: 'fixed',
				zIndex: 1,
				left: 0,
				top: 0,
				width: '100%',
				height: '100%',
				overflow: 'auto',
				backgroundColor: 'rgba(0,0,0,0.4)',
			}}
		>
			<div
				className='modal-content'
				style={{
					backgroundColor: '#fefefe',
					margin: '15% auto',
					padding: '20px',
					border: '1px solid #888',
					width: '80%',
				}}
			>
				<h2>Confirm Appointment</h2>
				<p>Date: {format(slot.start, 'MMMM d, yyyy')}</p>
				<p>
					Time: {format(slot.start, 'h:mm a')} - {format(endTime, 'h:mm a')}
				</p>
				<button type='button' onClick={handleConfirm}>
					Confirm
				</button>
				<button type='button' onClick={onClose}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default AppointmentModal;
