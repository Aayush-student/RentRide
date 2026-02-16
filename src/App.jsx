import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import MyBookings from './Pages/MyBookings'
import BikeDetails from './Pages/BikeDetails'
import Bikes from './Pages/Bikes'           
import Dashboard from './Pages/owner/Dashboard'     
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loginform from './components/Loginform'
import SignUpForm from './components/SignUpForm'
import ManageBookings from './Pages/owner/ManageBookings'
import AddBike from './Pages/owner/AddBike'
import ManageBike from './Pages/owner/ManageBike'
import Layout from './Pages/owner/layout'



function App() {
 
  const [bookingData, setBookingData] = useState([]); 

  const [islogin,setIsLogin] = useState(false)
  const [issignup,setIsSignUp] = useState(false)
  
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner');

  return (
    <div>
     <ToastContainer
    position="top-center"
    autoClose={2500}
    hideProgressBar
    newestOnTop
    closeButton={false}
    transition={Zoom}
    toastClassName={() =>
     "relative flex items-center justify-between overflow-hidden rounded-2xl px-6 py-4 bg-white shadow-2xl border border-gray-200 backdrop-blur-lg"
    }
    bodyClassName={() => "text-sm font-semibold text-gray-800"}
     />
      <ScrollToTop/>
      
     
      {!isOwnerPath && <Navbar islogin={islogin} setIsLogin={setIsLogin}/>}
      

     {islogin && <Loginform closeForm={()=> setIsLogin(false)} issignup={issignup} setIsSignUp={setIsSignUp}/>}
     
     {issignup && <SignUpForm closeSignUp={()=> setIsSignUp(false)}/>}

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

        <Route path='/owner' element={<Layout/>}>
           
           
           <Route index element={<Dashboard/>}/> 

           
           <Route path='add-bike' element={<AddBike/>}/>
           <Route path='manage-bikes' element={<ManageBike/>}/>
           <Route path='manage-bookings' element={<ManageBookings/>}/>
           
        </Route>
      </Routes>
    </div>
  )
}

export default App