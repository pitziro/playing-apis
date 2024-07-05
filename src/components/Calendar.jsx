// CalendarComponent.jsx
import { useState, useContext } from 'react';
import { useGoogleCalendar } from '../utils/useGoogleCalendar';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import { format, parse, startOfWeek, getDay, addMinutes } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { UserContext } from '../context/userContext';
import AppointmentModal from './Appointment';

const locales = {
	'en-US': enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const CalendarComponent = ({ doctorEmail }) => {
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { events, loading, checkAvailability } = useGoogleCalendar(doctorEmail);
	const { user } = useContext(UserContext);

	const handleSelectSlot = async (slotInfo) => {
		console.log('Slot selected:', slotInfo);
		const endTime = addMinutes(slotInfo.start, 60);
		const isAvailable = await checkAvailability(slotInfo.start, endTime);
		if (isAvailable) {
			setSelectedSlot(slotInfo);
			setIsModalOpen(true);
		} else {
			alert('This slot is not available.');
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500 }}
				selectable
				onSelectSlot={handleSelectSlot}
			/>
			<AppointmentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				slot={selectedSlot}
				doctorEmail={doctorEmail}
				patientEmail={user?.email}
				accessToken={user?.access_token}
			/>
		</div>
	);
};

export default CalendarComponent;
