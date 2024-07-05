import { useEffect, useState } from 'react'
import { gapi } from 'gapi-script'

function EventQuery({ inviteeEmail, user }) {
   const [events, setEvents] = useState([])

   useEffect(() => {
      const start = async () => {
         const CLIENT_ID =
            '784179335763-377bo6t304c6tauid29723bkim1jfuci.apps.googleusercontent.com'
         const API_KEY = 'AIzaSyABFmoUy7xpOUSbSipcSiHSZzea8nzjOWU'
         const DISCOVERY_DOCS = [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
         ]
         const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

         function initClient() {
            gapi.client
               .init({
                  apiKey: API_KEY,
                  clientId: CLIENT_ID,
                  discoveryDocs: DISCOVERY_DOCS,
                  scope: SCOPES,
               })
               .then(() => {
                  gapi.auth2
                     .getAuthInstance()
                     .signIn()
                     .then(googleUser => {
                        const accessToken =
                           googleUser.getAuthResponse().access_token
                        fetchEvents(accessToken)
                     })
               })
         }

         function fetchEvents(accessToken) {
            gapi.client.setToken({ access_token: accessToken })
            gapi.client.calendar.events
               .list({
                  calendarId: inviteeEmail,
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
                  console.log('eventos gapi:')
                  console.log(events)
               })
         }

         gapi.load('client:auth2', initClient)
      }

      start()
   }, [inviteeEmail, events])

   if (!user) return <p>Debe permitir el acceso.</p>

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

export default EventQuery
