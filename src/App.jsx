import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import MyBookings from './Pages/MyBookings'
import BikeDetails from './Pages/BikeDetails'
import Bikes from './Pages/Bikes'           
import Dashboard from './Pages/Dashboard'     
import './App.css'
import ScrollToTop from './components/ScrollToTop'

function App() {
 
  const [bookingData, setBookingData] = useState([]); 
  
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner');

  return (
    <div>
      <ScrollToTop/>
      
     
      {!isOwnerPath && <Navbar/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/bikes' element={<Bikes/>}/>
       
        <Route path='/bike-details/:id' element={
          <BikeDetails 
            bookingData={bookingData} 
            setBookingData={setBookingData}
          />
        }/>
        
        <Route path='/my-bookings' element={
          <MyBookings 
            bookingData={bookingData} 
            setBookingData={setBookingData}
          />
        }/>
        
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App