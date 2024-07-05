import Reserva from './pages/Reserva'

import { UserContext } from './context/userContext'
import { useContext } from 'react'
import { CheckAgenda } from './pages/CheckAgenda'

//import Calendar from './components/Calendar';
import LoginButton from './components/LoginButton'

function App() {
   const { user } = useContext(UserContext)

   return (
      <>
         <Reserva />
         <hr />
         {!user && <LoginButton />}

         {/* <Calendar doctorEmail={inputDoctorEmail} /> */}

         <CheckAgenda />
      </>
   )
}

export default App
