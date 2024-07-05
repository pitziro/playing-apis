import { format, addMinutes } from 'date-fns';
import { useGoogleCalendar } from '../utils/useGoogleCalendar';

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

const AppointmentModal = ({
	isOpen,
	onClose,
	slot,
	doctorEmail,
	patientEmail,
}) => {
	if (!isOpen || !slot) return null;

	const endTime = addMinutes(slot.start, 60);
	const { scheduleAppointment } = useGoogleCalendar();

	const handleSchedule = async () => {
		await scheduleAppointment(
			doctorEmail,
			slot.start.toISOString(),
			endTime.toISOString(),
			patientEmail
		);
		onClose();
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
				<button type='button' onClick={handleSchedule}>
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
