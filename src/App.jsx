import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import MyBookings from './Pages/MyBookings'
import CarDetails from './Pages/CarDetails'
import Cars from './Pages/Cars'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner')
  return (
    <div>
    <div>
      {!isOwnerPath &&
        <Navbar/>
      }
    </div>

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/car-details/:id' element={<CarDetails/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
     </Routes>
    </div>
  )
}

export default App
