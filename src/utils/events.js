import dayjs from 'dayjs'

export default [
   {
      start: dayjs('2024-07-13T11:00:00').toDate(),
      end: dayjs('2024-07-13T12:00:00').toDate(),
      title: 'Paciente 1',
      data: {
         responsable: 'Santiago',
         location: 'Presencial',
         servicio: 'Terapia Personal',
      },
   },
   {
      start: dayjs('2024-07-08T17:00:00').toDate(),
      end: dayjs('2024-07-08T18:00:00').toDate(),
      title: 'Paciente 2',
      data: {
         responsable: 'Santiago',
         location: 'Virtual',
         servicio: 'Terapia Personal',
      },
   },
   {
      start: dayjs('2024-07-10T08:00:00').toDate(),
      end: dayjs('2024-07-10T09:00:00').toDate(),
      title: 'Paciente 3',
      data: {
         responsable: 'Stephany',
         location: 'Virtual',
         servicio: 'Terapia Personal',
      },
   },
   {
      start: dayjs('2024-07-10T08:00:00').toDate(),
      end: dayjs('2024-07-10T09:00:00').toDate(),
      title: 'Paciente 4',
      data: {
         responsable: 'Santiago',
         location: 'Presencial',
         servicio: 'Terapia Personal',
      },
   },
]
