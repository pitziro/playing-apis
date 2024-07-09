import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Modal } from 'antd'

export default function MeetingDetailsModal({
   isOpen,
   setShowModalDetails,
   slot,
}) {
   if (!isOpen || !slot) return null

   const [enabledButton, setEnabledButton] = useState(true)

   setTimeout(() => {
      setEnabledButton(false)
   }, 2000)

   const handleConfirmation = () => {
      setShowModalDetails(false)
      console.log('Cancelar Cita')
   }

   const handleCancel = () => {
      setShowModalDetails(false)
   }
   return (
      <Modal
         title="Detalles de reserva"
         open={isOpen}
         cancelText="Cerrar"
         onCancel={handleCancel}
         okText="Cancelar Cita"
         okType="danger"
         onOk={handleConfirmation}
         okButtonProps={{
            disabled: enabledButton,
         }}
      >
         {slot && (
            <section>
               <p>
                  Dia Seleccionado:{'\u00A0'}
                  {dayjs(slot.start).format('dddd DD-MMM-YYYY')}
               </p>
               <p> Inicio: {dayjs(slot.start).format('hh:mm a')}</p>
               <p> Fin : {dayjs(slot.end).format('hh:mm a')}</p>
               <p> Tipo Cita : {slot.data?.location}</p>
               <p> Psicologo : {slot.data?.responsable}</p>
            </section>
         )}
      </Modal>
   )
}
