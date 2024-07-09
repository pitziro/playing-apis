import ClinicSvg from '../assets/clinic.svg'
import VirtualSvg from '../assets/virtual.svg'
// import dayjs from 'dayjs'

export const CustomEventComponent = ({ event }) => {
   const { start, end, title, data } = event
   // const startTime = dayjs(start).format('HH:mm')
   // const endTime = dayjs(end).format('HH:mm')
   const eventIcon = getIcon(data.location)

   function getIcon() {
      switch (event.data.location) {
         case 'Presencial':
            return <img src={ClinicSvg} alt="clinicIcon" />
         case 'Virtual':
            return <img src={VirtualSvg} alt="virtualIcon" />
      }
   }

   return (
      <span className="event-title">
         {eventIcon}
         {`\u00A0 ${event.title}`}
      </span>
   )
}
