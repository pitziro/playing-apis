import './app.css'

import Reserva from './pages/Reserva'

import { UserContext } from './context/userContext'
import { useContext } from 'react'
// import { CheckAgenda } from './pages/CheckAgenda'

import BCalendar from './pages/BCalendar'
// import LoginButton from './components/LoginButton'

function App() {
   const { user } = useContext(UserContext)

   return (
      <>
         {/* <Reserva /> */}
         {/* {!user && <LoginButton />} */}
         {/* <Calendar doctorEmail={inputDoctorEmail} /> */}
         {/* <CheckAgenda /> */}

         <BCalendar />
      </>
   )
}

export default App
