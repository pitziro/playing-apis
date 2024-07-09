import { useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'

import NewMeetingModal from '../components/NewMettingModal'
import MeetingDetailsModal from '../components/MeetingDetailsModal'
import { CustomEventProp } from '../utils/customEventProGetter'

import { CustomEventComponent } from '../components/CustomEventComponent'

import events from '../utils/events'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'dayjs/locale/es'

dayjs.locale('es')

export default function BCalendar() {
   const [customDay, setCustomDay] = useState()
   const [currentView, setCurrentView] = useState('month')

   const [currentSlot, setCurrentSlot] = useState(null)
   const [selectedEvent, setSelectedEvent] = useState(null)

   const [showModalNewMeeting, setShowModalNewMeeting] = useState(false)
   const [showModalDetails, setShowModalDetails] = useState(false)

   const stylesCal = {
      height: 500,
      width: '75vw',
   }
   const localized = dayjsLocalizer(dayjs)

   const messages = {
      allDay: 'Todo el día',
      previous: 'Anterior',
      next: 'Siguiente',
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      agenda: 'Agenda',
      date: 'Fecha',
      time: 'Hora',
      event: 'Evento',
      noEventsInRange: 'Sin eventos',
   }

   // LOGICA SLOT  //
   const handleSelectSlot = slotInfo => {
      setCurrentSlot(slotInfo)
      setCustomDay(slotInfo.start)

      if (currentView === 'month') setCurrentView('week')

      if (currentView === 'week') {
         setShowModalNewMeeting(true)
      }
   }

   // LOGICA  EVENTO  //
   const handleSelectedEvent = slotInfo => {
      console.log('evento', `${slotInfo.title}-${slotInfo.data.responsable}`)
      setSelectedEvent(slotInfo)
      setShowModalDetails(true)
   }

   const handleNavigate = date => {
      setCustomDay(date)
   }

   const onView = viewData => {
      setCurrentView(viewData)
      //setCustomDay(null)
   }

   const dayPropGetter = date => {
      if (dayjs(new Date()).isSame(customDay, 'day')) return null
      if (customDay && dayjs(date).isSame(customDay, 'day')) {
         return {
            style: {
               backgroundColor: '#ffdddd',
            },
         }
      }
   }

   return (
      <>
         <Calendar
            culture="es"
            localizer={localized}
            messages={messages}
            events={events}
            style={stylesCal}
            views={['month', 'week']}
            defaultView="month"
            view={currentView}
            date={customDay}
            min={dayjs('2024-07-01T08:00:00')}
            max={dayjs('2024-07-31T23:00:00')}
            formats={{
               dayHeaderFormat: date => dayjs(date).format('dddd DD/MMM/YY'),
               monthHeaderFormat: date => dayjs(date).format('dddd DD/MMM/YY'),
               weekdayFormat: date => dayjs(date).format('dddd'),
               weekFormat: date => dayjs(date).format('dddd DD/MMM/YY'),
               // eventTimeRangeFormat: () => ' ',
            }}
            step={60}
            timeslots={1}
            eventOverlap={false}
            slotEventOverlap={false}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectedEvent}
            onNavigate={handleNavigate}
            onView={onView}
            dayPropGetter={dayPropGetter}
            eventPropGetter={CustomEventProp}
            components={{
               event: CustomEventComponent,
               week: {
                  event: CustomEventComponent,
               },
            }}
         />

         <NewMeetingModal
            isOpen={showModalNewMeeting}
            setShowModalNewMeeting={setShowModalNewMeeting}
            slot={currentSlot}
         />

         <MeetingDetailsModal
            isOpen={showModalDetails}
            setShowModalDetails={setShowModalDetails}
            slot={selectedEvent}
         />
      </>
   )
}
