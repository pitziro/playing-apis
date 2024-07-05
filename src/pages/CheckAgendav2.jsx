import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { gapi } from 'gapi-script'

export const CheckAgenda = () => {
   const [guestEmail, setGuestEmail] = useState('')
   const [emailDone, setEmailDone] = useState(false)

   const [events, setEvents] = useState([])
   const { user } = useContext(UserContext)

   const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
   const DISCOVERY_DOCS = [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
   ]
   const CLIENT_ID =
      '784179335763-377bo6t304c6tauid29723bkim1jfuci.apps.googleusercontent.com'
   const API_KEY = 'AIzaSyABFmoUy7xpOUSbSipcSiHSZzea8nzjOWU'

   const startClientGapi = () => {
      gapi.client
         .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
         })
         .then(() => {
            fetchEvents()
         })
   }

   const fetchEvents = async () => {
      try {
         gapi.client.setToken(user?.accessToken)
         gapi.client.calendar.events
            .list({
               calendarId: guestEmail,
               timeMin: new Date().toISOString(),
               timeMax: new Date(
                  Date.now() + 180 * 24 * 60 * 60 * 1000
               ).toISOString(),
               showDeleted: false,
               singleEvents: true,
               orderBy: 'startTime',
            })
            .then(response => {
               setEvents(response.result.items)
            })
      } catch (error) {
         console.error('Error fetching events:', error)
         setEvents([])
      }
   }

   async function searchAgenda() {
      gapi.load('client:auth2', startClientGapi)
      setEmailDone(true)
   }

   return (
      <>
         <input
            type="email"
            value={guestEmail}
            onChange={e => setGuestEmail(e.target.value)}
            placeholder="Email doctor"
         />

         <button type="button" onClick={searchAgenda}>
            Check Agenda
         </button>

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
               emailDone && <p>No events found for {guestEmail}</p>
            )}
         </div>
      </>
   )
}
