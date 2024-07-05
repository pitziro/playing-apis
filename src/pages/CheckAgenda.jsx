import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'

export const CheckAgenda = () => {
   const [guestEmail, setGuestEmail] = useState('')
   const [emailDone, setEmailDone] = useState(false)

   const [events, setEvents] = useState([])
   const { user } = useContext(UserContext)

   const fetchEvents = async () => {
      try {
         console.log('Fetching events for user:', guestEmail)
         const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${guestEmail}/events?timeMin=${new Date().toISOString()}&timeMax=${new Date(
               Date.now() + 90 * 24 * 60 * 60 * 1000
            ).toISOString()}&singleEvents=true&orderBy=startTime`,
            {
               headers: {
                  Authorization: `Bearer ${user.access_token}`,
               },
            }
         )
         if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
               `HTTP error! status: ${response.status}, message: ${errorData.error.message}`
            )
         }

         const data = await response.json()
         setEvents(data.items || [])
         console.log('Events:', data)
      } catch (error) {
         console.error('Error fetching events:', error)
         setEvents([])
      }
   }

   const freeBusy = async () => {
      try {
         const response = await fetch(
            'https://www.googleapis.com/calendar/v3/freeBusy',
            {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  timeMin: new Date().toISOString(),
                  timeMax: new Date(
                     Date.now() + 90 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                  items: [{ id: guestEmail }],
               }),
            }
         )

         if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
               `HTTP error! status: ${response.status}, message: ${errorData.error.message}`
            )
         }

         const data = await response.json()
         setEvents(data.items || [])
         console.log('Events:', data)
      } catch (error) {
         console.error('Error fetching free/busy:', error)
      }
   }

   async function searchAgenda() {
      setEmailDone(true)
      // fetchEvents()
      freeBusy()
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
