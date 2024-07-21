import './app.css'

// import Reserva from './pages/Reserva'

import { UserContext } from './context/userContext'
import { useContext, useEffect } from 'react'
// import { CheckAgenda } from './pages/CheckAgenda'

import { Routes, Route } from 'react-router-dom'

import BCalendar from './pages/BCalendar'
import SupaLogin from './pages/SupaLogin'
// import LoginButton from './components/LoginButton'

function App() {
   const { user } = useContext(UserContext)

   return (
      <>
         {/* <Reserva /> */}
         {/* {!user && <LoginButton />} */}
         {/* <Calendar doctorEmail={inputDoctorEmail} /> */}
         {/* <CheckAgenda /> */}

         {/* <BCalendar />
         <br />
         <SupaLogin /> */}
         {/* <RouterProvider router={router} /> */}
         <Routes>
            <Route path="/" element={<BCalendar />} />
            <Route path="/login" element={<SupaLogin />} />
         </Routes>
      </>
   )
}

export default App
