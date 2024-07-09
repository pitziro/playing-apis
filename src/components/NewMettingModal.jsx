import dayjs from 'dayjs'
import { useState } from 'react'
import { Modal } from 'antd'

export default function NewMeetingModal({
   isOpen,
   setShowModalNewMeeting,
   slot,
}) {
   const [confirmLoading, setConfirmLoading] = useState(false)

   if (!isOpen || !slot) return null

   const handleConfirmation = () => {
      setConfirmLoading(true)
      setTimeout(() => {
         setShowModalNewMeeting(false)
         setConfirmLoading(false)
      }, 1500)
   }
   const handleCancel = () => {
      console.log('Clicked cancel button')
      setShowModalNewMeeting(false)
   }

   return (
      <>
         <Modal
            title="Confirmación de reserva"
            open={isOpen}
            onOk={handleConfirmation}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="Cancelar"
            okText="Confirmar Cita"
         >
            {slot && (
               <section>
                  <p>
                     Dia Seleccionado:
                     {dayjs(slot.start).format('dddd DD-MMM-YYYY')}
                  </p>
                  <p> Inicio: {dayjs(slot.start).format('hh:mm a')}</p>
                  <p> Fin : {dayjs(slot.end).format('hh:mm a')}</p>
               </section>
            )}
         </Modal>
      </>
   )
}
