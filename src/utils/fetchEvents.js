import { parseISO } from 'date-fns';
import axios from 'axios';

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

const fetchEvents = async (doctorEmail, user, setLoading, setEvents) => {
	console.log('fetching events for doctor:', doctorEmail);
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

export default fetchEvents;
