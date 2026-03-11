import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
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
import { useContext, useState } from 'react'
import { AppContext } from './context/Appcontext'

const AdminRoute = ({ children }) => {
  const { user, isOwner, accessToken } = useContext(AppContext);
  const ADMIN_EMAIL = "17Aayushk@gmail.com";

  if (!accessToken) return <Navigate to="/" />;
  if (user && (user.email !== ADMIN_EMAIL || !isOwner)) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const { showLogin, setShowLogin } = useContext(AppContext)
  const [issignup, setIsSignUp] = useState(false)
  
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
      />
      <ScrollToTop/>
      
      {!isOwnerPath && <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>}

      {showLogin && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {issignup ? (
            <SignUpForm 
              closeSignUp={() => {
                setIsSignUp(false); 
                setShowLogin(false);
              }} 
            />
          ) : (
            <Loginform 
              closeForm={() => setShowLogin(false)} 
              setIsSignUp={setIsSignUp} 
            />
          )}
        </div>
      )}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/bikes' element={<Bikes/>}/>
        <Route path='/bike-details/:id' element={<BikeDetails />}/>
        <Route path='/my-bookings' element={<MyBookings />}/>

        <Route path='/owner' element={
          <AdminRoute>
            <Layout/>
          </AdminRoute>
        }>
          <Route index element={<Dashboard/>}/> 
          <Route path='add-bike' element={<AddBike/>}/>
          <Route path='manage-bikes' element={<ManageBike/>}/>
          <Route path='manage-bookings' element={<ManageBookings/>}/>
        </Route>

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App