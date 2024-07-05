import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../context/userContext';
import fetchEvents from './fetchEvents';

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

export const useGoogleCalendar = (doctorEmail) => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useContext(UserContext);

	useEffect(() => {
		fetchEvents(doctorEmail, user, setLoading, setEvents);
	}, [doctorEmail, user]);

	const checkAvailability = async (start, end) => {
		console.log('checkeando disponibilidad');
		if (!user || !user.access_token) return false;

		try {
			const response = await axios.post(
				`${GOOGLE_CALENDAR_API}/freeBusy`,
				{
					timeMin: start.toISOString(),
					timeMax: end.toISOString(),
					items: [{ id: doctorEmail }],
				},
				{
					headers: {
						Authorization: `Bearer ${user.access_token}`,
					},
				}
			);
			console.log(response.data);
			return response.data.calendars[doctorEmail].busy.length === 0;
		} catch (error) {
			console.error('Error checking availability:', error);
			return false;
		}
	};

	const scheduleAppointment = async (
		doctorEmail,
		starting,
		ending,
		patientEmail
	) => {
		if (!user || !user.access_token) return false;

		try {
			await axios.post(
				`${GOOGLE_CALENDAR_API}/calendars/primary/events`,
				{
					summary: 'Pysco Appointment',
					description: `Terapia con ${patientEmail}`,
					start: {
						dateTime: starting,
						timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
					end: {
						dateTime: ending,
						timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
					attendees: [{ email: patientEmail }, { email: doctorEmail }],
				},
				{
					headers: {
						Authorization: `Bearer ${user.access_token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			// Actualizar los eventos locales después de programar la cita
			// setEvents((prevEvents) => [
			// 	...prevEvents,
			// 	{
			// 		summary: 'Appointment',
			// 		description: `Appointment with ${patientEmail}`,
			// 		start: start,
			// 		end: end,
			// 	},
			// ]);
			// fetchEvents();

			return true;
		} catch (error) {
			console.error('Error de agendamiento:', error);
			return false;
		}
	};

	return { events, loading, checkAvailability, scheduleAppointment };
};
