// useGoogleCalendar.js
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { parseISO } from 'date-fns';
import { UserContext } from '../context/userContext';

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

export const useGoogleCalendar = (doctorEmail) => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useContext(UserContext);

	useEffect(() => {
		const fetchEvents = async () => {
			if (!user || !user.access_token) {
				setLoading(false);
				return;
			}

			try {
				const response = await axios.get(
					`${GOOGLE_CALENDAR_API}/calendars/${doctorEmail}/events`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
						},
						params: {
							timeMin: new Date().toISOString(),
							maxResults: 100,
							singleEvents: true,
							orderBy: 'startTime',
						},
					}
				);

				const processedEvents = response.data.items.map((event) => ({
					...event,
					start: parseISO(event.start.dateTime || event.start.date),
					end: parseISO(event.end.dateTime || event.end.date),
				}));

				setEvents(processedEvents);
			} catch (error) {
				console.error('Error fetching events:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, [doctorEmail, user]);

	const checkAvailability = async (start, end) => {
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

			return response.data.calendars[doctorEmail].busy.length === 0;
		} catch (error) {
			console.error('Error checking availability:', error);
			return false;
		}
	};

	const scheduleAppointment = async (start, end, patientEmail) => {
		if (!user || !user.access_token) return false;

		try {
			await axios.post(
				`${GOOGLE_CALENDAR_API}/calendars/${doctorEmail}/events`,
				{
					summary: 'Appointment',
					description: `Appointment with ${patientEmail}`,
					start: {
						dateTime: start.toISOString(),
						timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
					end: {
						dateTime: end.toISOString(),
						timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
					attendees: [{ email: patientEmail }, { email: doctorEmail }],
				},
				{
					headers: {
						Authorization: `Bearer ${user.access_token}`,
					},
				}
			);

			// Actualizar los eventos locales después de programar la cita
			setEvents((prevEvents) => [
				...prevEvents,
				{
					summary: 'Appointment',
					description: `Appointment with ${patientEmail}`,
					start: start,
					end: end,
				},
			]);

			return true;
		} catch (error) {
			console.error('Error scheduling appointment:', error);
			return false;
		}
	};

	return { events, loading, checkAvailability, scheduleAppointment };
};
