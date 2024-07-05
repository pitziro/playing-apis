import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

function QueryEvents({ inviteeEmail }) {
   const [events, setEvents] = useState([])
   const { user } = useContext(UserContext)

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            console.log('Fetching events for user:', inviteeEmail)
            const response = await fetch(
               `https://www.googleapis.com/calendar/v3/calendars/${inviteeEmail}/events?timeMin=${new Date().toISOString()}&timeMax=${new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000
               ).toISOString()}&singleEvents=true&orderBy=startTime`,
               {
                  headers: {
                     Authorization: `Bearer ${user.access_token}`,
                  },
               }
            )

            const data = await response.json()
            setEvents(data.items || [])
            console.log('Events:', data)
         } catch (error) {
            console.error('Error fetching events:', error)
         }
      }

      fetchEvents()
   }, [])

   return (
      <div>
         {events.length > 0 ? (
            <ul>
               {events.map(event => (
                  <li key={event.id}>
                     {event.summary} - {event.start.dateTime} -{' '}
                     {event.end.dateTime}
                  </li>
               ))}
            </ul>
         ) : (
            <p>No events found for {inviteeEmail}</p>
         )}
      </div>
   )
}

export default QueryEvents
