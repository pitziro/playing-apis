import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleCalendarAvailability } from './hooks/useGoogleCalendarAvailability'; // Assuming you have a custom hook for this functionality

const CalendarChecker = ({ apiKey, guestEmail, startTime, endTime, date }) => {
	const { data, error, isLoading } = useGoogleCalendarAvailability({
		apiKey,
		guestEmail,
		startTime,
		endTime,
		date,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	const availabilityData = data?.items || [];

	return (
		<div>
			<h1>Calendar Availability Checker</h1>
			{availabilityData.length > 0 ? (
				<ul>
					{availabilityData.map((event, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<li key={index}>{`Event: ${event.summary}, Start: ${
							event.start.dateTime || event.start.date
						}, End: ${event.end.dateTime || event.end.date}`}</li>
					))}
				</ul>
			) : (
				<p>No events found during the specified time.</p>
			)}
		</div>
	);
};

const App = () => {
	const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<CalendarChecker
				apiKey='YOUR_API_KEY'
				guestEmail='guest@example.com'
				startTime='2023-10-10T09:00:00'
				endTime='2023-10-10T17:00:00'
				date='2023-10-10'
			/>
		</GoogleOAuthProvider>
	);
};

export default App;
